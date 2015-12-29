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