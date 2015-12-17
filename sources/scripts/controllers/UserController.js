app.controller('UserController', function ($scope, CRUDService, User) {
    $scope.vm = CRUDService.init('user', User);
});