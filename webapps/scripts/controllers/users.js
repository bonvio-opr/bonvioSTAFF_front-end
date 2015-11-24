/**
 * Created by mil on 07.10.2015.
 */

staffApp.controller('usersController', function($scope, $http) {
    /**
     * @type {{fullName: String, shortName: String, login: String, password: String, email: String, workPhone: String, mobilePhone: String, address: String, company: String, department: String, position: String}}
     */

    $scope.user = {};

    var getUsers = function() {
        $http.get('http://192.168.50.136:8080/api/users').then(function(responce) {
            $scope.users = responce.data;
            console.log(responce.data);
        });
    };

    getUsers();

    $scope.vm = {};

    $scope.vm.prepare = function (user) {
        $scope.vm.modalTitle = user ? 'Изменение профиля пользователя: '+user.login : 'Новый профиль';
    };

    $scope.vm.control = 'create';

    $scope.vm.create = function() {
        $http.post('http://192.168.50.136:8080/api/user', {"login" : $scope.vm.user.login}).success(function ( responce ) {
            console.log(responce);
            getUsers();
        });

        console.log({"login" : $scope.vm.user.login});
        console.log($scope.vm.user);
        console.log("create");
    };

});