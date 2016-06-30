/**
 * Created by Administrator on 2016/3/9.
 */
var setApp=angular.module("app.setService",[
    "ngCookies"
]);

setApp.factory("set",["$http","$q","$cookies","$window",function($http,$q,$cookies,$window) {
    // var baseurl = 'http://172.17.122.124:8081/krobelus/api/';
    var baseurl = 'http://kapi.changhong.io:88/';
    return {
        /**
         * 联系人模块；
         */
        getPeopleList:function(page,pageSize){
            var deferred=$q.defer();
            $http.post(baseurl+'v1/linkman/findPage',{
                "curPage":page,//当前页号
                "pageSize":pageSize,//每页条数
                "orderAttr":"id",//排序的属性字段
                "orderType":"DESC"//排序类型，desc 或者 asc，大小写无关
            }).success(function(data){
                return deferred.resolve(data);
            }).error(function(err){
                console.log(err);
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //添加联系人；
        addPeople:function(people){
            var deferred=$q.defer();
            $http.post(baseurl + 'v1/linkman/create',people).success(function (data) {
                //var msg={"code":200,"info":"操作成功！","des":"操作成功"};
                return deferred.resolve(data);
            }).error(function (err) {
                console.log(err);
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //获取手机验证码；
        getTelCode:function(tel,access) {
            var deferred = $q.defer();
            var type = 'sms', value = tel, accessToken = access;
            console.log(value+"---"+accessToken);
            //$http.get('https://tuapi.chiq-cloud.com/v2/user/authCode?type=' + type + '&value=' + value + '&accessToken=' + accessToken).success(function (data) {
            //    return deferred.resolve(data);
            //}).error(function(err){
            //    return deferred.reject(err);
            //});
            $.ajax({
                method:'get',
                url:'https://tuapi.chiq-cloud.com/v2/user/authCode?type=' + type + '&value=' + value + '&accessToken=' + accessToken,
                success:function(data){
                    return deferred.resolve(data);
                },
                error:function(err){
                    return deferred.reject(err);
                }
            });
            return deferred.promise;
        },
        //获取acessToken;
        getAccessToken:function(){
            var deferred = $q.defer();
            $http.get(baseurl+'v1/token/accessToken').success(function (data) {
                console.log("service"+data);
                return deferred.resolve(data);
            }).error(function(err){
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //删除联系人；
        delPerson:function(id){
            var deferred=$q.defer();
            $http.delete(baseurl+'v1/linkman/delete/'+id).success(function(data){
                return deferred.resolve(data);
            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //编辑联系人
        editPerson:function(people) {
                console.log(people);
                var deferred = $q.defer();
                $http.post(baseurl + 'v1/linkman/update',people).success(function (data) {
                    //var msg={"code":200,"info":"操作成功！","des":"操作成功"};
                    return deferred.resolve(data);
                }).error(function (err) {
                    console.log(err);
                    return deferred.reject(err);
                });
                return deferred.promise;
            },
        //监控模板管理
        getTemplateList: function(curPager, pageSize,orderAttr,orderType) {
            var deferred = $q.defer();
            $http.get(baseurl + 'v1/httpMonitorTemplate/list?curPager=' + curPager + '&pageSize=' + pageSize + '&orderAttr='+orderAttr + '&orderType='+orderType).success(function (data){
               console.log(data);
                return deferred.resolve(data);
            }).error(function (err) {
                console.log(err);
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //编辑监控模板
        updateTemplate:function(template){
            var deferred = $q.defer();
            $http.post(baseurl+'v1/httpMonitorTemplate/update',template).success(function(data){
                console.log(JSON.stringify(data));
                return deferred.resolve(data);
            }).error(function(err){
                console.log(err);
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //创建监控模板；
        addTemplate:function(template){
            var deferred=$q.defer();
            $http.post(baseurl + 'v1/httpMonitorTemplate/add',template).success(function (data) {
                //var msg={"code":200,"info":"操作成功！","des":"操作成功"};
                return deferred.resolve(data);
            }).error(function (err) {
                console.log(err);
                return deferred.reject(err);
            });
            return deferred.promise;
        },

        //删除监控模板
        delTemplate:function(id){
            var deferred=$q.defer();
            $http.delete(baseurl+'v1/httpMonitorTemplate/delete/'+id).success(function(data){
                return deferred.resolve(data);
            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;
        }
    };
}]);

