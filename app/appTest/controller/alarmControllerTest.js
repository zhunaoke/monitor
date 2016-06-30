/**
 * Created by Administrator on 2016/3/24.
 */
/**
 * alarmController
 */
describe("alarmController test",function(){
    beforeEach(module('app.alarm'));
    //alarmCtrl;
    describe('alarmCtrl',function(){
        var $scope,$rootScope;
        beforeEach(function(){
            inject(function(_$rootScope_,$controller){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $controller('alarmCtrl',{'$scope':$scope});
            });
        });
        it("alarmCtrl test",function(){
            expect($rootScope.titName).toBeDefined();
        });

    });
    //alarm.web;
    describe('alarm.web',function(){
        var $scope,$rootScope;
        beforeEach(function(){
            inject(function(_$rootScope_,$controller){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $controller('alarm.web',{'$scope':$scope});
            });
        });
        it("alarmCtrl test",function(){
            expect($rootScope.titName).toBeDefined();
        });

    });
    //alarm.service;
    describe('alarm.service',function(){
        var $scope,$rootScope;
        beforeEach(function(){
            inject(function(_$rootScope_,$controller){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $controller('alarm.service',{'$scope':$scope});
            });
        });
        it("alarmCtrl test",function(){
            expect($rootScope.titName).toBeDefined();
        });

    });
});