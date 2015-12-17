app.controller('IndividualController', function ($scope, $state, CRUDService, Individual) {
    $scope.vm = CRUDService.init('individual', Individual);
    $scope.vm.isUpsert = $state.is('index.individuals');
});