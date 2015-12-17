
crm.factory('ContactFactory', function($resource) {
    return $resource(crm.backendUrl + "contact/:id/", {}, {
        update: {method: 'PUT'}
    });
});