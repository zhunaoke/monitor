var alarmApp=angular.module("app.alarm",[
    "ngCookies",
    "ui.bootstrap",
    "app.alarmService"
]);

alarmApp.controller("alarmCtrl",["$scope","$window","$rootScope",function($scope,$window,$rootScope){
    $rootScope.titName="网站告警历史";
    //$("header .navbar-menu li").eq(2).addClass("active").siblings("li").removeClass("active");
    changeHeader(2);
}]);
alarmApp.controller('alarm.web',["$scope","$rootScope",function($scope,$rootScope){
    $rootScope.titName='网站告警历史';
}]);
alarmApp.controller('alarm.service',["$scope","$rootScope",function($scope,$rootScope){
    $rootScope.titName='服务器告警历史';
}]);