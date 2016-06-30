angular.module("app.controllers",[
    'ui.router',
    "ngCookies",
    "ui.bootstrap",
    "app.indexService"
])
.controller("indexCtrl",["$cookies","$scope","$rootScope","$cookieStore","$window",function($cookies,$scope,$rootScope,$cookieStore,$window){
    //$("header .navbar-menu li").eq(0).addClass("active").siblings("li").removeClass("active");
    changeHeader(0);
    $scope.userInfo={
        "loginName":""
    };

    cunzai=function(){
        var userCookies=getCookie("chjk");
        //console.log("cookie是否消失"+userCookies+"----"+(userCookies==null));
        if(userCookies===null){
            $scope.userInfo.loginName=null;
            $cookieStore.remove('userCookie');
            clearCookie("chjk");
            $window.localStorage.removeItem('token');
            swal({
                title: "",
                text: " 对不起，登录超时，请重新登录 !",
                type: "warning",
                showCancelButton: false,
                cancelButtonText:"取消",
                cancelButtonColor:"#c5c5c5",
                confirmButtonColor: "#00CCCC",
                confirmButtonText: "确认",
                closeOnConfirm: true
            }, function(){
                window.location.href="/app/login";
            });
        }else{
            setTimeout('cunzai()',2*60*60*1000); //设置过期时间为2小时；
            //setTimeout("cunzai()",20*1000);
        }
    };
    init=function(){
        var userCookie=$cookieStore.get('userCookie');
        var chjk=getCookie("chjk");
        console.log(userCookie);
        if(chjk){
            $cookies.userInfo=JSON.parse(base64decode(chjk));
            $scope.userInfo.loginName=JSON.parse(base64decode(chjk));
            //console.log("user-info:"+JSON.stringify($scope.userInfo));
            cunzai();
        }else{
            $scope.userInfo={};
            window.location.href="/app/login";
        }
    };
    init();
    destroyUser=function(){
        $scope.userInfo={};
        $cookieStore.remove('userCookie');
        clearCookie("chjk");
        $window.localStorage.removeItem('token');
        $window.location="/app/login";
    };
    destroyMsg=function(err){
        if(err===null||err.des=='用户token(令牌)非法'){
            swal({
                title: "",
                text: " 对不起，token过期，请重新登录 !",
                type: "warning",
                showCancelButton: false,
                cancelButtonText:"取消",
                cancelButtonColor:"#c5c5c5",
                confirmButtonColor: "#00CCCC",
                confirmButtonText: "确认",
                closeOnConfirm: true
            }, function(){
                destroyUser();
            });

        }
    };


}])
.controller("logoutCtrl",["$scope","$cookies","$window","$cookieStore","index",function($scope,$cookies,$window,$cookieStore,index){
    index.loginOut().then(function(data){
        //console.log(data);
        $scope.userInfo={};
        $cookieStore.remove('userCookie');
        clearCookie("chjk");
        $window.localStorage.removeItem('token');
        $window.location="/app/login";
    },function(err){
        destroyMsg(err);
       console.log(err);
    });



}])

/**
 * directives
 */
    .directive('appHeader', [function () {
        return {
            restrict: 'ECMA',
            templateUrl: 'views/base/header_new.html',
            link: function (scope, iElement, iAttrs) {

            }
        };
    }])
    .directive('appFooter', [function () {
        return {
            restrict: 'ECMA',
            templateUrl: 'views/base/footer.html',
            link: function (scope, iElement, iAttrs) {

            }
        };
    }])
    .directive('appModal',[function(){
        return{
            restrict:'ECMA',
            templateUrl:'views/base/modal.html',
            link:function(scope,iElement,iAttrs){
                //console.log("=========="+iElement)
            }
        };
    }])
    .directive('appHelpForm', [function () {
        return {
            restrict: 'ECMA',
            templateUrl: 'views/base/help_form.html',
            link: function (scope, iElement, iAttrs) {

            }
        };
    }])
    .directive('appMask',[function(){
        return{
            restrict:'ECMA',
            templateUrl:'views/base/mask.html',
            link:function(scope,iElement,iAttrs){
                //console.log("=========="+iElement)
            }
        };
    }]);



