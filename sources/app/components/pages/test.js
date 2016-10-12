angular.module("app").config(($stateProvider) => {
    $stateProvider.state({
        name: 'test',
        url: "/test",
        component: 'test'
    });
}).component('test', {
    template: require("./test.html"),
    controller: function () {

        this.phones = [
            {
                name: "ggg",
                snippet: "ggg"
            },
            {
                name: "ggg1",
                snippet: "ggg1"
            }
        ];

        this.func = value => {
            console.log(value);
        };
        
    }
});

