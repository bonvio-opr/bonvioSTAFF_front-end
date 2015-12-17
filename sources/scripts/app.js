var app = angular.module('app', ['ngMessages', 'ngResource', 'ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider.state('index', {
        url: '/index',
        templateUrl: 'tpl/index.html',
        controller: 'IndexController'
    //})
        //.state('services', {
        //url: '/index',
        //templateUrl: 'tpl/services.html'//,
        //controller: 'IndexController'
    }).state('index.companies', {
        url: '/company',
        views: {
            index: {
                templateUrl: 'tpl/company.html',
                controller: 'CompanyController'
            },
            'companies@index.companies': {
                templateUrl: 'tpl/companies.html'
            }
        }
    }).state('index.individuals', {
        url: '/individual',
        views: {
            index: {
                templateUrl: 'tpl/individual.html',
                controller: 'IndividualController'
            },
            'individuals@index.individuals': {
                templateUrl: 'tpl/individuals.html'
            }
        }
    }).state('index.contacts', {
        url: '/contact',
        views: {
            index: {
                templateUrl: 'tpl/contacts.html',
                controller: 'ContactController'
            },
            'companies@index.contacts': {
                templateUrl: 'tpl/companies.html',
                controller: 'CompanyController'
            },
            'individuals@index.contacts': {
                templateUrl: 'tpl/individuals.html',
                controller: 'IndividualController'
            }
        }
    }).state('index.users', {
        url: '/user',
        views: {
            index: {
                templateUrl: 'tpl/users.html',
                controller: 'UserController'
            }
        }
    });

    $urlRouterProvider.otherwise('/index');
    $locationProvider.html5Mode(true).hashPrefix('!');
});

app.run(function () {
    //app.backendUrl = 'http://tomcat.bonvio.net/crm';
    //app.backendUrl = 'http://192.168.50.5:8080/crm';
    app.backendUrl = 'http://localhost:8080/';
});