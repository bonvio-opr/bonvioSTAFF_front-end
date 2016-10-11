angular.module("app").config(($stateProvider) => {
    $stateProvider.state({
        name: 'root',
        url: "/",
        component: "root"
    });
}).component("root", {
    template: require("./root.html")
});

