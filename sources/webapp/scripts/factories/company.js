
crm.factory('CompanyFactory', function($resource) {
    return $resource(crm.backendUrl + "company/:id/", {}, {
        update: {method: 'PUT'}
    });
});