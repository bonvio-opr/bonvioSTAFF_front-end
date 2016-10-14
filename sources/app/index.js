angular
    .module("app", ["ui.bootstrap", "ui.router", "ngResource"])
    .config(($locationProvider, $compileProvider, $urlRouterProvider) => {

        $locationProvider.html5Mode(true).hashPrefix("!");
        $urlRouterProvider.otherwise("/auth");

        if (process.env.NODE_ENV == "production") {
            $compileProvider.debugInfoEnabled(false);
        }

    });

window.requireAll = requireContext => requireContext.keys().map(requireContext);

requireAll(require.context('./components', true, /\.js/));
requireAll(require.context('./services', true, /\.js/));

angular.bootstrap(document, ["app"]);