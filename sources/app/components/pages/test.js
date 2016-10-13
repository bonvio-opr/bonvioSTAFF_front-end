angular.module("app").config(($stateProvider) => {
    $stateProvider.state({
        name: 'test',
        url: "/test",
        component: 'test'
    });
}).component('test', {
    template: require("./test.html"),
    controller: function ($http) {

        $http.get('/_data/phones/phones.json').then(response => {
            this.phones = response.data;
        });

        this.func = value => {
            console.log(value);
        };

        this.open = () => {
            console.log("ffffF");
        }

    }
});

