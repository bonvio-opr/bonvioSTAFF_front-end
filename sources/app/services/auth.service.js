
angular.module('app').service('authService', function ($http) {
    let url = 'http://192.168.50.13:7000/';
    this.check = () => $http.get(url + 'check');
    this.signin = user => $http.post(url + 'signin', user);
    this.signup = user => $http.post(url + 'signup', user);
    this.signout = () => $http.delete(url + 'signout');
});