/**
 * Created by mil on 07.09.16.
 * 
 * @ngdoc component
 * @name nkList
 * @param ngModel
 * @param ngChange
 * @param buttonText
 */

angular.module("app").component("nkList", {
    bindings: {
        list: "=",
        imgProp: "="
    },
    template: `
    <ul class="list-group">
        <li class="list-group-item" ng-repeat="itemList in $ctrl.list">
            <div class="panel panel-default">
                <div class="panel-heading">Item #{{$index}}</div>
                <div class="panel-body">
                    <p><pre>{{itemList | json}}</pre></p>
                </div>
                <ul class="list-group">
                    <li class="list-group-item" ng-repeat="(key, value) in itemList">
                        <h4 class="list-group-item-heading">{{key}}</h4>
                        <img ng-if="key==$ctrl.imgProp.src" ng-src="{{value}}" width="{{$ctrl.imgProp.width}}" height="{{$ctrl.imgProp.height}}" alt="{{value}}">
                        <p ng-if="key!=$ctrl.imgSrc" class="list-group-item-text">{{value}}</p>
                    </li>
                </ul>
            </div>  
        </li>
    </ul>
    `,
    controller : function () {
    }

});