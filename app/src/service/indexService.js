/**
 * Created by Administrator on 2016/3/21.
 */
angular.module("app.indexService",[
    "ngCookies"
]).factory("index",["$http","$q","$cookies","$cookieStore",function($http,$q,$cookies,$cookieStore){
    return {
        loginOut:function(){
            var deferred=$q.defer();
            // var loginOutUrl='http://172.17.122.124:8081/krobelus/api/v1/user/logout';
            var loginOutUrl='http://kapi.changhong.io:88/v1/user/logout';
            console.log(JSON.stringify(loginOutUrl));
            $http.get(loginOutUrl).success(function(data){
                //console.log(data);
                if(data.code=="200"){
                    return deferred.resolve(data);
                }else{
                    return deferred.reject(data);
                }
            }).error(function(err){
                console.log(err);
                return deferred.reject(err);
            });

            return deferred.promise;
        }
    };
}]);

