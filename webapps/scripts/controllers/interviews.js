/**
 * Created by mil on 07.10.2015.
 */

staffApp.controller('interviewsController', function($scope, $http) {

    $scope.customers = {};

    /*$http.get('_data/customers.json').then(function(responce) {
        $scope.customers = responce.data;
        console.log(responce.data);
    });*/

    var getCustomers = function() {
        $http.get('http://webapps.bonvio.net/interview/getCustomers').success(function ( responce ) {
            $scope.customers = responce;
            console.log(responce);
        });
    };

    getCustomers();

    $scope.vm = {};

    $scope.vm.control = 'create';

    $scope.vm.create = function() {
        $http.post('http://webapps.bonvio.net/interview/addCustomer', {"name" : $scope.vm.interview.fullName}).success(function ( responce ) {
            console.log(responce);
            getCustomers();
        });
        console.log($scope.vm.interview);
        console.log($scope.vm.interview.fullName);
        console.log("create");
    };

    $scope.vm.update = function (){
        //
        console.log("update");
    };

    $scope.vm.prepare = function (customer) {
        //$scope.vm.modalTitle = customer ? 'Editing profile for user: '+customer.shortName : 'New profile';
    };

    /**
     * getAnswersByCustomerId
     */
    $scope.vm.getAnswersByCustomerId = function(id) {
        console.log(id);
        $http.get('http://webapps.bonvio.net/interview/getAnswersByCustomerId/'+id).success(function ( responce ) {
            $scope.answers = responce;
            console.log(responce);
        });

    }


});