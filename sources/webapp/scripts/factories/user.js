
crm.factory('UserFactory', function($resource) {
    return $resource(crm.backendUrl + "user/:id/", {}, {
        update: {method: 'PUT'}
    });
});
