angular.module("app").config(($stateProvider) => {
    $stateProvider.state({
        name: 'index',
        url: "/index",
        component: "indexPage"
    });
}).component("indexPage", {
    template: require("./index-page.component.html"),
    controller: function (authService, $state) {
        this.signout = () => {
            authService.signout().then((res) => {
                $state.go('auth');
                console.log(res);
            }).catch((res) => {
                console.log(res);
            });

        }
    }
});

