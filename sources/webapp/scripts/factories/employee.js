
crm.factory('EmployeeFactory', function($resource) {
    return $resource(crm.backendUrl + "employee/:id/", {}, {
        update: {method: 'PUT'}
    });
});