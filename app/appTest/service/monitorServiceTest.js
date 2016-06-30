/**
 * Created by Administrator on 2016/3/24.
 */
describe("monitorService",function(){

    /**
     * 正常情况及普通异常捕捉
     */
    describe("monitorService",function(){
       var $scope,$rootScope,$q,$httpBackend,$window,monitorService,token,baseUrl;
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
            module('app.monitorService');
            inject(function(_$rootScope_,_$q_,_$window_,_$httpBackend_,monitor){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $q=_$q_;
                $window=_$window_;
                $httpBackend=_$httpBackend_;
                //baseUrl='http://172.17.122.124:8081/krobelus/';
                baseUrl = 'http://kapi.changhong.io:88/';
                monitorService=monitor;
            });
        });
        /**
         * 获取监控项列表
         */
        it("test monitor getList",function(){
            var result,page= 1,pageSize=10,orderAttr='create_time',orderType='DESC',condition='';
            var expected={
                "pageSize": 10,
                "content": []
            };
            var url=baseUrl+'v1/httpMorntor/list?curPager='+page+'&pageSize='+pageSize+'&orderAttr='+orderAttr+'&orderType='+orderType+'&condition='+condition;
            $httpBackend.expectGET(url).respond(expected);
            var promise=monitorService.getMonitorList(page,pageSize,orderAttr,orderType,condition);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        //page;
        it("test monitor getList exception page",function(){
            var result,page= -1,pageSize=10,orderAttr='create_time',orderType='DESC',condition='';
            var expected={
                "code": 100,
                "info": "操作失败！"
            };
            var url=baseUrl+'v1/httpMorntor/list?curPager='+page+'&pageSize='+pageSize+'&orderAttr='+orderAttr+'&orderType='+orderType+'&condition='+condition;
            $httpBackend.expectGET(url).respond(expected);
            var promise=monitorService.getMonitorList(page,pageSize,orderAttr,orderType,condition);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        //pageSize;
        it("test monitor getList exception page",function(){
            var result,page= 1,pageSize=-10,orderAttr='create_time',orderType='DESC',condition='';
            var expected={
                "code": 100,
                "info": "操作失败！"
            };
            var url=baseUrl+'v1/httpMorntor/list?curPager='+page+'&pageSize='+pageSize+'&orderAttr='+orderAttr+'&orderType='+orderType+'&condition='+condition;
            $httpBackend.expectGET(url).respond(expected);
            var promise=monitorService.getMonitorList(page,pageSize,orderAttr,orderType,condition);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });

        /**
         * 添加监控项
         */
        it("add monitor ",function(){
            var result;
            var expected={
                "data": null,
                "message": "保存成功",
                "statusCode": 0,
                "success": true
            }
            var monitorInfo={
                "authorization": "",
                "body": "",
                "cookie": "",
                "headers":"",
                "httpMorntorGroup":{"id":3},
                "name":"123",
                "url":"http://www.baidu.com",
                "pythonUrl":"",
                "nodes":[{"id":19,}, {"id":20}, {"id":21} ],
                "type":"POST",
                "httpMonitorTemplate":{"id":3 },
                "maxAlarmTime":"10000",
                "maxNodeAlarm": "2",
                "maxExcptionAlarm": 1,
                "alarmTimeMessage": 2,
                "cookie": ""
            };
            var url=baseUrl+'v1/httpMorntor/add';
            $httpBackend.expectPOST(url,monitorInfo).respond(expected);
            var promise=monitorService.addMonitor(monitorInfo);
            promise.then(function(data){
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        /**
         * 开启监控项
         */
        it("add monitor start",function(){
            var result,monitorId=89;
            var expected={"data":null,"message":"操作成功","statusCode":0,"success":true};
            var url=baseUrl+'v1/httpMorntor/startHttpMorntor/'+monitorId;
            $httpBackend.expectGET(url).respond(expected);
            var promise=monitorService.openMonitor(monitorId);
            promise.then(function(data){
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        it("add monitor start",function(){
            var result,monitorId=-89;
            var expected={
                "code": 3003,
                "des": "参数非法",
                "info": "参数非法!"
            };
            var url=baseUrl+'v1/httpMorntor/startHttpMorntor/'+monitorId;
            $httpBackend.expectGET(url).respond(expected);
            var promise=monitorService.openMonitor(monitorId);
            promise.then(function(data){
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        /**
         * 关闭监控项
         */
        it("add monitor stop",function(){
            var result,monitorId=89;
            var expected={"data":null,"message":"操作成功","statusCode":0,"success":true};
            var url=baseUrl+'v1/httpMorntor/stopHttpMorntor/'+monitorId;
            $httpBackend.expectGET(url).respond(expected);
            var promise=monitorService.stopMonitor(monitorId);
            promise.then(function(data){
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        it("add monitor stop",function(){
            var result,monitorId=-89;
            var expected={
                "code": 3003,
                "des": "参数非法",
                "info": "参数非法!"
            };
            var url=baseUrl+'v1/httpMorntor/stopHttpMorntor/'+monitorId;
            $httpBackend.expectGET(url).respond(expected);
            var promise=monitorService.stopMonitor(monitorId);
            promise.then(function(data){
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        /**
         * 获取监控项详情
         */
        it("add monitor detail",function(){
            var result,monitorId=89;
            var expected={"data":null,"message":"成功","statusCode":0,"success":true};
            var url=baseUrl+'v1/httpMorntor/view/'+monitorId;
            $httpBackend.expectGET(url).respond(expected);
            var promise=monitorService.getDetailInfo(monitorId);
            promise.then(function(data){
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        it("add monitor detail",function(){
            var result,monitorId=89;
            var expected={
                "code": 3003,
                "des": "参数非法",
                "info": "参数非法!"
            };
            var url=baseUrl+'v1/httpMorntor/view/'+monitorId;
            $httpBackend.expectGET(url).respond(expected);
            var promise=monitorService.getDetailInfo(monitorId);
            promise.then(function(data){
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        /**
         * 编辑监控项
         */
        it("add monitor edit",function(){
            var result;
            var monitorInfo={
                "id":143,
                "url":"http://www.baidu.com",
                "authorization":"",
                "body":"456",
                "cookie":"",
                "headers":"456",
                "httpMorntorGroup":null,
                "name":"监控项456456",
                "pythonUrl":"",
                "type":"HEAD",
                "maxAlarmTime":1000,
                "maxNodeAlarm":2,
                "maxExcptionAlarm":2,
                "alarmTimeMessage":"3",
                "httpMonitorTemplate":{"id":"22"},
                "nodes":[{"id":"19"},{"id":"20"},{"id":"21"}]
            };
            var expected={"data":null,"message":"操作成功","statusCode":0,"success":true};
            var url=baseUrl+'v1/httpMorntor/update';
            $httpBackend.expectPOST(url).respond(expected);
            var promise=monitorService.updateMonitor(monitorInfo);
            promise.then(function(data){
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });

        /**
         * 获取详情饼图数据
         */
        it("detail monitor data",function(){
            var result,monitorId=143;
            var expected={"message":"操作成功","statusCode":0,"success":true};
            var url=baseUrl+'v1/httpResponse/selectStatisticsByMornitor/'+monitorId;
            $httpBackend.expectGET(url).respond(expected);
            var promise=monitorService.getPieData(monitorId);
            promise.then(function(data){
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });

        /**
         * 获取折线图数据
         */
        it("detail monitor data",function(){
            var result,monitorId=143;
            var expected={"message":"操作成功","statusCode":0,"success":true};
            var url=baseUrl+'v1/httpResponse/selectListStatisticsByMornitor/'+monitorId;
            $httpBackend.expectGET(url).respond(expected);
            var promise=monitorService.getLineData(monitorId);
            promise.then(function(data){
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        /**
         * 表格数据
         */
        it("detail monitor data",function(){
            var result,monitorId=143;
            var expected={"message":"操作成功","statusCode":0,"success":true};
            var url=baseUrl+'v1/httpResponse/selectCountByMonitorAndNode/'+monitorId;
            $httpBackend.expectGET(url).respond(expected);
            var promise=monitorService.getResponseOfMonitor(monitorId);
            promise.then(function(data){
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });

    });

    /**
     * token捕捉异常
     */
    describe("monitorService exception",function(){
        var $scope,$rootScope,$q,$httpBackend,$window,monitorService,token,baseUrl;
        beforeEach(function(){
            module(function($httpProvider){
                token='1212'
                $httpProvider.defaults.headers.get= {'token':token};
                $httpProvider.defaults.headers.post= {'token':token};
                $httpProvider.defaults.headers.put= {'token':token};
                $httpProvider.defaults.headers.delete= {'token':token};
                $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
                $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
            })

        });
        beforeEach(function(){
            module('app.monitorService');
            inject(function(_$rootScope_,_$q_,_$window_,_$httpBackend_,monitor){
                $rootScope=_$rootScope_;
                $scope=_$rootScope_.$new();
                $q=_$q_;
                $window=_$window_;
                $httpBackend=_$httpBackend_;
                //baseUrl='http://172.17.122.124:8081/krobelus/';
                baseUrl = 'http://kapi.changhong.io:88/';
                monitorService=monitor;
            });
        });

        /**
         * 监控项列表
         */
        it("test monitor getList exception token",function(){
            var result,page= 1,pageSize=10,orderAttr='create_time',orderType='DESC',condition='';
            var expected={
                "code": 3003,
                "des": "用户token(令牌)非法",
                "info": "用户令牌不合法或已过期!"
            };
            var url=baseUrl+'v1/httpMorntor/list?curPager='+page+'&pageSize='+pageSize+'&orderAttr='+orderAttr+'&orderType='+orderType+'&condition='+condition;
            $httpBackend.expectGET(url).respond(expected);
            var promise=monitorService.getMonitorList(page,pageSize,orderAttr,orderType,condition);
            promise.then(function(data){
                console.log("set;;;;;"+JSON.stringify(data));
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        /**
         * 添加监控项
         */
        it("add monitor exception token",function(){
            var result;
            var expected={
                "code": 3003,
                "des": "用户token(令牌)非法",
                "info": "用户令牌不合法或已过期!"
            };
            var monitorInfo={
                "authorization": "",
                "body": "",
                "cookie": "",
                "headers":"",
                "httpMorntorGroup":{"id":3},
                "name":"123",
                "url":"http://www.baidu.com",
                "pythonUrl":"",
                "nodes":[{"id":19,}, {"id":20}, {"id":21} ],
                "type":"POST",
                "httpMonitorTemplate":{"id":3 },
                "maxAlarmTime":"10000",
                "maxNodeAlarm": "2",
                "maxExcptionAlarm": 1,
                "alarmTimeMessage": 2,
                "cookie": ""
            };
            var url=baseUrl+'v1/httpMorntor/add';
            $httpBackend.expectPOST(url,monitorInfo).respond(expected);
            var promise=monitorService.addMonitor(monitorInfo);
            promise.then(function(data){
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        /**
         * 开启监控项
         */
        it("add monitor start",function(){
            var result,monitorId=89;
            var expected={
                "code": 3003,
                "des": "用户token(令牌)非法",
                "info": "用户令牌不合法或已过期!"
            };
            var url=baseUrl+'v1/httpMorntor/startHttpMorntor/'+monitorId;
            $httpBackend.expectGET(url).respond(expected);
            var promise=monitorService.openMonitor(monitorId);
            promise.then(function(data){
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        /**
         * 关闭监控项
         */
        it("add monitor stop",function(){
            var result,monitorId=89;
            var expected={
                "code": 3003,
                "des": "用户token(令牌)非法",
                "info": "用户令牌不合法或已过期!"
            };
            var url=baseUrl+'v1/httpMorntor/stopHttpMorntor/'+monitorId;
            $httpBackend.expectGET(url).respond(expected);
            var promise=monitorService.stopMonitor(monitorId);
            promise.then(function(data){
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        /**
         * 获取监控项详情
         */
        it("add monitor detail",function(){
            var result,monitorId=89;
            var expected={
                "code": 3003,
                "des": "用户token(令牌)非法",
                "info": "用户令牌不合法或已过期!"
            };
            var url=baseUrl+'v1/httpMorntor/view/'+monitorId;
            $httpBackend.expectGET(url).respond(expected);
            var promise=monitorService.getDetailInfo(monitorId);
            promise.then(function(data){
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        /**
         *编辑监控项详情
         */
        it("add monitor edit",function(){
            var result;
            var monitorInfo={
                "id":143,
                "url":"http://www.baidu.com",
                "authorization":"",
                "body":"456",
                "cookie":"",
                "headers":"456",
                "httpMorntorGroup":null,
                "name":"监控项456456",
                "pythonUrl":"",
                "type":"HEAD",
                "maxAlarmTime":1000,
                "maxNodeAlarm":2,
                "maxExcptionAlarm":2,
                "alarmTimeMessage":"3",
                "httpMonitorTemplate":{"id":"22"},
                "nodes":[{"id":"19"},{"id":"20"},{"id":"21"}]
            };
            var expected={
                "code": 3003,
                "des": "用户token(令牌)非法",
                "info": "用户令牌不合法或已过期!"
            };
            var url=baseUrl+'v1/httpMorntor/update';
            $httpBackend.expectPOST(url).respond(expected);
            var promise=monitorService.updateMonitor(monitorInfo);
            promise.then(function(data){
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });

        /**
         * 饼图数据
         */
        it("detail monitor data",function(){
            var result,monitorId=143;
            var expected={
                "code": 3003,
                "des": "用户token(令牌)非法",
                "info": "用户令牌不合法或已过期!"
            };
            var url=baseUrl+'v1/httpResponse/selectStatisticsByMornitor/'+monitorId;
            $httpBackend.expectGET(url).respond(expected);
            var promise=monitorService.getPieData(monitorId);
            promise.then(function(data){
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        /**
         * 折线图数据
         */
        it("detail monitor data",function(){
            var result,monitorId=143;
            var expected={
                "code": 3003,
                "des": "用户token(令牌)非法",
                "info": "用户令牌不合法或已过期!"
            };
            var url=baseUrl+'v1/httpResponse/selectListStatisticsByMornitor/'+monitorId;
            $httpBackend.expectGET(url).respond(expected);
            var promise=monitorService.getLineData(monitorId);
            promise.then(function(data){
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
        /**
         * 表格数据
         */
        it("detail monitor data",function(){
            var result,monitorId=143;
            var expected={
                "code": 3003,
                "des": "用户token(令牌)非法",
                "info": "用户令牌不合法或已过期!"
            };
            var url=baseUrl+'v1/httpResponse/selectCountByMonitorAndNode/'+monitorId;
            $httpBackend.expectGET(url).respond(expected);
            var promise=monitorService.getResponseOfMonitor(monitorId);
            promise.then(function(data){
                result=data;
            });
            $httpBackend.flush();
            expect(result).toEqual(expected);
        });
    });
});