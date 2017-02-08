/**
 * Created by mil on 07.10.2015.
 */
 
staffApp.controller('projectsController', function($scope, $http) {

	function getProjects(){

		$http.post("./core/getProject.php").success(function(data){

			$scope.projects = data; //the data are stored in projects
			console.log(data);

		});
	}

	getProjects();

	$scope.delProject = function(id){

		$http.get('./core/delProject.php/?id='+id+'').success(function ( responce ) {
			console.log(responce);
			getProjects();
		});
	};

	/*$scope.vm.prepare = function (project) {
		$scope.vm.modalTitle = project ? 'Изменение профиля: '+project.title : 'Новый профиль';
	};*/

	//$scope.vm.control = 'create';

	/*$scope.vm.create = function() {
		/!*$http.post('./core/addProject.php', {"title" : $scope.vm.project.title}).success(function ( responce ) {
			console.log(responce);
			getProjects();
		});*!/

		/!*console.log({"login" : $scope.vm.user.login});
		console.log($scope.vm.user);*!/
		console.log("create");
	};*/

});
