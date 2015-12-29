var app = angular.module('app', ['ngMessages', 'ngResource', 'jerryhsia.minieditor', 'ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider.state('index', {
        url: '/index',
        templateUrl: 'tpl/index.html',
        controller: 'IndexController as vm'
    }).state('index.services', {
        url: '/service',
        views: {
            index: {
                templateUrl: 'tpl/services.html',
                controller: 'ServiceController'
            }
        }
    }).state('index.opr', {
        url: '/opr',
        views: {
            index: {
                templateUrl: 'tpl/opr.html'
            }
        }
    }).state('index.interviews', {
        url: '/interview',
        views: {
            index: {
                templateUrl: 'tpl/interviews.html',
                controller: 'InterviewController'
            }
        }
    }).state('index.tickets', {
        url: '/ticket',
        views: {
            index: {
                templateUrl: 'tpl/ticket.html',
                controller: 'TicketController'
            }
        }
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

var base = {
    backend: 'http://tomcat.bonvio.net/staff.data'
};

app.value('base', base);
app.controller('CompanyController', function ($scope, $state, CRUDService, Company) {
    $scope.vm = CRUDService.init('company', Company);
    $scope.vm.isUpsert = $state.is('index.companies');
});
app.controller('ContactController', function ($scope, Company, Individual) {
    $scope.vm = this;

    Company.query(function (componies) {
        Individual.query(function (individuals) {
            $scope.vm.contacts = componies.concat(individuals);
        });
    });
});
app.controller('IndexController', function ($scope, Static, $rootScope, Navigation) {
    var vm = this;

    vm.navigations = Navigation.query(function (data) {
        vm.navigations = data;
    });

    $rootScope.$on('havigationHasYourBrain', function (evt, data) {
        vm.navigations = data;
    });

    $rootScope.$on('havigationHasYourBrainOnce', function () {
        vm.navigations = Navigation.query();
    });

    $rootScope.$on('havigationHasYourBrainOnceBECOUSE-kill', function () {
        vm.navigations = Navigation.query();
    });
});
app.controller('IndividualController', function ($scope, $state, CRUDService, Individual) {
    $scope.vm = CRUDService.init('individual', Individual);
    $scope.vm.isUpsert = $state.is('index.individuals');
});
/**
 * Created by mil on 07.10.2015.
 */

app.controller('InterviewController', function($scope, $http) {

    $scope.customers = {};

    /*$http.get('_data/customers.json').then(function(responce) {
        $scope.customers = responce.data;
        console.log(responce.data);
    });*/

    var getCustomers = function() {
        $http.get('http://webapps.bonvio.net/interview/getCustomers').success(function ( responce ) {
            $scope.customers = responce;
            console.log(responce);
        });
    };

    getCustomers();

    $scope.vm = {};

    $scope.vm.control = 'create';

    $scope.vm.create = function() {
        $http.post('http://webapps.bonvio.net/interview/addCustomer', {"name" : $scope.vm.interview.fullName}).success(function ( responce ) {
            console.log(responce);
            getCustomers();
        });
        console.log($scope.vm.interview);
        console.log($scope.vm.interview.fullName);
        console.log("create");
    };

    $scope.vm.update = function (){
        //
        console.log("update");
    };

    $scope.vm.prepare = function (customer) {
        //$scope.vm.modalTitle = customer ? 'Editing profile for user: '+customer.shortName : 'New profile';
    };

    /**
     * getAnswersByCustomerId
     */
    $scope.vm.getAnswersByCustomerId = function(id) {
        console.log(id);
        $http.get('http://webapps.bonvio.net/interview/getAnswersByCustomerId/'+id).success(function ( responce ) {
            $scope.answers = responce;
            console.log(responce);
        });

    }


});
(function () {
    function NavigationController(Navigation, $rootScope) {
        var vm = this;

        vm.navigations = Navigation.query(function (data) {
            $rootScope.$broadcast('havigationHasYourBrain', data);
        });

        vm.prepare = function (navigation) {
            vm.navigation = angular.copy(navigation) || {};
            vm.index = vm.navigations.indexOf(navigation);
        };

        vm.create = function () {
            var navigation = new Navigation(vm.navigation);
            navigation.$save(function (navigation) {
                vm.navigation = angular.extend(navigation, vm.navigation);
                vm.navigations.push(vm.navigation);
                vm.prepare(vm.navigation);

                $rootScope.$broadcast('havigationHasYourBrain', vm.navigations);
            });
        };

        vm.update = function () {
            vm.navigation.$update(function (navigation) {
                vm.navigation = angular.extend(navigation, vm.navigation);
                vm.navigations[vm.index] = angular.copy(vm.navigation);
                vm.prepare(vm.navigation);

                $rootScope.$broadcast('havigationHasYourBrain', vm.navigations);
            });
        };

        vm.remove = function () {
            vm.navigation.$delete(function () {
                vm.navigations.splice(vm.index, 1);
                vm.prepare();
            });
        };

        vm.detail = function () {
            Navigation.get(vm.navigation, function (navigation) {
                vm.navigation = angular.extend(navigation, vm.navigation);
                vm.navigations[vm.index] = angular.copy(vm.navigation);
                vm.prepare(vm.navigation);
            });
        };
    }

    function config($stateProvider) {
        $stateProvider.state('index.navigation', {
            url: '/navigation',
            views: {
                'index': {
                    controller: 'NavigationController as vm',
                    templateUrl: 'tpl/navigation.html'
                }
            }
        });
    }

    angular
        .module('app')
        .controller('NavigationController', NavigationController)
        .config(config);
})();
/**
 * Created by mil on 18.12.15.
 */

app.controller('ServiceController', function($scope, $http) {
    /**
     * @type {{name: String, ip: String, services: Array}}
     */
    $scope.servers = {};
    /**
     * @type {{title: String, port: String, url: Object, login: String, password: String, sources: Array}}
     */
    $scope.service = {};
    /**
     * @type {{title: String, link: String}}
     */
    $scope.url = {};
    /**
     * @type {{title: String, url:String, login: String, password: String}}
     */
    $scope.source = {};

    $http.get('/_data/servers.json').then(function(responce) {
        $scope.servers = responce.data;
    })
});
(function () {
    function StaticController(Static, Navigation, $rootScope) {
        var vm = this;

        vm.staticPages = Static.query();

        vm.navigations = Navigation.query();

        vm.prepare = function (staticPage) {
            vm.staticPage = angular.copy(staticPage) || {};
            vm.index = vm.staticPages.indexOf(staticPage);
            if (vm.staticPage.id) vm.detail();
        };

        vm.create = function () {
            //delete vm.staticPage.content;
            //vm.staticPage.navigationList = [vm.staticPage.navigationList];
            var staticPage = new Static(vm.staticPage);
            staticPage.$save(function (staticPage) {
                vm.staticPage = angular.extend(staticPage, vm.staticPage);
                vm.staticPages.push(vm.staticPage);
                vm.prepare(vm.staticPage);

                $rootScope.$broadcast('havigationHasYourBrainOnce', vm.staticPage);
            });
        };

        vm.update = function () {
            //vm.staticPage.navigationList = [vm.staticPage.navigationList];
            vm.staticPage.$update(function (staticPage) {
                vm.staticPage = angular.extend(staticPage, vm.staticPage);
                vm.staticPages[vm.index] = angular.copy(vm.staticPage);
                vm.prepare(vm.staticPage);

                $rootScope.$broadcast('havigationHasYourBrainOnce');
            });
        };

        vm.remove = function () {
            vm.staticPage.$delete(function () {
                $rootScope.$broadcast('havigationHasYourBrainOnceBECOUSE-kill');
                vm.staticPages.splice(vm.index, 1);
                vm.prepare();
            });


        };

        vm.detail = function () {
            Static.get(vm.staticPage, function (staticPage) {
                vm.staticPage = angular.extend(staticPage, vm.staticPage);
                vm.staticPages[vm.index] = angular.copy(vm.staticPage);
                //vm.prepare(vm.staticPage);
            });
        };
    }

    function PageController(Static, $state) {
        var vm = this;
        vm.page = Static.get($state.params);
    }

    function config($stateProvider) {
        $stateProvider
            .state('index.static', {
                url: '/static',
                views: {
                    'index': {
                        controller: 'StaticController as vm',
                        templateUrl: 'tpl/static.html'
                    }
                }
            })
            .state('index.page', {
                url: '/static/:id',
                views: {
                    'index': {
                        controller: 'PageController as vm',
                        templateUrl: 'tpl/page.html'
                    }
                }
            });
    }

    angular
        .module('app')
        .controller('StaticController', StaticController)
        .controller('PageController', PageController)
        .config(config);
})();
app.controller('TicketController', function ($scope, CRUDService, Ticket) {
    $scope.vm = CRUDService.init('ticket', Ticket);

    $scope.vm.create = function () {
        Ticket.save({}, $scope.vm.ticket, function (data) {
            $scope.vm.ticket.id = data.id;
            $scope.vm.ticket.dateCreate = 'сейчас';
            $scope.vm.tickets.push($scope.vm.ticket);
            $scope.vm.prepare($scope.vm.ticket);
        }).$promise.catch(function (response) {
            jQuery('#error.modal').modal('show').find('.modal-body').html(response.data);
        });
    };

    $scope.vm.update = function () {
        delete $scope.vm.ticket.dateCreate;
        Ticket.update({}, $scope.vm.ticket, function (data) {
            $scope.vm.ticket.id = data.id;
            $scope.vm.ticket.dateCreate = 'сейчас';
            $scope.vm.tickets[$scope.vm.index] = angular.copy($scope.vm.ticket);
        }).$promise.catch(function (response) {
            jQuery('#error.modal').modal('show').find('.modal-body').html(response.data);
        });
    };
    
});
app.controller('UserController', function ($scope, CRUDService, User) {
    $scope.vm = CRUDService.init('user', User);
});
(function () {
    function codeCompile($compile, $timeout) {
        return {
            restrict: 'E',
            scope: {
                template1: '='
            },
            replace: true,
            link: function (scope, element) {
                $timeout(function () {
                    var template = scope.template1;
                    var linkFn = $compile(template);
                    var content = linkFn(scope);
                    element.append(content);
                }, 100);
            }
        };
    }

    /**
     * @ngdoc directive
     * @name codeCompile
     * @restrict E
     *
     * @param {HTMLBaseElement} template1
     */
    angular
        .module('app')
        .directive('codeCompile', codeCompile);
})();
(function () {
    function convertToNumber() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(val) {
                    return parseInt(val, 10);
                });
                ngModel.$formatters.push(function(val) {
                    return '' + val;
                });
            }
        };
    }

    angular
        .module('app')
        .directive('convertToNumber', convertToNumber);
})();
app.factory('Company', function ($resource) {
    return $resource(app.backendUrl + '/company/:id', {}, {
        update: {method: 'PUT'}
    });
});
app.factory('Individual', function ($resource) {
    return $resource(app.backendUrl + '/individual/:id', {}, {
        update: {method: 'PUT'}
    });
});
(function () {
    function Navigation($resource, base) {
        return $resource(base.backend + '/navigation/:id', {id: '@id'}, {
            update: {method: 'PUT'}
        });
    }

    angular
        .module('app')
        .factory('Navigation', Navigation);
})();
(function () {
    function Static($resource, base) {
        return $resource(base.backend + '/page/:id', {id: '@id'}, {
            update: {method: 'PUT'}
        });
    }

    angular
        .module('app')
        .factory('Static', Static);
})();

app.factory('Ticket', function ($resource) {
    return $resource(app.backendUrl + '/ticket/:id', {}, {
        update: {method: 'PUT'}
    });
});
app.factory('User', function ($resource) {
    return $resource(app.backendUrl + '/user/:id', {}, {
        update: {method: 'PUT'}
    });
});
app.service('CRUDService', function () {
    var self = this;

    self.init = function (type, Factory) {
        var vm = {};

        vm.isList = true;

        Factory.query(function (results) {
            vm[type + 's'] = results;
        }).$promise.catch(function (response) {
                jQuery('#error.modal').modal('show').find('.modal-body').html(response.data);
            });

        vm.prepare = function (result) {
            vm.modalTitle = result ? 'Update' : 'Create';
            vm.control = result ? 'update' : 'create';
            vm[type] = angular.copy(result) || {};
            vm.isList = false;
            vm.index = vm[type + 's'].indexOf(result);
        };

        vm.create = function () {
            Factory.save({}, vm[type], function (data) {
                vm[type].id = data.id;
                vm[type + 's'].push(vm[type]);
                vm.prepare(vm[type]);
            }).$promise.catch(function (response) {
                    jQuery('#error.modal').modal('show').find('.modal-body').html(response.data);
                });
        };

        vm.update = function () {
            Factory.update({}, vm[type], function (data) {
                vm[type].id = data.id;
                vm[type + 's'][vm.index] = angular.copy(vm[type]);
            }).$promise.catch(function (response) {
                    jQuery('#error.modal').modal('show').find('.modal-body').html(response.data);
                });
        };

        vm.remove = function () {
            Factory.remove({id: vm[type].id}, function () {
                vm[type + 's'].splice(vm.index, 1);
                vm[type] = undefined;
            }).$promise.catch(function (response) {
                    jQuery('#error.modal').modal('show').find('.modal-body').html(response.data);
                });
        };

        return vm;
    }
});