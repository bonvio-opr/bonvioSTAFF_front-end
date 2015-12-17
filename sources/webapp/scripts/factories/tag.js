
crm.factory('TagFactory', function($resource) {
    return $resource(crm.backendUrl + "tag/:id/", {}, {
        update: {method: 'PUT'}
    });
});