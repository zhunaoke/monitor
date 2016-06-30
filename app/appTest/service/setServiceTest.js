/**
 * Created by Administrator on 2016/3/24.
 */
describe("setService",function(){

    /**
     * 正常情况及普通异常捕捉
     */
    describe("setService",function(){
       var $scope,$rootScope,$q,$httpBackend,$window,setService,token,baseUrl;
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
            module('app.setService');
            inject(function(_$rootScope_,_$q_,_$window_,_$httpBackend_,set){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $q=_$q_;
                $window=_$window_;
                $httpBackend=_$httpBackend_;
                //baseUrl='http://172.17.122.124:8081/krobelus/';
                baseUrl = 'http://kapi.changhong.io:88/';
                setService=set;
            });
        });
        /*********************************************************************************************************/
        /*****************************************联系人********************************************************/
        /********************************************************************************************************/
        /**
         * 测试获取联系人列表接口
         */
        it("test getPeopleList",function(){
            var result,page= 1,pageSize=10;
            var expected={
                "pageSize": 10,
                "content": []
            };
            var addPersonUrl=baseUrl+'v1/linkman/findPage';
            $httpBackend.expectPOST(addPersonUrl,{
                "curPage":1,//当前页号
                "pageSize":10,//每页条数
                "orderAttr":"id",//排序的属性字段
                "orderType":"DESC"//排序类型，desc 或者 asc，大小写无关
            }).respond(expected);
            var promise=setService.getPeopleList(page,pageSize);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        /**
         * 异常捕捉
         */
        //参数非法-page=0
        it("test getPeopleList exception1",function(){
            var result,error,page=0,pageSize=10;
            var expected={
                "code": 100,
                "info": "操作失败！"
            };
            var addPersonUrl=baseUrl+'v1/linkman/findPage';
            $httpBackend.expectPOST(addPersonUrl,{
                "curPage":0,//当前页号
                "pageSize":10,//每页条数
                "orderAttr":"id",//排序的属性字段
                "orderType":"DESC"//排序类型，desc 或者 asc，大小写无关
            }).respond(expected);
            var promise=setService.getPeopleList(page,pageSize);
            promise.then(function(data){
                result=data;
                console.log("set;;;;;"+JSON.stringify(data));
            },function(err){
                error=err;
                console.log("error"+err);
            });
            $httpBackend.flush();
            //expect(error).toBeUndefined();
            expect(result).toEqual(expected);
        });
        //参数非法-page,pageSize <0
        it("test getPeopleList exception2",function(){
            var result,error,page=-1,pageSize=-10;
            var expected={
                "code": 100,
                "info": "操作失败！"
            };
            var addPersonUrl=baseUrl+'v1/linkman/findPage';
            $httpBackend.expectPOST(addPersonUrl,{
                "curPage":-1,//当前页号
                "pageSize":-10,//每页条数
                "orderAttr":"id",//排序的属性字段
                "orderType":"DESC"//排序类型，desc 或者 asc，大小写无关
            }).respond(expected);
            var promise=setService.getPeopleList(page,pageSize);
            promise.then(function(data){
                result=data;
                console.log("set;;;;;"+JSON.stringify(data));
            },function(err){
                error=err;
                console.log("error"+err);
            });
            $httpBackend.flush();
            //expect(error).toBeUndefined();
            expect(result).toEqual(expected);
        });

        /**
         * 测试添加联系人列表接口
         */
        it('test addPeople',function(){
            var result;
            var people={"name":"yyyyyy","mesStartTime":"8:00","mesEndTime":"23:00","mesFrequency":"00:30","email":"yyyyy@qq.com","phone":"","authCode":""};
            var expected={"code":200};
            var addPersonUrl=baseUrl+'v1/linkman/create';
            $httpBackend.expectPOST(addPersonUrl,people).respond(expected);
            var promise=setService.addPeople(people);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        /**
         * 异常捕捉
         */
        //参数异常-email格式不正确
        it('test addPeople exception email',function(){
            var result,error,url=baseUrl+'v1/linkman/create';
            var expected={
                "code": "3003"
            };
            var people={
                "name":"yyyyyy",
                "mesStartTime":"8:00",
                "mesEndTime":"23:00",
                "mesFrequency":"00:30",
                "email":"11qq.com",
                "phone":"",
                "authCode":""
            };

            $httpBackend.expectPOST(url,people).respond(expected);
            var promise = setService.addPeople(people);
            promise.then(function(data) {
                result = data;
            },function(err){
                error=err;
                console.log("error"+JSON.stringify(error));
            });
            $httpBackend.flush();
            //expect(result).toBeUndefined();
            expect(result).toEqual(expected);
        });
        //参数异常-phone格式不正确
        it('test addPeople exception phone',function(){
            var result,error,url=baseUrl+'v1/linkman/create';
            var expected={
                "code": "3003"
            };
            var people={
                "name":"yyyyyy",
                "mesStartTime":"8:00",
                "mesEndTime":"23:00",
                "mesFrequency":"00:30",
                "phone":"1212",
                "email":"11@qq.com",
                "authCode":""
            };
            $httpBackend.expectPOST(url,people).respond(expected);
            var promise = setService.addPeople(people);
            promise.then(function(data) {
                result = data;
            },function(err){
                error=err;
                console.log("error"+JSON.stringify(error));
            });
            $httpBackend.flush();
            //expect(result).toBeUndefined();
            expect(result).toEqual(expected);
        });

        /**
         * 测试删除联系人接口
         */
        it('test delPerson',function(){
            var result,id=121;
            var expected={"code":200};
            var Url=baseUrl+'v1/linkman/delete/'+id;
            $httpBackend.expectDELETE(Url).respond(expected);
            var promise=setService.delPerson(id);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        /**
         * 异常捕捉
         */
        //参数非法-id不存在
        it('test delPerson exception id',function(){
            var result,id=009;
            var expected={"code":3003};
            var Url=baseUrl+'v1/linkman/delete/'+id;
            $httpBackend.expectDELETE(Url).respond(expected);
            var promise=setService.delPerson(id);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });

        /**
         * 测试编辑联系人接口
         */
        it('test editPerson',function(){
            var result;
            var people={
                "id":121,
                "name":"1111",
                "phone":"13567876565",
                "email":"11@qq.com",
                "mesStartTime":"8:00",
                "mesEndTime":"23:00",
                "mesFrequency":"00:30",
                "authCode":""
            };
            var expected={"code":200};
            var url=baseUrl+'v1/linkman/update';
            $httpBackend.expectPOST(url,people).respond(expected);
            var promise=setService.editPerson(people);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        /**
         * 异常捕捉
         */
        //参数异常-id
        it('test editPerson exception id',function(){
            var result;
            var people={
                "id":-1,
                "name":"1111",
                "phone":"13567876565",
                "email":"11@qq.com",
                "mesStartTime":"8:00",
                "mesEndTime":"23:00",
                "mesFrequency":"00:30",
                "authCode":""
            };
            var expected={"code":100};
            var url=baseUrl+'v1/linkman/update';
            $httpBackend.expectPOST(url,people).respond(expected);
            var promise=setService.editPerson(people);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        //参数异常-手机号异常
        it('test editPerson exception phone',function(){
            var result;
            var people={
                "id":121,
                "name":"1111",
                "phone":"135678",
                "email":"11@qq.com",
                "mesStartTime":"8:00",
                "mesEndTime":"23:00",
                "mesFrequency":"00:30",
                "authCode":""
            };
            var expected={"code":3005};
            var url=baseUrl+'v1/linkman/update';
            $httpBackend.expectPOST(url,people).respond(expected);
            var promise=setService.editPerson(people);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        //参数异常-email
        it('test editPerson exception email',function(){
            var result;
            var people={
                "id":121,
                "name":"1111",
                "phone":"13567876565",
                "email":"1www",
                "mesStartTime":"8:00",
                "mesEndTime":"23:00",
                "mesFrequency":"00:30",
                "authCode":""
            };
            var expected={"code":3005};
            var url=baseUrl+'v1/linkman/update';
            $httpBackend.expectPOST(url,people).respond(expected);
            var promise=setService.editPerson(people);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });

/*********************************************************************************************************/
/*****************************************监控模板********************************************************/
/********************************************************************************************************/
        /**
         * 监控模板-获取列表
         */
        it('test templat list',function(){
            var result,curPager= 1,pageSize=10,orderAttr='id',orderType='DESC';
            var expected={
                "pageSize": 10,
                "content": []
            };
            var addPersonUrl=baseUrl+'v1/httpMonitorTemplate/list?curPager=' + curPager + '&pageSize=' + pageSize + '&orderAttr='+orderAttr + '&orderType='+orderType;
            $httpBackend.expectGET(addPersonUrl).respond(expected);
            var promise=setService.getTemplateList(curPager,pageSize,orderAttr,orderType);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        /**
         * 异常捕捉
         */
        //page格式不对;
        it('test templat exception page',function(){
            var result,curPager= -1,pageSize=10,orderAttr='id',orderType='DESC';
            var expected={
                "code": 100,
                "info": "操作失败！"
            };
            var addPersonUrl=baseUrl+'v1/httpMonitorTemplate/list?curPager=' + curPager + '&pageSize=' + pageSize + '&orderAttr='+orderAttr + '&orderType='+orderType;
            $httpBackend.expectGET(addPersonUrl).respond(expected);
            var promise=setService.getTemplateList(curPager,pageSize,orderAttr,orderType);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        //pageSize格式不对;
        it('test templat exception pageSize',function(){
            var result,curPager= 1,pageSize=-10,orderAttr='id',orderType='DESC';
            var expected={
                "code": 100,
                "info": "操作失败！"
            };
            var addPersonUrl=baseUrl+'v1/httpMonitorTemplate/list?curPager=' + curPager + '&pageSize=' + pageSize + '&orderAttr='+orderAttr + '&orderType='+orderType;
            $httpBackend.expectGET(addPersonUrl).respond(expected);
            var promise=setService.getTemplateList(curPager,pageSize,orderAttr,orderType);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        //page,pageSize对应不对;
        it('test templat exception page pageSize',function(){
            var result,error,curPager= 1000000,pageSize=5,orderAttr='id',orderType='DESC';
            var expected={
                "content": []
            };
            var url=baseUrl+'v1/httpMonitorTemplate/list?curPager=' + curPager + '&pageSize=' + pageSize + '&orderAttr='+orderAttr + '&orderType='+orderType;
            $httpBackend.expectGET(url).respond(expected);
            var promise=setService.getTemplateList(curPager,pageSize,orderAttr,orderType);
            promise.then(function(data){
                console.log(JSON.stringify(data));
                result=data;
            },function(data){
                console.log(data);
                error=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        //orderAttr不正确;
        it('test templat exception orderAttr',function(){
            var result,error,curPager= 1,pageSize=10,orderAttr='ddd',orderType='DESC';
            var expected={
                "code": 500
            };
            var url=baseUrl+'v1/httpMonitorTemplate/list?curPager=' + curPager + '&pageSize=' + pageSize + '&orderAttr='+orderAttr + '&orderType='+orderType;
            $httpBackend.expectGET(url).respond(expected);
            var promise=setService.getTemplateList(curPager,pageSize,orderAttr,orderType);
            promise.then(function(data){
                console.log(JSON.stringify(data));
                result=data;
            },function(data){
                console.log(data);
                error=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        //orderType不正确;
        it('test templat exception orderType',function(){
            var result,error,curPager= 1,pageSize=10,orderAttr='id',orderType='sss';
            var expected={
                "code": 500
            };
            var url=baseUrl+'v1/httpMonitorTemplate/list?curPager=' + curPager + '&pageSize=' + pageSize + '&orderAttr='+orderAttr + '&orderType='+orderType;
            $httpBackend.expectGET(url).respond(expected);
            var promise=setService.getTemplateList(curPager,pageSize,orderAttr,orderType);
            promise.then(function(data){
                console.log(JSON.stringify(data));
                result=data;
            },function(data){
                console.log(data);
                error=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });

        /**
         * 监控模板-编辑模板
         */
        it('test template update',function(){
            var result;
            var expected={"data":"0","message":"修改成功","statusCode":0,"success":true};
            var templateInfo={
                "id":2,
                "templateType":"HTTP",
                "name":"按时到空间按",
                "monitorFrequency":"5",
                "httpMethod":"HEAD",
                "requestHeader":"fdsff",
                "responseHeader":"fdshs",
                "responseContent":"gdfgsdf",
                "matchRule":"1",
                "cookie":"ADFGHJKXCVBNM<126GYHHUYTU"
            };
            var url=baseUrl+'v1/httpMonitorTemplate/update' ;
            $httpBackend.expectPOST(url,templateInfo).respond(expected);
            var promise=setService.updateTemplate(templateInfo);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        /**
         * 异常
         */

        //参数非法
        it('test template update exception parameter',function(){
            var result;
            var expected={
                "code":3003,
                "des": "参数非法"
            };
            var templateInfo={
                "id":'ss',
                "templateType":"HTTP",
                "name":"按时到空间按",
                "monitorFrequency":"5",
                "httpMethod":"HEAD",
                "requestHeader":"fdsff",
                "responseHeader":"fdshs",
                "responseContent":"gdfgsdf",
                "matchRule":"1",
                "cookie":"ADFGHJKXCVBNM<126GYHHUYTU"
            };
            var url=baseUrl+'v1/httpMonitorTemplate/update';
            $httpBackend.expectPOST(url,templateInfo).respond(expected);
            var promise=setService.updateTemplate(templateInfo);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });

        /**
         * 监控模板-创建模板
         */
        it('test template add',function(){
            var result;
            var expected={"data":"0","message":"保存成功","statusCode":0,"success":true};
            var templateInfo={
                    "name":"111",
                    "monitorFrequency":"5",
                    "httpMethod":"POST",
                    "requestHeader":"headers",
                    "responseHeader":"headersr",
                    "responseContent":"responseCon",
                    "matchRule":"2",
                    "cookie":"awadsasd",
                    "templateType":"HTTP",
                    "user":null
            };
            var url=baseUrl+'v1/httpMonitorTemplate/add';
            $httpBackend.expectPOST(url,templateInfo).respond(expected);
            var promise=setService.addTemplate(templateInfo);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        /**
         * 异常捕捉
         */

        //参数非法
        it('test template add exception parameter',function(){
            var result;
            var expected={
                "code":3003,
                "des": "参数非法"
            };
            var templateInfo={
                "name":"111",
                "monitorFrequency":"5",
                "httpMethod":"POST",
                "requestHeader":"headers",
                "responseHeader":"headersr",
                "responseContent":"responseCon",
                "matchRule":"-2",
                "cookie":"awadsasd",
                "templateType":"HTTP",
                "user":null
            };
            var url=baseUrl+'v1/httpMonitorTemplate/add';
            $httpBackend.expectPOST(url,templateInfo).respond(expected);
            var promise=setService.addTemplate(templateInfo);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });

        /**
         * 监控模板-删除监控
         */
        it('test template delete',function(){
            var result,id=121;
            var expected={"data":"0","message":"删除成功","statusCode":0,"success":true};
            var url=baseUrl+'v1/httpMonitorTemplate/delete/'+id;
            $httpBackend.expectDELETE(url).respond(expected);
            var promise=setService.delTemplate(id);
            promise.then(function(data){
                console.log(JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        /**
         * 异常捕捉
         */

        //参数非法
        it('test template delete exception id',function(){
            var result,id='sdadasd';
            var expected={
                "code": 3003,
                "des": "参数非法",
                "info": "参数非法!"
            };
            var url=baseUrl+'v1/httpMonitorTemplate/delete/'+id;
            $httpBackend.expectDELETE(url).respond(expected);
            var promise=setService.delTemplate(id);
            promise.then(function(data){
                console.log(JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
    });
    /**
     * token异常捕捉
     */
    describe('setService exception',function(){
        var $scope,$rootScope,$q,$httpBackend,$window,setService,token,baseUrl;
        beforeEach(function(){
            module(function($httpProvider){
                token='23213123';
                $httpProvider.defaults.headers.get= {'token':token};
                $httpProvider.defaults.headers.post= {'token':token};
                $httpProvider.defaults.headers.put= {'token':token};
                $httpProvider.defaults.headers.delete= {'token':token};
                $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
                $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
            })

        });
        beforeEach(function(){
            module('app.setService');
            inject(function(_$rootScope_,_$q_,_$window_,_$httpBackend_,set){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $q=_$q_;
                $window=_$window_;
                $httpBackend=_$httpBackend_;
                //baseUrl='http://172.17.122.124:8081/krobelus/';
                baseUrl = 'http://kapi.changhong.io:88/';
                setService=set;
            });
        });

        /***************************联系人token异常***************************************************/
        //联系人列表
        it("test getPeopleList exception3",function(){
            var result,error,page=1,pageSize=10;
            var expected={
                "code": 3003,
                "des": "用户token(令牌)非法",
                "info": "用户令牌不合法或已过期!"
            };
            var addPersonUrl=baseUrl+'v1/linkman/findPage';
            $httpBackend.expectPOST(addPersonUrl,{
                "curPage":page,//当前页号
                "pageSize":pageSize,//每页条数
                "orderAttr":"id",//排序的属性字段
                "orderType":"DESC"//排序类型，desc 或者 asc，大小写无关
            }).respond(expected);
            var promise=setService.getPeopleList(page,pageSize);
            promise.then(function(data){
                result=data;
                console.log("set;;;;;"+JSON.stringify(data));
            },function(err){
                error=err;
                console.log("error"+err);
            });
            $httpBackend.flush();
            //expect(error).toBeUndefined();
            expect(result).toEqual(expected);
        });
        //添加联系人
        it('test addPeople exception token',function(){

            var result,error;
            var url=baseUrl+'v1/linkman/create';
            var expected={
                "code": "3003"
            };
            var people={
                "name":"1111",
                "phone":"13568272222",
                "email":"11@qq.com",
                "mesStartTime":"8:00",//接收消息在24时计时法中的起始时刻
                "mesEndTime":"23:00",//接收消息在24时计时法中的终止时刻
                "mesFrequency":"00:30"//消息提示的最小频率
            };
            $httpBackend.expectPOST(url,people).respond(expected);
            var promise = setService.addPeople(people);
            promise.then(function(data) {
                result = data;
            },function(err){
                error=err;
                console.log("error"+JSON.stringify(error));
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        //删除联系人-token
        it('test delPerson exception token',function(){
            var result,id=121;
            var expected={
                "code": 3003,
                "des": "用户token(令牌)非法",
                "info": "用户令牌不合法或已过期!"
            };
            //$httpProvider.defaults.headers.delete['Content-Type'] = 'application/json';
            var Url=baseUrl+'v1/linkman/delete/'+id;
            $httpBackend.expectDELETE(Url).respond(expected);
            var promise=setService.delPerson(id);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        //编辑联系人-token
        it('test editPerson exception token',function(){
            var result;
            var people={
                "id":121,
                "name":"1111",
                "phone":"13567876565",
                "email":"123@qq.com",
                "mesStartTime":"8:00",
                "mesEndTime":"23:00",
                "mesFrequency":"00:30"
            };
            var expected={
                "code": 3003,
                "des": "用户token(令牌)非法",
                "info": "用户令牌不合法或已过期!"
            };
            var url=baseUrl+'v1/linkman/update';
            $httpBackend.expectPOST(url,people).respond(expected);
            var promise=setService.editPerson(people);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });

        /***************************监控模板token异常***************************************************/

        //监控模板列表;
        it('test templat exception orderType',function(){
            var result,error,curPager= 1,pageSize=10,orderAttr='id',orderType='DESC';
            var expected={
                "code": 3003,
                "des":"token失效"
            };
            var url=baseUrl+'v1/httpMonitorTemplate/list?curPager=' + curPager + '&pageSize=' + pageSize + '&orderAttr='+orderAttr + '&orderType='+orderType;
            $httpBackend.expectGET(url).respond(expected);
            var promise=setService.getTemplateList(curPager,pageSize,orderAttr,orderType);
            promise.then(function(data){
                console.log(JSON.stringify(data));
                result=data;
            },function(data){
                console.log(data);
                error=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        //编辑监控模板
        it('test template update exception token',function(){
            var result;
            var expected={
                "code":3003,
                "des": "用户token(令牌)非法"
            };
            var templateInfo={
                "id":2,
                "templateType":"HTTP",
                "name":"按时到空间按",
                "monitorFrequency":"5",
                "httpMethod":"HEAD",
                "requestHeader":"fdsff",
                "responseHeader":"fdshs",
                "responseContent":"gdfgsdf",
                "matchRule":"1",
                "cookie":"ADFGHJKXCVBNM<126GYHHUYTU"
            };
            var url=baseUrl+'v1/httpMonitorTemplate/update';
            $httpBackend.expectPOST(url,templateInfo).respond(expected);
            var promise=setService.updateTemplate(templateInfo);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        //创建监控模板
        it('test template add exception token',function(){
            var result;
            var expected={
                "code": 3003,
                "des": "用户token(令牌)非法",
                "info": "用户令牌不合法或已过期!"
            };
            var templateInfo={
                "name":"111",
                "monitorFrequency":"5",
                "httpMethod":"POST",
                "requestHeader":"headers",
                "responseHeader":"headersr",
                "responseContent":"responseCon",
                "matchRule":"2",
                "cookie":"awadsasd",
                "templateType":"HTTP",
                "user":null
            };
            var url=baseUrl+'v1/httpMonitorTemplate/add';
            $httpBackend.expectPOST(url,templateInfo).respond(expected);
            var promise=setService.addTemplate(templateInfo);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        //删除监控模板
        it('test template delete exception token',function(){
            var result,id=121;
            var expected={
                "code": 3003,
                "des": "用户token(令牌)非法",
                "info": "用户令牌不合法或已过期!"
            };
            var url=baseUrl+'v1/httpMonitorTemplate/delete/'+id;
            $httpBackend.expectDELETE(url).respond(expected);
            var promise=setService.delTemplate(id);
            promise.then(function(data){
                console.log(JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
    })
});