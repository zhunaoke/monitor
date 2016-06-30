/**
 * Created by Administrator on 2016/3/9.
 */
var helpApp=angular.module("app.help",[
    "ngCookies",
    "ui.bootstrap",
    "app.helpService"
]);

helpApp.controller("helpCtrl",["$scope","$window","$rootScope",function($scope,$window,$rootScope){
    $rootScope.titName="全部";
    //$("header .navbar-menu li").eq(5).addClass("active").siblings("li").removeClass("active");
    changeHeader(5);
}]);
helpApp.controller('help.whole',["$scope","$rootScope",function($scope,$rootScope){
    $rootScope.titName='全部';
}]);
helpApp.controller('help.monitor',["$scope","$rootScope",function($scope,$rootScope){
    $rootScope.titName='HTTP监控文档';
}]);