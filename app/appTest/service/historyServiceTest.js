/**
 * Created by Administrator on 2016/3/24.
 */
describe("history模块Service",function(){

    describe("historyService",function(){
       var $scope,$rootScope,$q,$httpBackend,$window,historyService;
        beforeEach(function(){
            module('app.historyService');
            inject(function(_$rootScope_,_$q_,_$window_,_$httpBackend_,history){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $q=_$q_;
                $window=_$window_;
                $httpBackend=_$httpBackend_;
                historyService=history;
            });
        });
        it("test",function(){

        });
    });
});