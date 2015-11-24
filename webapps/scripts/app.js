//Define an angular module for our app

var staffApp = angular.module('staff.bonvio.com', ['ngRoute']);

staffApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: '/webapps/views/interviews.html',
      controller: 'interviewsController'
    }).
    when('/interviews', {
      templateUrl: '/webapps/views/interviews.html',
      controller: 'interviewsController'
    }).
    when('/projects', {
      templateUrl: '/webapps/views/projects.html'
    }).
    when('/services', {
      templateUrl: '/webapps/views/services.html'
    }).
    when('/users', {
      templateUrl: '/webapps/views/users.html',
	  controller: 'usersController'
    }).
    //  when('/phones/:phoneId', {
    //    templateUrl: 'partials/phone-detail.html',
    //    controller: 'PhoneDetailCtrl'
    //  }).
    otherwise({
      redirectTo: '/employee'
    });
  }]);