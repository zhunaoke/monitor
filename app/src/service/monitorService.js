/**
 * Created by zhaott on 2016/3/1.
 */
/**
 * Created by Administrator on 2015/11/2.
 */
var monitorApp=angular.module("app.monitorService",[
    "ngCookies"
]);

monitorApp.factory("monitor",["$http","$q","$cookies",function($http,$q,$cookies){
    // var baseurl = 'http://172.17.122.124:8081/krobelus/api/';
    var baseurl = 'http://kapi.changhong.io:88/';
    return {
        getMonitorList:function(curPager,pageSize,orderAttr,orderType,condition){
            var deferred=$q.defer();
            $http.get(baseurl+'v1/httpMorntor/list?curPager='+curPager+'&pageSize='+pageSize+'&orderAttr='+orderAttr+'&orderType='+orderType+'&condition='+condition).success(function(data){
                return deferred.resolve(data);
            }).error(function(err){
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        delMt:function(id){
            var deferred=$q.defer();
            $http.delete(baseurl+'v1/httpMorntor/delete/'+id).success(function(data){
                return deferred.resolve(data);
            }).error(function(err){
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        openMonitor:function(id){
            var deferred=$q.defer();
            $http.get(baseurl+'v1/httpMorntor/startHttpMorntor/'+id).success(function(data){
                return deferred.resolve(data);
            }).error(function(err){
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        stopMonitor:function(id){
            var deferred=$q.defer();
            $http.get(baseurl+'v1/httpMorntor/stopHttpMorntor/'+id).success(function(data){
                return deferred.resolve(data);
            }).error(function(err){
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        getDetailInfo:function(id){
            var deferred=$q.defer();
            $http.get(baseurl+'v1/httpMorntor/view/'+id).success(function(data){
                return deferred.resolve(data);
            }).error(function(err){
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //创建监控项
        addMonitor:function(monitorInfo){
            var deferred=$q.defer();
            $http.post(baseurl+'v1/httpMorntor/add',monitorInfo).success(function(data){
                //console.log(JSON.stringify(data));
                return deferred.resolve(data);
            }).error(function(err){
                //console.log(err);
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //编辑监控项——勿删！！！！！
        updateMonitor:function(monitorInfo){
            var deferred = $q.defer();
            $http.post(baseurl+'v1/httpMorntor/update',monitorInfo).success(function(data){
                console.log(JSON.stringify(data));
                return deferred.resolve(data);
            }).error(function(err){
                console.log(err);
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //获取监控项下监测点情况；
        getNodeInfoWithMonitor:function(monitorId){
            var deferred=$q.defer();
            $http.get(baseurl+'v1/httpMorntor/selectWithNode/'+monitorId).success(function(data){
                console.log(JSON.stringify(data));
                return deferred.resolve(data);
            }).error(function(err){
               return deferred.reject(err);
            });
            return deferred.promise;
        },
        //获取所有监控模板列表-不分页;
        getTemplateListAll:function(){
            var deferred=$q.defer();
            $http.get(baseurl+'v1/httpMonitorTemplate/selectAllByUser').success(function(data){
                // console.log("service-----------------------\n"+JSON.stringify(data));
                return deferred.resolve(data);
            }).error(function(err){
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //获取详情里饼图的数据;
        getPieData:function(monitorId){
            var deferred=$q.defer();
            $http.get(baseurl+'v1/httpResponse/selectStatisticsByMornitor/'+monitorId).success(function(data){
                return deferred.resolve(data);
            }).error(function(err){
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //获取折线图数据;
        getLineData:function(monitorId){
            var deferred=$q.defer();
            $http.get(baseurl+'v1/httpResponse/selectListStatisticsByMornitor/'+monitorId).success(function(data){
                return deferred.resolve(data);
            }).error(function(err){
                return deferred.reject(err);
            });
            return deferred.promise;
        },
        //获取单个监控项下不同节点的监控信息；
        getResponseOfMonitor:function(monitorId){
            var deferred=$q.defer();
            $http.get(baseurl+'v1/httpResponse/selectCountByMonitorAndNode/'+monitorId).success(function(data){
                return deferred.resolve(data);
            }).error(function(err){
                return deferred.reject(err);
            });
            return deferred.promise;
        }




    };

}]);

