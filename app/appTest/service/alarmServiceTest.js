/**
 * Created by Administrator on 2016/3/24.
 */
describe("告警模块Service",function(){

    describe("alarmService",function(){
       var $scope,$rootScope,$q,$httpBackend,$window,alarmService;
        beforeEach(function(){
            module('app.alarmService');
            inject(function(_$rootScope_,_$q_,_$window_,_$httpBackend_,alarm){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $q=_$q_;
                $window=_$window_;
                $httpBackend=_$httpBackend_;
                alarmService=alarm;
            });
        });
        it("test",function(){

        });
    });
});