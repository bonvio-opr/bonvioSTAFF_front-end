/**
 * Created by mil on 07.10.2015.
 */
 
staffApp.controller('projectsController', function($scope, $http) {

	getProjects();

	function getProjects(){

		$http.post("./core/getProject.php").success(function(data){

			$scope.projects = data; //the data are stored in projects
			console.log(data);

		});
	}

	$scope.delProject = function(id){
		console.log(id);
		/*$http.get('./core/delProject.php/?id='+id+'').success(function ( responce ) {
			console.log(responce);
			getCustomers();
		});*/
	}

});
