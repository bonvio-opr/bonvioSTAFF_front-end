
crm.factory('WebsiteFactory', function($resource) {
    return $resource(crm.backendUrl + "website/:id/", {}, {
        update: {method: 'PUT'}
    });
});