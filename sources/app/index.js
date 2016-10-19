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
    .run((authService, $state, $cookies, $transitions) => {

        let currentUser = null;

        authService.check().catch(() => $state.go('auth'));

        $transitions.onBefore({}, () => currentUser = $cookies.getObject('currentUser'));

        $transitions.onStart({to: 'index.*'}, () => !!currentUser);
        $transitions.onError({to: 'index.*'}, () => $state.go('auth'));

        $transitions.onStart({to: 'auth'}, () => !currentUser);
        $transitions.onError({to: 'auth'}, () => $state.go('index'));

    });

window.requireAll = requireContext => requireContext.keys().map(requireContext);

requireAll(require.context('./components', true, /\.js/));
requireAll(require.context('./services', true, /\.js/));

requireAll(require.context('./components', true, /\.css/));


angular.bootstrap(document, ['app']);