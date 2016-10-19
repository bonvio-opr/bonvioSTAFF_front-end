
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
        return Promise.reject(res.data);
    });

    /**
     * @name authService#signin
     * @return {Promise}
     */
    this.signin = user => $http.post(url + 'signin', user).then(res => {
        $cookies.putObject('currentUser', res.data);
        return res.data;
    }, res => {
        $cookies.remove('currentUser');
        return Promise.reject(res.data);
    });

    /**
     * @name authService#signup
     * @return {Promise}
     */
    this.signup = user => $http.post(url + 'signup', user).then(res => {
        $cookies.putObject('currentUser', res.data);
        return res.data;
    }, res => {
        $cookies.remove('currentUser');
        return Promise.reject(res.data);
    });

    /**
     * @name authService#signout
     * @return {Promise}
     */
    this.signout = () => $http.delete(url + 'signout').then(res => {
        $cookies.remove('currentUser');
        return res.data;
    }, res => {
        $cookies.remove('currentUser');
        return Promise.reject(res.data);
    });
});