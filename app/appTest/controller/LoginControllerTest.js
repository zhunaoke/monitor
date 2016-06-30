/**
 * Created by Administrator on 2016/3/13.
 */
/**
 * 测试登陆模块
 */
describe('登陆模块',function(){
    //service;
    describe('LoginService',function(){
        var $scope,$q, $httpBackend,loginService={},$window;
        //var loginUrl='http://172.17.122.124:8081/krobelus/api/v1/user/login';
        var loginUrl='http://kapi.changhong.io:88/v1/user/login';
        beforeEach(module('loginApp'));
        beforeEach(function(){
            inject(function($rootScope,_$httpBackend_,$q,user,_$window_){
                loginService=user;
                $httpBackend=_$httpBackend_;
                $scope=$rootScope.$new();
                $window=_$window_;
            });
        });
        //正常情况;
        it("测试正常是否能够登陆",function(){
            var result;
            var expected={
                "code": 200,
                "des": "登录成功",
                "info": "登录成功！"
            };
            $httpBackend.expectPOST(loginUrl,{
                "username":"20158087",
                "password":"yuan8087"
            }).respond(expected);

            var promise = loginService.login({
                "loginName":"20158087",
                "passWord":"yuan8087"
            });
            promise.then(function(data) {
                result = data;
                console.log("结果是："+result);
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
            expect($window.localStorage.token).not.toBeNull();
        });
        //异常处理-服务器500；
        it("测试异常处理500时",function(){
            var result,error;
            var expected={
                "code": 500,
                "info": "服务异常",
                "des": "服务异常"
            }
            $httpBackend.expectPOST(loginUrl,{
                "username":"20158111",
                "password":"laogai82"
            }).respond(expected);
            var promise = loginService.login({
                "loginName":"20158111",
                "passWord":"laogai82"
            });
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
        //异常处理-用户名或密码错；
        it("测试用户名或密码错误",function(){
            var result,error;
            var expected={
                //"code": 3001,
                "info": "用户名或密码有误"
                //"des": "用户或密码错误，请检查！"
            };
            $httpBackend.expectPOST(loginUrl,{
                "username":"20158112",
                "password":"11111111"
            }).respond(expected);
            var promise = loginService.login({
                "loginName":"20158112",
                "passWord":"11111111"
            });
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
        //异常处理-用户不存在；
        it("测试用户不存在或格式错误",function(){
            var result,error;
            var expected={
                "info": "user is not existed"
            };

            $httpBackend.expectPOST(loginUrl,{
                "username":"20158@87",//换成20158@87 ---201580 87；
                "password":"yuan8087"
            }).respond(expected);
            var promise = loginService.login({
                "loginName":"20158@87",
                "passWord":"yuan8087"
            });
            promise.then(function(data) {
                result = data;
            },function(err){
                error=err;
                console.log("error"+JSON.stringify(error));
            });
            $httpBackend.flush();
            expect(result).toBeUndefined();
            expect(error).toEqual(expected);
        });
    });
});


