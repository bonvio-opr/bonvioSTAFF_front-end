angular.module("app").config(($stateProvider) => {
    $stateProvider.state({
        name: 'test',
        url: "/test",
        component: 'test',
        resolve: {
            phones: Phone => Phone.query({id: 'phones'}).$promise
        }
    });
}).component('test', {
    bindings: {
        phones: '<'
    },
    template: require("./test.html"),
    controller: function ($uibModal, Phone) {
        console.log(this.phones);

        /*$http.get('/_data/phones/phones.json').then(phones => {
            this.phones = phones.data;
        });*/

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

