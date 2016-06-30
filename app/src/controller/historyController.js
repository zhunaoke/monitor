/**
 * Created by Administrator on 2016/3/9.
 */
/**
 * Created by Administrator on 2016/3/9.
 */
var historyApp=angular.module("app.history",[
    "ngCookies",
    "ui.bootstrap",
    "app.historyService"
]);

historyApp.controller("historyCtrl",["$scope","$window","$rootScope",function($scope,$window,$rootScope){
    $rootScope.titName="全部";
    //$("header .navbar-menu li").eq(3).addClass("active").siblings("li").removeClass("active");
    changeHeader(3);
}]);
//historyApp.controller('history.whole',["$scope","$rootScope",function($scope,$rootScope){
//    $rootScope.titName='全部';
//}]);
//historyApp.controller('history.monitor',["$scope","$rootScope",function($scope,$rootScope){
//    $rootScope.titName='HTTP监控文档';
//}]);