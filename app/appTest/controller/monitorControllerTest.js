/**
 * Created by Administrator on 2016/3/24.
 */
/**
 * helpController
 */
describe("monitorController test",function(){
    beforeEach(module('app.monitor'));
    //monitorCtrl;
    describe('monitorCtrl',function(){
        var $scope,$rootScope;
        beforeEach(function(){
            inject(function(_$rootScope_,$controller){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $controller('monitorCtrl',{'$scope':$scope});
            });
        });
        it("monitorCtrl",function(){
            expect($rootScope.titName).toBeDefined();
        });
    });
    //monitor.http;
    describe('monitor.http',function(){
        var $scope,$rootScope,$window,token,$state,monitorService;
        beforeEach(module('ui.router'));
        beforeEach(function(){
            inject(function(_$rootScope_,$controller,_$window_,_$state_,monitor){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $window=_$window_;
                $state=_$state_;
                //token='MjAxNTgxMTE=:LnAD74lRI9b_YmGdpFI-I7zOmYuX8T11o7wXbuufH3T_r4OcQv1MvRe6l2IEdYADu1QckSnBXfqDiEV3Z3-9yn0jiciUsOF7';
                //$window.localStorage.token=base64encode(token);
                monitorService=monitor;
                $controller('monitor.http',{'$scope':$scope,'$window':$window,'$state':$state});
            });
        });
        it("monitor.http",function(){
            expect($rootScope.titName).toBeDefined();
            expect($scope.mt).toBeDefined();
        });
        it("get list",function(){
            $scope.mt.getMonitorList(1,10,'http_mornitor_id','DESC','');
            expect($scope.allItems).not.toBeNull();
        })

    });
    //monitor.pay;
    describe('monitor.pay',function(){
        var $scope,$rootScope;
        beforeEach(function(){
            inject(function(_$rootScope_,$controller){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $controller('monitor.pay',{'$scope':$scope});
            });
        });
        it("monitor.pay",function(){
            expect($rootScope.titName).toBeDefined();
        });

    });
});