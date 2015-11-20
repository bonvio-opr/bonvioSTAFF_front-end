/**
 * Created by mil on 07.10.2015.
 */

staffApp.controller('usersController', function($scope, $http) {
    /**
     * @type {{fullName: String, shortName: String, login: String, password: String, email: String, workPhone: String, mobilePhone: String, address: String, company: String, department: String, position: String}}
     */
    $scope.user = {};

    $http.get('_data/users.json').then(function(responce) {
        $scope.users = responce.data;
    });

    $scope.vm = {};

    $scope.vm.prepare = function (user) {
        $scope.vm.modalTitle = user ? 'Editing profile for user: '+user.shortName : 'New profile';
    };

});