app.factory('Ticket', function ($resource) {
    return $resource(app.backendUrl + '/ticket/:id', {}, {
        update: {method: 'PUT'}
    });
});