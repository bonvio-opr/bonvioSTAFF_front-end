/**
 * Created by mil on 07.09.16.
 * 
 * @ngdoc component
 * @name nkModal
 * @param resolve
 * @param close
 * @param dismiss
 */

angular.module("app").component("nkModal", {
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    template: require('./nk-modal.component.html'),
    controller : function () {
        this.hui = this.resolve.a;

        var $ctrl = this;

        $ctrl.ok = function (value) {
            this.hui.$save();
            // $ctrl.close({$value: value});
        }.bind(this);

        $ctrl.cancel = function () {
            $ctrl.dismiss({$value: 'cancel'});
        };
    }

});