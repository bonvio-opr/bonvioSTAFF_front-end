/**
 * Created by mil on 07.09.16.
 * 
 * @ngdoc component
 * @name nkSearchForm
 * @param ngModel
 * @param ngChange
 * @param buttonText
 */

angular.module("app").component("nkButton", {
    bindings: {
        buttonText: "@"
    },
    template: `
    <button class="btn btn-default" type="submit">{{$ctrl.buttonText}} {{$ctrl.text}}</button>
    `,
    controller : function () {
        this.$onChanges = bindings => {
            if ((bindings.buttonText.currentValue) && (bindings.buttonText.currentValue != '')) this.buttonText = bindings.buttonText.currentValue;
            else this.buttonText = 'button';
        };
    }

});