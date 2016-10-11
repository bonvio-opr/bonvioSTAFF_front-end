angular.module("app").config(($stateProvider) => {
    $stateProvider.state({
        name: 'test',
        url: "/test",
        component: 'test'
    });
}).component('test', {
    template: require("./test.html"),
    controller: function () {
        this.func = value => {
            console.log(value);
        };
    }
});

