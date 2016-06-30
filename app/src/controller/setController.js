/**
 * Created by Administrator on 2016/3/9.
 */
var setApp=angular.module("app.set",[
    "ngCookies",
    "ui.bootstrap",
    "app.setService"
]);

setApp.controller("setCtrl",["$scope","$window","$rootScope",function($scope,$window,$rootScope){
    //$rootScope.titName="监控组管理";
    changeHeader(4);
}]);
setApp.controller('set.monitor',["$scope","$rootScope",function($scope,$rootScope){
    $rootScope.titName='监控组管理';
}]);
setApp.controller('set.alarm',["$scope","$rootScope",function($scope,$rootScope){
    $rootScope.titName='报警组管理';
}]);

setApp.controller('set.template',["$scope","$rootScope","$window","$state","set","$http",function($scope,$rootScope,$window,$state,set,$http){
    $rootScope.titName='监控模板管理';
    //var token=base64decode($window.localStorage.getItem('token'));//便于测试
    var template=$scope.template={};
    //获取监控模板管理列表
    template.getTemplateList=function(page,pageSize,orderAttr,orderType){
        _showMask();
        set.getTemplateList(page,pageSize,orderAttr,orderType).then(function(data){
            _hideMask();
            template.templateList=data.content;
            console.log(JSON.stringify(template.templateList));
            //分页;
            $scope.allItems=data.totalElements;
            $scope.totalPages=data.totalPage;
            $scope.totalItems =data.totalElements;//20;
            $scope.currentPage =page;//page;
            $scope.pageSize = pageSize;
            $scope.maxSize = 10;
            //当页数改变以后，需要重新获取;
            $scope.pageChangedTemplate= function () {
                console.log($scope.currentPage);
                template.getTemplateList($scope.currentPage, $scope.pageSize,orderAttr,orderType);
            };

        },function(err){
            _hideMask();
            console.log(err);
            destroyMsg(err);
        });
    };
    template.getTemplateList(1,10,'id','DESC');
    //添加监控模板
    $scope.templateAddInfo={
        "name":'',
        "monitorFrequency":'',
        "httpMethod":'',
        "requestHeader":'',
        "responseHeader":'',
        "responseContent":'',
        "matchRule":'',
        "cookie":'',
        "templateType":'HTTP',
        "user":null
    };
    template.addTemplate=function(templateInfo){
        templateInfo.monitorFrequency=getSelectedValue('template-add-select-frequency');
        templateInfo.httpMethod=getRadioValue('getOption');
        templateInfo.matchRule=getRadioValue('matchOption');

        console.log("监控模板信息："+JSON.stringify(templateInfo));
        if(checkTemplateForm(templateInfo,'msg_add_template')){
            _showMask();
            set.addTemplate(templateInfo).then(function(data){
                _hideMask();
                console.log("添加成功"+JSON.stringify(data));
                template.getTemplateList(1,10,'id','DESC ');
                //window.location.href='/app/#/set/set-template';
                $state.go('set.template');
            },function(err){
                _hideMask();
                if(err.des=='用户token(令牌)非法'){
                    destroyMsg(err.des);
                }else{
                    showMsg(err.des,'msg_add_template');
                }
                console.log(err);
            });
        }
    };

    //编辑监控模板
    $scope.editTemplateInfo={//向service传递数组命名
        "id":'',
        "templateType":'HTTP',
        "name":"",
        "monitorFrequency":"",
        "httpMethod":"",
        "requestHeader": "",
        "responseHeader": "",
        "responseContent": "",
        "matchRule":"",
        "cookie": ""

    };
    template.showEditTemplate=function(templateInfo){
        console.log("内容"+JSON.stringify(templateInfo));
        angular.element('#template-edit-modal').modal({backdrop:'static'});
        $scope.editTemplateInfo.id=templateInfo.id;

        //$scope.editTemplateInfo.templateType=templateInfo.templateType;
        $scope.editTemplateInfo.name=templateInfo.name;
        $scope.editTemplateInfo.monitorFrequency=templateInfo.monitorFrequency;
        $scope.editTemplateInfo.httpMethod=templateInfo.httpMethod;
        $scope.editTemplateInfo.requestHeader=templateInfo.requestHeader;
        $scope.editTemplateInfo.responseHeader=templateInfo.responseHeader;
        $scope.editTemplateInfo.responseContent=templateInfo.responseContent;
        $scope.editTemplateInfo.matchRule=templateInfo.matchRule;
        $scope.editTemplateInfo.cookie=templateInfo.cookie;
    };
    template.updateTemplate=function(editTemplateInfo){//编辑页面表单绑定命名
        editTemplateInfo.monitorFrequency=getSelectedValue('edit-template-select');
        editTemplateInfo.httpMethod=getRadioValue('httpMethod');
        editTemplateInfo.matchRule=getRadioValue('matchOption');
        console.log("更新的内容："+JSON.stringify(editTemplateInfo));
        if(checkTemplateForm(editTemplateInfo,'msg_edit_template')){
            _showMask();
            set.updateTemplate(editTemplateInfo).then(function(data){
                _hideMask();
                console.log(JSON.stringify(data));
                angular.element('#template-edit-modal').modal('hide');
                template.getTemplateList(1,10,'id','DESC');
            },function(err){
                _hideMask();
                console.log(err);
                if(err.des=='用户token(令牌)非法'){
                    destroyMsg(err);
                }else{
                    showMsg(err.des,'msg_edit_template');
                }
            });
        }
    };
    //删除监控模板
    template.delTemplate=function(id){//id作为整个删除模块的参数，应传在最外层
        console.log(id);
        swal({
            title: "确定删除吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            confirmButtonColor: "#8cd4f5",
            closeOnConfirm: false
        }, function () {
            _showMask();
            set.delTemplate(id).then(function (data) {
                _hideMask();
                swal({title: "删除成功!", type:"success",confirmButtonText: "确定", timer: 1500});
                console.log(JSON.stringify(data));
                template.getTemplateList(1,10,'id','DESC');
            },function(err){
                _hideMask();
                swal({title: "删除失败!", type:"error", confirmButtonText: "确定"});
                destroyMsg(err);
                console.log(JSON.stringify(err));
            });
        });
    };

}]);

setApp.controller('set.user',["$scope","$rootScope","$window","set",function($scope,$rootScope,$window,set){
    $rootScope.titName='联系人管理';
    var people=$scope.people={};
    //var token=base64decode($window.localStorage.getItem('token'));
    /**
     * 获取联系人列表
     * @param page
     * @param pageSize
     */
    people.getPeopleList=function(page,pageSize){
        _showMask();
        set.getPeopleList(page,pageSize).then(function(data){
            _hideMask();
            people.peopleList=data.content;
            //console.log(JSON.stringify(people.peopleList));
            //分页;
            $scope.allItems=data.totalElements;
            $scope.totalPages=data.totalPage;
            $scope.totalItems =data.totalElements;//20;
            $scope.currentPage =page;//page;
            $scope.pageSize = pageSize;
            $scope.maxSize = 10;
            //当页数改变以后，需要重新获取;
            $scope.pageChanged= function () {
                console.log($scope.currentPage);
                people.getPeopleList($scope.currentPage, $scope.pageSize);
            };
        },function(err){
            _hideMask();
            destroyMsg(err);
            console.log(err);
        });
    };
   people.getPeopleList(1,10);
    /**
     * 联系人信息
     * @type {{name: string, email: string, phone: string, code: string}}
     */
    $scope.peopleAddInfo={
        "name":'',
        "mesStartTime": "8:00",
        "mesEndTime": "23:00",
        "mesFrequency": "00:30",
        "email":'',
        "phone":'',
        "authCode":''
    };
    /**
     * 添加联系人
     * @param personInfo
     */
    people.addPeople=function(personInfo){
        console.log("联系人信息："+JSON.stringify(personInfo));
        if(checkAddPeopleForm(personInfo,'msg_add_person')){
            _showMask();
            set.addPeople(personInfo).then(function(data){
                _hideMask();
                angular.element("#people-add-modal").modal('hide');
                console.log("添加成功"+JSON.stringify(data));
                people.getPeopleList(1,10);
            },function(err){
                _hideMask();
               if(err.des=='用户token(令牌)非法'){
                   destroyMsg(err);
               }else{
                   showMsg(err.des,'msg_add_person');
               }
                console.log(err);
            });
        }
    };

    /**
     * 获取手机验证码计时器
     * @param phone
     * @param codeId
     * @param telTextId
     */

    people.getCode=function(phone,codeId,telTextId,btnId,msgBoxId,submitBtnId){

        if(isNull(phone)){
            angular.element("#"+codeId).attr("disabled","disabled");
            showMsg("请先输入手机号！",msgBoxId);
        }else if(!isPhone(phone)){
            angular.element("#"+codeId).attr("disabled","disabled");
            showMsg("手机号格式不正确！",msgBoxId);
        }else{
            angular.element("#"+telTextId).attr("disabled","disabled");
            angular.element("#"+codeId).removeAttr("disabled");
            angular.element("#"+msgBoxId).hide();
            timeCount(btnId,telTextId,submitBtnId);
            people.getSmsCode(phone);
        }
    };

    //获取短信验证的token;
    people.getSmsCode=function(phone){
        set.getAccessToken().then(function(data){
            console.log(data.accessToken);
            var access=data.accessToken;
            //set.getTelCode(phone,access).then(function(data){
            //    console.log("验证码发送成功"+JSON.stringify(data));
            //},function(err){
            //   console.log(JSON.stringify(err));
            //});

            $.ajax({
                method:'get',
                url:'https://tuapi.chiq-cloud.com/v2/user/authCode?type=sms' + '&value=' + phone + '&accessToken=' + access,
                success:function(data){
                    console.log("成功！");
                },
                error:function(err){
                    console.log("失败！");
                }
            });

        },function(err){
            console.log(err);
        });
    };

    //删除联系人；
    people.delPerson=function(id){
        swal({
            title: "确定删除吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            confirmButtonColor: "#8cd4f5",
            closeOnConfirm: false
        }, function () {
            _showMask();
            set.delPerson(id).then(function (data) {
                _hideMask();
                swal({title: "删除成功!", type:"success",confirmButtonText: "确定", timer: 1500});
                console.log(JSON.stringify(data));
                people.getPeopleList(1, 10);
            },function(err){
                _hideMask();
                //swal({title: "删除失败!", type:"error", confirmButtonText: "确定"});
                destroyMsg(err);
                console.log(JSON.stringify(err));
            });
        });
    };


    //编辑联系人
    $scope.peopleEditInfo={
        "id":"",
        "name":'',
        "email":'',
        "phone":'',
        "authCode":''
    };
    //先弹出编辑模态框，并修改数据
    people.editPerson=function(person){//按钮处命名
     angular.element('#people-edit-modal').modal({backdrop:'static'});
        $scope.peopleEditInfo.id=person.id;
        $scope.peopleEditInfo.name=person.name;
        $scope.peopleEditInfo.phone=person.phone;
        $scope.peopleEditInfo.email=person.email;

        $scope.staticPeoplePhone=person.phone;
    };
    //再执行提交更新
    people.updatePerson=function(person){//绑定表单命名
        console.log("更新："+JSON.stringify(person));
        if(checkEditPeopleForm( $scope.staticPeoplePhone,person,'msg_edit_person')){
            _showMask();
            set.editPerson(person).then(function(data){//service处命名
                _hideMask();
                angular.element("#people-edit-modal").modal('hide');
                swal({title: "修改成功!", type:"success", confirmButtonText: "确定", timer: 1500});
                console.log("更新成功"+JSON.stringify(data));
                people.getPeopleList(1,10);
            },function(err){
                _hideMask();
                //swal({title: "修改失败!", type:"error", confirmButtonText: "确定"});
                if(err.des=='用户token(令牌)非法'){
                    destroyMsg(err);
                }else{
                    showMsg(err.des,'msg_edit_person');
                }
                console.log(err);
            });
        }




    };
}]);


