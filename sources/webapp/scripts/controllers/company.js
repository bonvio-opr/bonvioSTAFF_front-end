
crm.controller('CompanyController', function($scope, $http, CompanyFactory) {


    $scope.vm = {};

    $scope.vm.prepare = function (company) {
        $scope.vm.modalTitle = company ? 'Изменение профиля компании: ' + company.shortName : 'Новый профиль';
        $scope.vm.company = angular.copy(company) || {};
        $scope.vm.index = $scope.vm.companies.indexOf(company);
    };

    //$scope.vm.companies = CompanyFactory.query();
    CompanyFactory.query(function(data) {
        console.log(data);
        $scope.vm.companies = data;
    });


    $scope.vm.create = function() {
        CompanyFactory.save($scope.vm.company, function (data) {
            $scope.vm.company.id = data.id;
            $scope.vm.companies.push($scope.vm.company);
            //$scope.vm.prepare($scope.vm.company);
        });
    };

    $scope.vm.update = function() {
        CompanyFactory.update($scope.vm.company, function () {
            $scope.vm.companies[$scope.vm.index] = angular.copy($scope.vm.company);
        });
    };

    $scope.vm.remove = function(company) {
        CompanyFactory.remove({id: company.id}, function () {
            var index = $scope.vm.companies.indexOf(company);
            $scope.vm.companies.splice(index, 1);
            company = undefined;
        });
    };

    $scope.vm.getExtendedData = function(company) {

        var exception = function(status) {
            if (status == '500') {
                console.log('pisoooot');
                return 500;
            }
            if (status == '204') {
                console.log('204=)');
                return 204;
            }
            else return 200;
        };

        var entity = "phone";
        $http({
            method: 'GET',
            url: crm.backendUrl+"company/"+entity+"/"+company.id
        }).then(function successCallback(response) {
            $scope.phones = response.data;
            //console.log(response.data+" data");
            //console.log(response.status+" status");
            //console.log(response.headers+" headers");
            //console.log(response.config+" config");
            if ((exception(response.status)) !== 200) {$scope.phones = null;}
        }, function errorCallback(response) {
            exception(response.status);
        });

        var entity = "email";
        $http({
            method: 'GET',
            url: crm.backendUrl+"company/"+entity+"/"+company.id
        }).then(function successCallback(response) {
            console.log(response);
            $scope.emails = response.data;
            //console.log(response.data+" data");
            //console.log(response.status+" status");
            //console.log(response.headers+" headers");
            //console.log(response.config+" config");
            if ((exception(response.status)) !== 200) {$scope.emails = null;}
        }, function errorCallback(response) {
            exception(response.status);
        });

        var entity = "social";
        $http({
            method: 'GET',
            url: crm.backendUrl+"company/"+entity+"/"+company.id
        }).then(function successCallback(response) {
            $scope.socials = response.data;
            //console.log(response.data+" data");
            //console.log(response.status+" status");
            //console.log(response.headers+" headers");
            //console.log(response.config+" config");
            if ((exception(response.status)) !== 200) {$scope.socials = null;}
        }, function errorCallback(response) {
            exception(response.status);
        });

        var entity = "website";
        $http({
            method: 'GET',
            url: crm.backendUrl+"company/"+entity+"/"+company.id
        }).then(function successCallback(response) {
            $scope.websites = response.data;
            //console.log(response.data+" data");
            //console.log(response.status+" status");
            //console.log(response.headers+" headers");
            //console.log(response.config+" config");
            if ((exception(response.status)) !== 200) {$scope.websites = null;}
        }, function errorCallback(response) {
            exception(response.status);
        });

        var entity = "tag";
        $http({
            method: 'GET',
            url: crm.backendUrl+"company/"+entity+"/"+company.id
        }).then(function successCallback(response) {
            console.log(response);
            $scope.tags = response.data;
            //console.log(response.data+" data");
            //console.log(response.status+" status");
            //console.log(response.headers+" headers");
            //console.log(response.config+" config");
            if ((exception(response.status)) !== 200) {$scope.tags = null;}
        }, function errorCallback(response) {
            exception(response.status);
        });

    };

});
