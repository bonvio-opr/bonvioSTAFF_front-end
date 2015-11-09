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
    })
});