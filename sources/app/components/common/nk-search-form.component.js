/**
 * Created by mil on 07.09.16.
 * 
 * @ngdoc component
 * @name nkSearchForm
 * @param ngModel
 * @param ngChange
 * @param buttonText
 */

angular.module("app").component("nkSearchForm", {
    bindings: {
        ngModel: "=",
        ngChange: "&",
        buttonText: "@"
    },
    template: `
    <form name="searchForm" novalidate ng-submit="$ctrl.ngChange({$value: $ctrl.ngModel})">
        <input ng-model="$ctrl.ngModel" ng-model-options="{updateOn: 'blur'}">
        <button type="submit">{{::$ctrl.buttonText}} {{$ctrl.ngModel}} {{::$ctrl.ngModel}}</button>
    </form>
    `

});