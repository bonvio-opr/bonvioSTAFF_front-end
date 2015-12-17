app.factory('Company', function ($resource) {
    return $resource(app.backendUrl + '/company/:id', {}, {
        update: {method: 'PUT'}
    });
});