angular.module("app").config(($stateProvider) => {
    $stateProvider.state({
        name: 'auth',
        url: "/auth",
        component: 'authPage'
    });
}).component('authPage', {
    template: require("./auth-page.component.html"),
    controller: function (authService) {
        
        this.signin = (user) => {
            console.log(user);
            authService.signin(user).then((res) => {
                console.log(res);
            }).catch((res) => {
                console.log(res);
            });
        };

        this.signup = (user) => {
            console.log(user);
            authService.signup(user).then((res) => {
                console.log(res);
            }).catch((res) => {
                console.log(res);
            });
        }
    }
});

