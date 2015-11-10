/**
 * Created by mil on 07.10.2015.
 */

staffApp.controller('usersController', function($scope, $http) {

    $scope.fullName = {};

    $scope.shortName = {};

    $scope.login = {};

    $scope.email = {};
	
	$scope.workPhone = {};
	
	$scope.mobilePhone = {};
	
	$scope.address = {};

    $http.get('_data/users.json').then(function(responce) {
        $scope.users = responce.data;
    });

    $scope.vm = {};

    $scope.vm.prepare = function (user) {
        $scope.vm.modalTitle = user ? 'Editing profile for user: '+user.shortName : 'New profile';
    };

});