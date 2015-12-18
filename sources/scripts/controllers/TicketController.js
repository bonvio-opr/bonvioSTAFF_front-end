app.controller('TicketController', function ($scope, CRUDService, Ticket) {
    $scope.vm = CRUDService.init('ticket', Ticket);

    $scope.vm.create = function () {
        Ticket.save({}, $scope.vm.ticket, function (data) {
            $scope.vm.ticket.id = data.id;
            $scope.vm.ticket.dateCreate = 'NOW';
            $scope.vm.tickets.push($scope.vm.ticket);
            $scope.vm.prepare($scope.vm.ticket);
        }).$promise.catch(function (response) {
            jQuery('#error.modal').modal('show').find('.modal-body').html(response.data);
        });
    };

    $scope.vm.update = function () {
        delete $scope.vm.ticket.dateCreate;
        Ticket.update({}, $scope.vm.ticket, function (data) {
            $scope.vm.ticket.id = data.id;
            $scope.vm.ticket.dateCreate = 'NOW';
            $scope.vm.tickets[$scope.vm.index] = angular.copy($scope.vm.ticket);
        }).$promise.catch(function (response) {
            jQuery('#error.modal').modal('show').find('.modal-body').html(response.data);
        });
    };
    
});