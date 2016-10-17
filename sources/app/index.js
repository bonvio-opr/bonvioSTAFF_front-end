angular
    .module('app', ['ui.bootstrap', 'ui.router', 'ngResource', 'ngCookies'])
    .config(($locationProvider, $compileProvider, $urlRouterProvider, $httpProvider) => {

        $locationProvider.html5Mode(true).hashPrefix('!');
        $urlRouterProvider.otherwise('/auth');

        $httpProvider.defaults.withCredentials = true;

        if (process.env.NODE_ENV == 'production') {
            $compileProvider.debugInfoEnabled(false);
        }

    })
    .run((authService, $state, $cookies) => {
        authService.check().then((res) => {
            $cookies.putObject('currentUser', res.data);
        }).catch((res) => {
            $cookies.remove('currentUser');
            $state.go('auth');
        });
    });

window.requireAll = requireContext => requireContext.keys().map(requireContext);

requireAll(require.context('./components', true, /\.js/));
requireAll(require.context('./services', true, /\.js/));

requireAll(require.context('./components', true, /\.css/));


angular.bootstrap(document, ['app']);