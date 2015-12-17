app.controller('CompanyController', function ($scope, $state, CRUDService, Company) {
    $scope.vm = CRUDService.init('company', Company);
    $scope.vm.isUpsert = $state.is('index.companies');
});