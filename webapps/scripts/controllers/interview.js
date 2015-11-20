/**
 * Created by mil on 07.10.2015.
 */

staffApp.controller('interviewController', function($scope, $http) {

    $scope.customers = {};

    /*$http.get('_data/customers.json').then(function(responce) {
        $scope.customers = responce.data;
        console.log(responce.data);
    });*/

    $http.get('http://webapps.bonvio.net/interview/getCustomers').success(function ( responce ) {
        $scope.customers = responce;
        //console.log(responce);
    });

    $scope.vm = {};

    $scope.vm.create = function() {
        //
        console.log("create");
    };

    $scope.vm.update = function (){
        //
        console.log("update");
    };

    $scope.vm.prepare = function (user) {
        $scope.vm.modalTitle = user ? 'Editing profile for user: '+user.shortName : 'New profile';
    };

});