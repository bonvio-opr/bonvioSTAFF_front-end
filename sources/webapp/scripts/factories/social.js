
crm.factory('SocialFactory', function($resource) {
    return $resource(crm.backendUrl + "social/:id/", {}, {
        update: {method: 'PUT'}
    });
});