
crm.factory('EmailFactory', function($resource) {
    return $resource(crm.backendUrl + "email/:id/", {}, {
        update: {method: 'PUT'}
    });
});