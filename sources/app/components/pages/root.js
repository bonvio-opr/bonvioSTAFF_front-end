angular.module("app").config(($stateProvider, $locationProvider) => {
    $stateProvider.state({
        name: 'djopa',
        url: "/",
        template: require("./root.html")
    });
    $locationProvider.html5Mode(true).hashPrefix("!");
    console.log("hui");
});

