angular.module("loginApp.service",[
    "ngCookies"
]).factory("user",["$http","$q","$cookies","$cookieStore",function($http,$q,$cookies,$cookieStore){
    return {
        login:function(user){
            var deferred=$q.defer();
            var loginUrl='http://kapi.changhong.io:88/v1/user/login';
            // var loginUrl='http://172.17.122.124:8081/krobelus/api/v1/user/login';
            //console.log(JSON.stringify(user));
            $http.post(loginUrl,{
                "username":user.loginName,
                "password":user.passWord
            }).success(function(data){
                //console.log(data);
                if(data.code=="200"){
                    var developer=base64encode(JSON.stringify(user));
                    var expireDate = new Date();
                    expireDate.setHours(expireDate.getHours() +2);
                    $cookieStore.put('userCookie', developer, {
                        'expires': expireDate
                    });
                    setCookie('chjk',base64encode(user.loginName),2);//设置2小时过期；
                    //setCookie('chjk',base64encode(JSON.stringify(user)),360);
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

