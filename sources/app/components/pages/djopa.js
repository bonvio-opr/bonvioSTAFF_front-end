angular.module("app").config(($stateProvider, $locationProvider) => {
    $stateProvider.state({
        name: 'djopa',
        url: "/",
        template: require("./djopa500.html")
    });
    $locationProvider.html5Mode(true).hashPrefix("!");
    console.log("hui");
});

