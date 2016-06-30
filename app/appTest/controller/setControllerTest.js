/**
 * Created by Administrator on 2016/3/24.
 */
/**
 * helpController
 */
describe("setController test",function(){
    beforeEach(module('app.set'));
   // setCtrl;
    describe('setCtrl',function(){
        var $scope,$rootScope;
        beforeEach(function(){
            inject(function(_$rootScope_,$controller){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $controller('setCtrl',{'$scope':$scope});
            });
        });

    });
    //set.alarm;
    describe('set.alarm',function(){
        var $scope,$rootScope;
        beforeEach(function(){
            inject(function(_$rootScope_,$controller){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $controller('set.alarm',{'$scope':$scope});
            });
        });
        it("set.alarm",function(){
            expect($rootScope.titName).toBeDefined();
        });

    });
    //set.monitor;
    describe('set.monitor',function(){
        var $scope,$rootScope,$window,setService,token;
        beforeEach(function(){
            inject(function(_$rootScope_,_$window_,$controller,set){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $window=_$window_;
                //$httpProvider=_$httpProvider_;
                token='MjAxNTgxMTE=:LnAD74lRI9b_YmGdpFI-I7zOmYuX8T11o7wXbuufH3T_r4OcQv1MvRe6l2IEdYADu1QckSnBXfqDiEV3Z3-9yn0jiciUsOF7';
                $window.localStorage.token=base64encode(token);
                setService=set;
                //$httpProvider.defaults.headers.common = { 'token' : base64decode(window.localStorage.getItem('token'))};
                $controller('set.monitor',{'$scope':$scope,'$window':$window});
            });
        });
        it("set.monitor",function(){
            expect($rootScope.titName).toBeDefined();
        });
    });
    //set.user;
    describe('set.user',function(){
        var $scope,$rootScope,$window,setService,token;
        beforeEach(function(){
            inject(function(_$rootScope_,_$window_,$controller,set){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $window=_$window_;
                //token='MjAxNTgxMTE=:LnAD74lRI9b_YmGdpFI-I7zOmYuX8T11o7wXbuufH3T_r4OcQv1MvRe6l2IEdYADu1QckSnBXfqDiEV3Z3-9yn0jiciUsOF7';
                //$window.localStorage.token=base64encode(token);
                setService=set;
                $controller('set.user',{'$scope':$scope,'$window':$window});
            });
        });
        it("set.user",function(){
            expect($rootScope.titName).toBeDefined();
            //expect(token).toBeDefined();
            //expect(token).not.toBeNull();
            expect($scope.people).toBeDefined();
            expect($scope.peopleAddInfo).toBeDefined();
        });
    });

    //set.template;
    describe('set.template',function(){
        var $scope,$rootScope,$window,setService,token,$state;
        beforeEach(module('ui.router'));
        beforeEach(function(){
            inject(function(_$rootScope_,_$window_,_$state_,$controller,set){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $window=_$window_;
                $state=_$state_;
                //token='MjAxNTgxMTE=:LnAD74lRI9b_YmGdpFI-I7zOmYuX8T11o7wXbuufH3T_r4OcQv1MvRe6l2IEdYADu1QckSnBXfqDiEV3Z3-9yn0jiciUsOF7';
                //$window.localStorage.token=base64encode(token);
                setService=set;
                $controller('set.template',{'$scope':$scope,'$window':$window,'$state':$state});
            });
        });
        it("set.template",function(){
            expect($rootScope.titName).toBeDefined();
            expect($scope.template).toBeDefined();
        });
    });
});