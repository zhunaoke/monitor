/**
 * Created by Administrator on 2016/3/22.
 */
/**
 * 测试indexService;
 */
describe('indexServiceTest',function(){
    var $scope, $httpBackend,indexService={},token,loginOutUrl;


    /**
     * 正常情况
     */
    describe("indexController",function(){
        beforeEach(function(){
            module(function($httpProvider){
                token='MjAxNTgxMTE=:LnAD74lRI9b_YmGdpFI-I7zOmYuX8T11o7wXbuufH3T_r4OcQv1MvRe6l2IEdYADu1QckSnBXfqDiEV3Z3-9yn0jiciUsOF7';
                $httpProvider.defaults.headers.get= {'token':token};
                $httpProvider.defaults.headers.post= {'token':token};
                $httpProvider.defaults.headers.put= {'token':token};
                $httpProvider.defaults.headers.delete= {'token':token};
                $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
                $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
            })

        });
        beforeEach(function(){
            module('app.indexService')
            inject(function($rootScope,_$httpBackend_,$q,index){
                indexService=index;
                $httpBackend=_$httpBackend_;
                $scope=$rootScope.$new();
                loginOutUrl='http://kapi.changhong.io:88/v1/user/logout';
            });
        });


        //正常情况;
        it("测试正常是否能退出",function(){
            var result;
            var expected={
                "code": 200
            };
            $httpBackend.expectGET(loginOutUrl).respond(expected);
            var promise = indexService.loginOut();
            promise.then(function(data) {
                result = data;
                console.log("结果是："+result);
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });

    });

    /**
     * 异常
     */
    describe("indexController Exception",function(){
        beforeEach(function(){
            module(function($httpProvider){
                token='111111';
                $httpProvider.defaults.headers.get= {'token':token};
                $httpProvider.defaults.headers.post= {'token':token};
                $httpProvider.defaults.headers.put= {'token':token};
                $httpProvider.defaults.headers.delete= {'token':token};
                $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
                $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
            })

        });
        beforeEach(function(){
            module('app.indexService')
            inject(function($rootScope,_$httpBackend_,$q,index){
                indexService=index;
                $httpBackend=_$httpBackend_;
                $scope=$rootScope.$new();
                loginOutUrl='http://kapi.changhong.io:88/v1/user/logout';
            });
        });

        //异常处理-服务器500；
        it("测试异常处理500时",function(){
            var result,error;
            var expected={
                "code": 3005
            };
            $httpBackend.expectGET(loginOutUrl).respond(expected);
            var promise =indexService.loginOut();
            promise.then(function(data) {
                result = data;
            },function(err){
                error=err;
                console.log("error"+error);
            });
            $httpBackend.flush();
            expect(result).toBeUndefined();
            expect(error).toEqual(expected);
        });
        //异常处理-服务器令牌过期；
        it("令牌过期",function(){
            var result,error;
            var expected={
                "code": 3005,
                "info": "用户令牌为空!"
            };
            $httpBackend.expectGET(loginOutUrl).respond(expected);
            var promise =indexService.loginOut();
            promise.then(function(data) {
                result = data;
            },function(err){
                error=err;
                console.log("error"+error);
            });
            $httpBackend.flush();
            expect(result).toBeUndefined();
            expect(error).toEqual(expected);
        });
    });


});
/**
 * 测试指令
 */
describe("indexControllerTest",function(){
    beforeEach(function(){
        module('app.controllers') ;
        module('templates');
    });
    //测试app-header;
    describe("directive",function(){
            var $compile,$rootScope,$httpBackend;
            var excepted='<header></header>';
            beforeEach(function(){
                inject(function(_$compile_,_$rootScope_,$injector){
                    $compile=_$compile_;
                    $rootScope=_$rootScope_;
                    $httpBackend = $injector.get('$httpBackend');
                    $httpBackend.expectGET('views/base/header_new.html').respond(excepted);
                })
            });
            describe("app-header",function(){
                var element;
                beforeEach(function () {
                    element = $compile('<app-header></app-header>')($rootScope);
                    $rootScope.$digest();
                    angular.element(document.body).append(element);
                });

                afterEach(function () {
                    element.remove();
                });

                it('test', function () {
                    $httpBackend.flush();
                    expect(element.html()).toContain(excepted);
                });
            });

        });
    //测试app-footer;
    describe("directive",function(){
        var $compile,$rootScope,$httpBackend;
        var excepted='<footer></footer>';
        beforeEach(function(){
            inject(function(_$compile_,_$rootScope_,$injector){
                $compile=_$compile_;
                $rootScope=_$rootScope_;
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.expectGET('views/base/footer.html').respond(excepted);
            })
        });
        describe("app-footer",function(){
            var element;
            beforeEach(function () {
                element = $compile('<app-footer></app-footer>')($rootScope);
                $rootScope.$digest();
                angular.element(document.body).append(element);
            });

            afterEach(function () {
                element.remove();
            });

            it('test', function () {
                $httpBackend.flush();
                expect(element.html()).toContain(excepted);
            });
        });

    });
    //测试help-form;
    describe("directive",function(){
        var $compile,$rootScope,$httpBackend;
        var excepted='联系我们';
        beforeEach(function(){
            inject(function(_$compile_,_$rootScope_,$injector){
                $compile=_$compile_;
                $rootScope=_$rootScope_;
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.expectGET('views/base/help_form.html').respond(excepted);
            })
        });
        describe("app-header",function(){
            var element;
            beforeEach(function () {
                element = $compile('<app-help-form></app-help-form>')($rootScope);
                $rootScope.$digest();
                angular.element(document.body).append(element);
            });

            afterEach(function () {
                element.remove();
            });

            it('test', function () {
                $httpBackend.flush();
                expect(element.html()).toContain(excepted);
            });
        });
    });

    //测试modal;
    describe("directive",function(){
        var $compile,$rootScope,$httpBackend;
        var excepted='<div class="modal fade"></div>';
        beforeEach(function(){
            inject(function(_$compile_,_$rootScope_,$injector){
                $compile=_$compile_;
                $rootScope=_$rootScope_;
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.expectGET('views/base/modal.html').respond(excepted);
            })
        });
        describe("app-modal",function(){
            var element;
            beforeEach(function () {
                element = $compile('<app-modal></app-modal>')($rootScope);
                $rootScope.$digest();
                angular.element(document.body).append(element);
            });

            afterEach(function () {
                element.remove();
            });

            it('test', function () {
                $httpBackend.flush();
                expect(element.html()).toContain(excepted);
            });
        });
    });

    //测试mask;
    describe("directive",function(){
        var $compile,$rootScope,$httpBackend;
        var excepted='<div id="mask"></div>';
        beforeEach(function(){
            inject(function(_$compile_,_$rootScope_,$injector){
                $compile=_$compile_;
                $rootScope=_$rootScope_;
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.expectGET('views/base/mask.html').respond(excepted);
            })
        });
        describe("app-mask",function(){
            var element;
            beforeEach(function () {
                element = $compile('<app-mask></app-mask>')($rootScope);
                $rootScope.$digest();
                angular.element(document.body).append(element);
            });

            afterEach(function () {
                element.remove();
            });

            it('test', function () {
                $httpBackend.flush();
                expect(element.html()).toContain(excepted);
            });
        });
    });
    });

/**
 * indexController
 */
describe("indexController test",function(){
    beforeEach(module('app.controllers'));
    //historyCtrl;
    describe('indexCtrl',function(){
        var $scope,$rootScope;
        beforeEach(function(){
            inject(function(_$rootScope_,$controller){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $controller('indexCtrl',{'$scope':$scope});
            });
        });
        it("init function",function(){
            init();
            expect($scope.userInfo).toBeDefined();
        });
    });
});


