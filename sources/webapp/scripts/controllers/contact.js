
crm.controller('ContactController', function($scope, $http, ContactFactory, CompanyFactory, IndividualFactory) {

    $scope.vm = {};
    $scope.vm.tab = 0;
    $scope.vm.modalTab = 0;

    $scope.vm.prepare = function (contact) {
        if ($scope.vm.modalTab == 0) {
            $scope.vm.modalTitle = contact ? 'Изменение профиля компании: ' + contact.shortName : 'Новый профиль';
            $scope.vm.company = angular.copy(contact) || {};
            delete $scope.vm.company.type;
            delete $scope.vm.company.id;
            $scope.vm.index = $scope.vm.contacts.indexOf(contact);
        }
        if ($scope.vm.modalTab == 1) {
            $scope.vm.modalTitle = contact ? 'Изменение профиля компании: ' + individual.shortName : 'Новый профиль';
            $scope.vm.individual = angular.copy(contact) || {};
            delete $scope.vm.individual.type;
            delete $scope.vm.individual.id;
            $scope.vm.index = $scope.vm.contacts.indexOf(contact);
        }
    };

    //$scope.vm.contacts = ContactFactory.query();
    ContactFactory.query(function(data) {
        console.log(data);
        $scope.vm.contacts = data;
    });

    $scope.vm.create = function() {
        if ($scope.vm.modalTab == 0) {
            var dataModal = angular.copy($scope.vm.company);
            CompanyFactory.save(dataModal, function (data) {
                dataModal.id = data.id;
                dataModal.type = 'company';
                $scope.vm.contacts.push(dataModal);
            });
            $scope.vm.company = {};
        }
        //individual
        if ($scope.vm.modalTab == 1) {
            var dataModal = angular.copy($scope.vm.individual);
            IndividualFactory.save(dataModal, function (data) {
                dataModal.id = data.id;
                dataModal.type = 'individual';
                $scope.vm.contacts.push(dataModal);
            });
            $scope.vm.individual = {};
        }


    };

    $scope.vm.update = function() {
        if ($scope.vm.modalTab == 0) {
            CompanyFactory.update($scope.vm.company, function () {
                $scope.vm.contacts[$scope.vm.index] = angular.copy($scope.vm.company);
            });
        }
        if ($scope.vm.modalTab == 1) {
            IndividualFactory.update($scope.vm.individual, function () {
                $scope.vm.contacts[$scope.vm.index] = angular.copy($scope.vm.individual);
            });
        }
    };

    $scope.vm.remove = function(contact) {
        ContactFactory.remove({id: contact.id}, function () {
            var index = $scope.vm.contacts.indexOf(contact);
            $scope.vm.contacts.splice(index, 1);
            contact = undefined;
        });
    };

});
