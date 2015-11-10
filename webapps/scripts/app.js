//Define an angular module for our app

var staffApp = angular.module('staffApp', ['ngRoute']);

staffApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/employee', {
      templateUrl: '/users.html',
      controller: 'usersController'
    }).
    when('/projects', {
      templateUrl: '/projects.html'
    }).
    when('/services', {
      templateUrl: '/services.html'
    }).
    //  when('/phones/:phoneId', {
    //    templateUrl: 'partials/phone-detail.html',
    //    controller: 'PhoneDetailCtrl'
    //  }).
    otherwise({
      redirectTo: '/employee'
    });
  }]);