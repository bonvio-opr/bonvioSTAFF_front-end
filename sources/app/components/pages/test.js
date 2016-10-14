angular.module("app").config(($stateProvider) => {
    $stateProvider.state({
        name: 'test',
        url: "/test",
        component: 'test'
    });
}).component('test', {
    template: require("./test.html"),
    controller: function ($http, $uibModal) {

        $http.get('/_data/phones/phones.json').then(phones => {
            this.phones = phones.data;
        });

        this.func = value => {
            console.log(value);
        };

        this.openComponentModal = () => {
            $uibModal.open({
                component: 'nkModal',
                animation: 'false'
            }).result.then(value => {
                console.log(value);
            })
        };

        this.animationsEnabled = false;
        this.toggleAnimation = function () {
            this.animationsEnabled = !this.animationsEnabled;
        };

    }
});

