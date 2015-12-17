app.factory('User', function ($resource) {
    return $resource(app.backendUrl + '/user/:id', {}, {
        update: {method: 'PUT'}
    });
});