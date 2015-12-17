
crm.factory('IndividualFactory', function($resource) {
    return $resource(crm.backendUrl + "individual/:id/", {}, {
        update: {method: 'PUT'}
    });
});