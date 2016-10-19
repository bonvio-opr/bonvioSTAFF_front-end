
angular.module('app').service('authService', function ($http, $cookies) {
    let url = 'http://192.168.50.13:7000/';

    /**
     * @name authService#check
     * @return {Promise}
     */
    this.check = () => $http.get(url + 'check').then(res => {
        $cookies.putObject('currentUser', res.data);
        return res.data;
    }, res => {
        $cookies.remove('currentUser');
        return Promise.reject(res);
    });

    this.signin = user => $http.post(url + 'signin', user);
    this.signup = user => $http.post(url + 'signup', user);
    this.signout = () => $http.delete(url + 'signout');
});