/**
 * Created by mil on 07.09.16.
 * 
 * @ngdoc component
 * @name nkSearchForm
 * @param ngModel
 * @param ngChange
 * @param buttonText
 */

angular.module("app").component("nkModal", {
    bindings: {
        data: "=",
        settings: "="
    },
    template: require('./nk-modal.component.html'),
    controller : function () {
    }

});