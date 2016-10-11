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
            <input class="form-control" placeholder="Search" ng-model="$ctrl.ngModel" ng-model-options="{updateOn: 'blur'}">
        </div>
        <button class="btn btn-default" type="submit">{{::$ctrl.buttonText}} {{$ctrl.ngModel}} {{::$ctrl.ngModel}}</button>
    </form>
    `

});