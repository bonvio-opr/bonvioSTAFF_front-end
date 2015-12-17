
crm.controller('UserController', function($scope, $http, UserFactory) {


    $scope.vm = {};

    $scope.vm.prepare = function (user) {
        $scope.vm.modalTitle = user ? 'Изменение профиля пользователя: ' + user.login : 'Новый профиль';
        $scope.vm.user = angular.copy(user) || {};
        $scope.vm.index = $scope.vm.users.indexOf(user);
    };

    $scope.vm.users = UserFactory.query();
    /*UserFactory.query(function(data) {
        console.log(data);
        $scope.vm.users = data;
    });*/

    $scope.vm.create = function() {
        UserFactory.save($scope.vm.user, function (data) {
            $scope.vm.user.id = data.id;
            $scope.vm.users.push($scope.vm.user);
            $scope.vm.prepare($scope.vm.user);
        });
    };

    $scope.vm.update = function() {
        UserFactory.update($scope.vm.user, function () {
            $scope.vm.users[$scope.vm.index] = angular.copy($scope.vm.user);
        });
    };

    $scope.vm.remove = function(user) {
        UserFactory.remove({id: user.id}, function () {
            var index = $scope.vm.users.indexOf(user);
            $scope.vm.users.splice(index, 1);
            user = undefined;
        });
    };



});
