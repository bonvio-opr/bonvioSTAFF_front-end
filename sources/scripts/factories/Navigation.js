(function () {
    function Navigation($resource, base) {
        return $resource(base.backend + '/navigation/:id', {id: '@id'}, {
            update: {method: 'PUT'}
        });
    }

    angular
        .module('app')
        .factory('Navigation', Navigation);
})();