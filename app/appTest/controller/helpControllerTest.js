/**
 * Created by Administrator on 2016/3/24.
 */
/**
 * helpController
 */
describe("helpController test",function(){
    beforeEach(module('app.help'));
    //helpCtrl;
    describe('helpCtrl',function(){
        var $scope,$rootScope;
        beforeEach(function(){
            inject(function(_$rootScope_,$controller){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $controller('helpCtrl',{'$scope':$scope});
            });
        });
        it("helpCtrl",function(){
            expect($rootScope.titName).toBeDefined();
        });

    });
    //help.whole;
    describe('help.whole',function(){
        var $scope,$rootScope;
        beforeEach(function(){
            inject(function(_$rootScope_,$controller){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $controller('help.whole',{'$scope':$scope});
            });
        });
        it("help.whole",function(){
            expect($rootScope.titName).toBeDefined();
        });

    });
    //help.monitor;
    describe('help.monitor',function(){
        var $scope,$rootScope;
        beforeEach(function(){
            inject(function(_$rootScope_,$controller){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $controller('help.monitor',{'$scope':$scope});
            });
        });
        it("help.monitor",function(){
            expect($rootScope.titName).toBeDefined();
        });

    });
});