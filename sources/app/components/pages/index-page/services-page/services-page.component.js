angular.module("app").config(($stateProvider) => {
    $stateProvider.state({
        name: 'index.services',
        url: "/services",
        component: 'servicesPage'
    });
}).component('servicesPage', {
    template: require("./services-page.component.html"),
    controller: function () {}
});

