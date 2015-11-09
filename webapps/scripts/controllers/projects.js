/**
 * Created by mil on 07.10.2015.
 */
 
staffApp.controller('projectsController', function($scope, $http) {

	getProject();  

	function getProject(){

		$http.post("./getProject.php").success(function(data){

			$scope.projects = data; //the data are stored in projects

		});
	}

});
