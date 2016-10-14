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
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    template: require('./nk-modal.component.html'),
    controller : function () {
        var $ctrl = this;

        $ctrl.ok = function (value) {
            $ctrl.close({$value: '123'});
        };

        $ctrl.cancel = function () {
            $ctrl.dismiss({$value: 'cancel'});
        };
    }

});