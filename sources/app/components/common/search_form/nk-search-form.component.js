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
    <form class="navbar-form navbar-left" role="search" name="searchForm" novalidate ng-submit="$ctrl.ngChange({$value: $ctrl.ngModel})">
        <div class="form-group">
            <input class="form-control" placeholder="{{::$ctrl.buttonText}}" ng-model="$ctrl.ngModel" ng-model-options="{updateOn: 'blur'}">
        </div>
        <nk-button button-text="{{$ctrl.buttonText}}"></nk-button>
    </form>
    `
});