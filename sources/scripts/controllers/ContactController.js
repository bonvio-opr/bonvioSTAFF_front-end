app.controller('ContactController', function ($scope, Company, Individual) {
    $scope.vm = this;

    Company.query(function (componies) {
        Individual.query(function (individuals) {
            $scope.vm.contacts = componies.concat(individuals);
        });
    });
});