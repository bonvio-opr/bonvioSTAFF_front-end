(function () {
    function Static($resource, base) {
        return $resource(base.backend + '/page/:id', {id: '@id'}, {
            update: {method: 'PUT'}
        });
    }

    angular
        .module('app')
        .factory('Static', Static);
})();
