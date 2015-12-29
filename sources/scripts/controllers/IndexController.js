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