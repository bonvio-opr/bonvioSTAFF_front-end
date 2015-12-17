var crm = angular.module('crm', ['ngRoute', 'ngResource']);

crm.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }).hashPrefix('!');

        $routeProvider.
        when('/', {
            templateUrl: 'tpl/root.html'
        }).
        when('/companies', {
            templateUrl: 'tpl/company.html',
            controller: 'CompanyController'
        }).
        when('/contacts', {
            templateUrl: 'tpl/contact.html',
            controller: 'ContactController'
        }).
        //when('/customers', {
            //templateUrl: 'tpl/customer.html'//,
            //controller: 'CompanyController'
        //}).
        when('/emails', {
            templateUrl: 'tpl/email.html'//,
            //controller: 'CompanyController'
        }).
        when('/employees', {
            templateUrl: 'tpl/employee.html'//,
            //controller: 'CompanyController'
        }).
        when('/individuals', {
            templateUrl: 'tpl/individual.html'//,
            //controller: 'CompanyController'
        }).
        when('/phones', {
            templateUrl: 'tpl/phone.html'//,
            //controller: 'CompanyController'
        }).
        when('/socials', {
            templateUrl: 'tpl/social.html'//,
            //controller: 'CompanyController'
        }).
        when('/tags', {
            templateUrl: 'tpl/tag.html'//,
            //controller: 'CompanyController'
        }).
        when('/users', {
            templateUrl: 'tpl/user.html',
            controller: 'UserController'
        }).
        when('/websites', {
            templateUrl: 'tpl/website.html'//,
            //controller: 'CompanyController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

crm.run(function(){
    crm.backendUrl = 'http://localhost:8080/';
    //crm.backendUrl = 'http://192.168.50.5:8080/crm/';
});