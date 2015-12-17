/**
 * Created by mil on 18.12.15.
 */

app.controller('ServiceController', function($scope, $http) {
    /**
     * @type {{name: String, ip: String, services: Array}}
     */
    $scope.servers = {};
    /**
     * @type {{title: String, port: String, url: Object, login: String, password: String, sources: Array}}
     */
    $scope.service = {};
    /**
     * @type {{title: String, link: String}}
     */
    $scope.url = {};
    /**
     * @type {{title: String, url:String, login: String, password: String}}
     */
    $scope.source = {};

    $http.get('/_data/servers.json').then(function(responce) {
        $scope.servers = responce.data;
    })
});