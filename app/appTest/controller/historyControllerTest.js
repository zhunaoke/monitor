/**
 * Created by Administrator on 2016/3/24.
 */
/**
 * helpController
 */
describe("historyController test",function(){
    beforeEach(module('app.history'));
    //historyCtrl;
    describe('historyCtrl',function(){
        var $scope,$rootScope;
        beforeEach(function(){
            inject(function(_$rootScope_,$controller){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $controller('historyCtrl',{'$scope':$scope});
            });
        });
        it("historyCtrl",function(){
            expect($rootScope.titName).toBeDefined();
        });

    });
});