/**
 * Created by Administrator on 2016/3/24.
 */
describe("help模块Service",function(){

    describe("helpService",function(){
       var $scope,$rootScope,$q,$httpBackend,$window,helpService;
        beforeEach(function(){
            module('app.helpService');
            inject(function(_$rootScope_,_$q_,_$window_,_$httpBackend_,help){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $q=_$q_;
                $window=_$window_;
                $httpBackend=_$httpBackend_;
                helpService=help;
            });
        });
        it("test",function(){

        });
    });
});