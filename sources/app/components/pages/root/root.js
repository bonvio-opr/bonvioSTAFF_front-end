angular.module("app").config(($stateProvider) => {
    $stateProvider.state({
        name: 'index',
        url: "/index",
        component: "root"
    });
    console.log('hui');
}).component("root", {
    template: require("./root.html")
});

