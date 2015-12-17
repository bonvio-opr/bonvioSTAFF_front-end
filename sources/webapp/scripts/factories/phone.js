
crm.factory('PhoneFactory', function($resource) {
    return $resource(crm.backendUrl + "phone/:id/", {}, {
        update: {method: 'PUT'}
    });
});