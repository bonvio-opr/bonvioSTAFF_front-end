(function () {
    function codeCompile($compile, $timeout) {
        return {
            restrict: 'E',
            scope: {
                template1: '='
            },
            replace: true,
            link: function (scope, element) {
                $timeout(function () {
                    var template = scope.template1;
                    var linkFn = $compile(template);
                    var content = linkFn(scope);
                    element.append(content);
                }, 100);
            }
        };
    }

    /**
     * @ngdoc directive
     * @name codeCompile
     * @restrict E
     *
     * @param {HTMLBaseElement} template1
     */
    angular
        .module('app')
        .directive('codeCompile', codeCompile);
})();