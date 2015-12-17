app.factory('Individual', function ($resource) {
    return $resource(app.backendUrl + '/individual/:id', {}, {
        update: {method: 'PUT'}
    });
});