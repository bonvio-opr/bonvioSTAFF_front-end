/**
 * Created by mil on 07.09.16.
 * 
 * @ngdoc component
 * @name nkSearchForm
 * @param ngModel
 * @param ngChange
 * @param buttonText
 */

angular.module("app").component("nkList", {
    bindings: {
        items: "="
    },
    template: `
    <ul class="list-group">
        <li class="list-group-item" ng-repeat="item in $ctrl.items">
            <span>{{item.name}}</span>
        </li>
    </ul>
    `,
    controller : function () {

    }

});