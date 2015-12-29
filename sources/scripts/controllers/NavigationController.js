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