angular.module("app").config(($stateProvider) => {
    $stateProvider.state({
        name: 'index',
        url: "/index",
        component: "indexPage"
    });
}).component("indexPage", {
    template: require("./index-page.component.html")
});

