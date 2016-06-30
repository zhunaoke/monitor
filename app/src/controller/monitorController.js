var monitorApp=angular.module("app.monitor",[
    "ngCookies",
    "ui.bootstrap",
    "app.monitorService",
    "app.setService"
]);

monitorApp.controller("monitorCtrl",["$scope","$window","$rootScope","monitor",function($scope,$window,$rootScope,monitor){
    $rootScope.titName="监控";
    changeHeader(1);

}]);
monitorApp.controller('monitor.http',["$scope","$rootScope","$window","$state","$stateParams","monitor","set",function($scope,$rootScope,$window,$state,$stateParams,monitor,set){
    $rootScope.titName='HTTP监控';
    //var token=base64decode($window.localStorage.getItem('token'));//便于测试
    //console.log("token="+token);
    var mt=$scope.mt={};
    /**
     * 查询监控项列表
     * @param curPager
     * @param pageSize
     * @param orderAttr
     * @param orderType
     * @param condition
     */
    mt.getMonitorList=function(curPager,pageSize,orderAttr,orderType,condition){
        _showMask();
        monitor.getMonitorList(curPager,pageSize,orderAttr,orderType,condition).then(function(data){
            _hideMask();
            console.log(JSON.stringify(data));
            mt.monitorList=data.content;
            // console.log(JSON.stringify(mt.monitorList));
            //分页;
            $scope.allItems=data.totalElements;
            $scope.totalPages=data.totalPage;
            $scope.totalItems =data.totalElements;//20;
            $scope.curPager =curPager;
            $scope.pageSize = pageSize;
            $scope.orderAttr ='http_mornitor_id';
            $scope.orderType ='DESC';
            $scope.condition ='';
            $scope.maxSize = 10;
            //当页数改变以后，需要重新获取;
            $scope.pageChanged= function () {
                console.log($scope.curPager);
                mt.getMonitorList($scope.curPager, $scope.pageSize,orderAttr,orderType,condition);
            };
        },function(err){
            _hideMask();
            console.log(JSON.stringify(err));
            destroyMsg(err);
        });
    };
    mt.getMonitorList(1,10,'http_mornitor_id','DESC','');

    //删除
    mt.delMt=function(id){
        console.log(id);
        swal({title: "确定删除吗？",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                confirmButtonColor: "#8cd4f5",
                closeOnConfirm: false
             },function(){
                monitor.delMt(id).then(function(data) {
                    swal({title: "删除成功！", type: "success", confirmButtonText: "确定", timer: 1500});
                    console.log(JSON.stringify(data));
                    mt.getMonitorList(1, 10, 'http_mornitor_id', 'DESC', '');
                },function(err){
                    swal({title:"删除失败！",type:"error",confirmButtonText:"确定"});
                    destroyMsg(err);
                    console.log(JSON.stringify(err));
                })
            });
         };
    /**
     * 添加监控项
     */
    $scope.addMonitorInfo={
        "authorization": "",
        "body": "",
        "headers":"",
        "httpMorntorGroup":"",
        "name":"",
        "url":"",
        "pythonUrl":"",
        "nodes":[],
        "type":"",
        "httpMonitorTemplate":{"id":3 },
        "maxAlarmTime":1000,
        "maxNodeAlarm": 2,
        "maxExcptionAlarm": 1,
        "alarmTimeMessage": 2,
        "cookie": ""
    };
    $scope.modelConDefault={
        "id":'53',
        "name":"系统默认模板",
        "monitorFrequency":10,
        "httpMethod":'HEAD',
        "responseContent":'',
        "matchRule":2,
        "cookie":""
    };
    $scope.modelCon={
        "id":'0',
        "name":"系统默认模板",
        "monitorFrequency":10,
        "httpMethod":'HEAD',
        "responseContent":'',
        "matchRule":2,
        "cookie":""
    };
    //添加监控项时，获取已创监控模板列表；
    mt.getDefaultModels=function(){
        monitor.getTemplateListAll().then(function(data){
            // console.log(JSON.stringify(data));
            $scope.defaultModelList=data;
            $scope.defaultModelList.push($scope.modelConDefault);
        },function(err){
            console.log(err);
            if(err.des=='用户token(令牌)非法'){
                destroyMsg(err);
            }else{
                showMsg(err.des,'msg_edit_item');
            }
        });
    };
    mt.getDefaultModels();
    //修改选择模板切换内容；
    $scope.modelSelected={"value":53};
    $scope.updateSelected=function(){
        console.log($scope.modelSelected.value);
        for(var i=0;i<$scope.defaultModelList.length;i++){
            if($scope.defaultModelList[i].id==$scope.modelSelected.value){
                $scope.changeModelCon($scope.defaultModelList[i]);
            }
            // else if($scope.modelSelected.value==0){
            //     $scope.resetDefaultModel();
            // }
        }
    };
    $scope.changeModelCon=function(model){
        console.log("123"+JSON.stringify(model));
        $scope.modelCon.id=model.id;
        $scope.modelCon.name=model.name;
        $scope.modelCon.monitorFrequency=model.monitorFrequency;
        $scope.modelCon.httpMethod=model.httpMethod;
        $scope.modelCon.responseContent=model.responseContent;
        $scope.modelCon.matchRule=model.matchRule;
        $scope.modelCon.cookie=model.cookie;
        $scope.addMonitorInfo.type=model.httpMethod;
    };
    $scope.resetDefaultModel=function(){
        console.log("12222");
        $scope.modelCon.id=0;
        $scope.modelCon.name='系统默认模板';
        $scope.modelCon.monitorFrequency=10;
        $scope.modelCon.httpMethod='HEAD';
        $scope.modelCon.responseContent='';
        $scope.modelCon.matchRule=2;
    };
    /**
     * 创建监控项
     * @param addMonitorInfo
     */
    mt.addMonitor=function(monitorInfo){
        // _showMask();
        monitorInfo.nodes=getCheckboxValue('getNode');
        // monitorInfo.httpMonitorTemplate={"id":getSelectedValue('model-select-add')};
        monitorInfo.httpMonitorTemplate={"id":$scope.modelCon.id};
        monitorInfo.type=$scope.modelCon.httpMethod;
        console.log("添加监控项"+JSON.stringify(monitorInfo));
        //表单校验;
        if(checkMonitorForm(monitorInfo,'msg_add_item')){
            monitor.addMonitor(monitorInfo).then(function(data){
                // _hideMask();
                console.log(JSON.stringify(data));
                if(data.statusCode==0){
                    mt.getMonitorList(1,10,'http_mornitor_id','DESC','');
                    $state.go('monitor.http');
                }else if(data.statusCode==1){
                    swal("","创建失败！","error");
                }
            },function(err){
                // _hideMask();
                console.log(JSON.stringify(err));
                // swal({title: "创建失败!", type:"error", confirmButtonText: "确定"});
                destroyMsg(err.des);
            });
        }

    };


    /**
     * 开启监控项
     * @param id
     */
    mt.openMonitor=function(id){
        _showMask();
        console.log("开启关闭的monitor项id是："+id);
        monitor.openMonitor(id).then(function(data){
            _hideMask();
            console.log(JSON.stringify(data));
            mt.getMonitorList(1,10,'http_mornitor_id','DESC','');
        },function(err){
            _hideMask();
            console.log(JSON.stringify(err));
            destroyMsg(err.des);
        });
    };

    /**
     * 关闭监控项
     * @param id
     */
    mt.stopMonitor=function(id){
        _showMask();
        console.log("开启关闭的monitor项id是："+id);
        monitor.stopMonitor(id).then(function(data){
            _hideMask();
            console.log(JSON.stringify(data));
            mt.getMonitorList(1,10,'http_mornitor_id','DESC','');
        },function(err){
            _hideMask();
            console.log(JSON.stringify(err));
            destroyMsg(err.des);
        });
    };

    /**
     * 添加监控模板
     */
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
    mt.addTemplate=function(templateInfo){
        templateInfo.monitorFrequency=getSelectedValue('template-add-monitor-select-frequency');
        templateInfo.httpMethod=getRadioValue('getMethodTemp');
        templateInfo.matchRule=getRadioValue('matchOptionTemp');

        console.log("监控模板信息："+JSON.stringify(templateInfo));
        if(checkTemplateForm(templateInfo,'msg_monitor_template_box')){
            _showMask();
            set.addTemplate(templateInfo).then(function(data){
                _hideMask();
                angular.element("#templateModal").modal('hide');
                console.log("添加成功"+JSON.stringify(data));
                mt.getDefaultModels();
            },function(err){
                _hideMask();
                if(err.des=='用户token(令牌)非法'){
                    destroyMsg(err.des);
                }else{
                    showMsg(err.des,'msg_monitor_template_box');
                }
                console.log(err);
            });
        }
    }







}]);
monitorApp.controller('monitor.pay',["$scope","$rootScope",function($scope,$rootScope){
    $rootScope.titName='支付监控';
}]);

monitorApp.controller('monitor.edit',["$scope","$rootScope","$stateParams","$state","monitor","set",function($scope,$rootScope,$stateParams,$state,monitor,set){
    $rootScope.titName='HTTP监控';
    var mt=$scope.mt={};
    mt.monitorId=$stateParams.monitorId;
    $scope.modelSelected={"value":53};
    $scope.editMonitorInfo={
        "id":"",
        "url":"",
        "authorization":"",
        "body":"",
        "cookie":"",
        "headers":"",
        "httpMorntorGroup":"",
        "name":"",
        "pythonUrl":"",
        "type":"",
        "maxAlarmTime":10000,
        "maxNodeAlarm":2,
        "maxExcptionAlarm":1,
        "alarmTimeMessage":2,
        "httpMonitorTemplate":"",
        "nodes":[]
    };




    /**
     * 获取单个监控项下所有监测点情况
     */
    mt.getNodeInfoWithMonitor=function(){
        console.log("监控项id:"+mt.monitorId);
        monitor.getNodeInfoWithMonitor(mt.monitorId).then(function(data){
            $scope.nodesOfMonitor=data.nodes;
            $scope.editMonitorInfo.nodes=data.nodes;
        },function(err){
            if(err.des=='用户token(令牌)非法'){
                destroyMsg(err);
            }else{
                showMsg(err.des,'msg_edit_item');
            }
        })
    };
    /**
     * 获取监控项详情内容
     */
    mt.getDetailInfo=function(){
        _showMask();
        console.log("详情"+mt.monitorId);
        monitor.getDetailInfo(mt.monitorId).then(function(data){
            _hideMask();
            // console.log("详情内容："+JSON.stringify(data));
            mt.monitorDetailInfo=data;
            if(data.httpMonitorTemplate.length!=0){
                $scope.modelSelected={"value":data.httpMonitorTemplate.id};
                $scope.modelCon=data.httpMonitorTemplate;
                console.log($scope.modelSelected.value);
            }
            mt.editMt(mt.monitorDetailInfo);
        },function(err){
            _hideMask();
            console.log(JSON.stringify(err));
            destroyMsg(err.des);
        });
    };
    /**
     * 添加监控项时，获取已创监控模板列表；
     */
    $scope.modelConDefault={
        "id":'53',
        "name":"系统默认模板",
        "monitorFrequency":"10",
        "httpMethod":'HEAD',
        "responseContent":'',
        "matchRule":2,
        "cookie":""
    };
    $scope.modelCon={
        "id":'53',
        "name":"系统默认模板",
        "monitorFrequency":"10",
        "httpMethod":'HEAD',
        "responseContent":'',
        "matchRule":2,
        "cookie":""
    };

    /**
     * 获取单个用户下所有的监控模板列表；
     */
    mt.getDefaultModels=function(){
        monitor.getTemplateListAll().then(function(data){
            console.log(JSON.stringify(data));
            $scope.defaultModelList=data;
            $scope.defaultModelList.push($scope.modelConDefault);
        },function(err){
            console.log(err);
            if(err.des=='用户token(令牌)非法'){
                destroyMsg(err);
            }else{
                showMsg(err.des,'msg_edit_item');
            }
        });

    };



    //编辑监控项——勿删！！！！！！！！

    //为编辑model赋值；
    mt.editMt=function(monitorInfo){
        // mt.getNodeInfoWithMonitor(mt.monitorId);
        // console.log("参数内容"+JSON.stringify(monitorInfo));
        // console.log(monitorInfo.id);
        $scope.editMonitorInfo.id=monitorInfo.id;
        $scope.editMonitorInfo.url=monitorInfo.url;
        $scope.editMonitorInfo.authorization=monitorInfo.authorization;
        $scope.editMonitorInfo.body=monitorInfo.body;
        $scope.editMonitorInfo.cookie=monitorInfo.cookie;
        $scope.editMonitorInfo.headers=monitorInfo.headers;
        $scope.editMonitorInfo.httpMorntorGroup=monitorInfo.httpMorntorGroup;
        $scope.editMonitorInfo.name=monitorInfo.name;
        $scope.editMonitorInfo.pythonUrl=monitorInfo.pythonUrl;
        $scope.editMonitorInfo.cookie=monitorInfo.cookie;
        $scope.editMonitorInfo.type=monitorInfo.type;
        $scope.editMonitorInfo.maxAlarmTime=monitorInfo.maxAlarmTime;
        $scope.editMonitorInfo.maxExcptionAlarm=monitorInfo.maxExcptionAlarm;
        $scope.editMonitorInfo.alarmTimeMessage=monitorInfo.alarmTimeMessage;
        $scope.editMonitorInfo.httpMonitorTemplate=monitorInfo.httpMonitorTemplate;
        // $scope.editMonitorInfo.nodes=monitorInfo.nodes;
        // $scope.editMonitorInfo.nodes=$scope.nodesOfMonitor;

        console.log("编辑内容"+JSON.stringify($scope.editMonitorInfo));
    };
    //初始化;init;
    mt.init=function(){
        mt.getNodeInfoWithMonitor();//获取节点情况；
        mt.getDefaultModels();//获取所有监控模板列表;
        mt.getDetailInfo();//获取监控项详情
    };
    mt.init();


    //修改选择模板切换内容；

    $scope.updateSelected=function(){
        console.log($scope.modelSelected.value);
        for(var i=0;i<$scope.defaultModelList.length;i++){
            if($scope.defaultModelList[i].id==$scope.modelSelected.value){
                $scope.changeModelCon($scope.defaultModelList[i]);
            }
            // else if($scope.modelSelected.value==0){
            //     $scope.resetDefaultModel();
            // }
        }
    };
    $scope.changeModelCon=function(model){
        console.log("123"+JSON.stringify(model));
        $scope.modelCon.id=model.id;
        $scope.modelCon.name=model.name;
        $scope.modelCon.monitorFrequency=model.monitorFrequency;
        $scope.modelCon.httpMethod=model.httpMethod;
        $scope.modelCon.responseContent=model.responseContent;
        $scope.modelCon.matchRule=model.matchRule;
        $scope.modelCon.cookie=model.cookie;
        //$scope.addMonitorInfo.type=model.httpMethod;
        $scope.editMonitorInfo.type=model.httpMethod;
    };
    $scope.resetDefaultModel=function(){
        console.log("12222");
        $scope.modelCon.id=53;
        $scope.modelCon.name="系统默认模板";
        $scope.modelCon.monitorFrequency="10";
        $scope.modelCon.httpMethod='HEAD';
        $scope.modelCon.responseContent='';
        $scope.modelCon.matchRule=2;
    };

    /**
     * 更新监控项
     * @param editMonitorInfo
     */
    mt.updateMonitor=function(editMonitorInfo){//updateMonitor与页面一致
        editMonitorInfo.alarmTimeMessage=getSelectedValue('item-edit-alarmTimeMessage');
        editMonitorInfo.nodes=getCheckboxValue('editNode');
        // editMonitorInfo.httpMonitorTemplate={"id":getSelectedValue('model-select-add')};
        editMonitorInfo.httpMonitorTemplate={"id":$scope.modelCon.id};
        editMonitorInfo.type=$scope.modelCon.httpMethod;

        console.log("更新的内容："+JSON.stringify(editMonitorInfo));
        // if(true){
        if(checkMonitorForm(editMonitorInfo,'msg_edit_item')){
            monitor.updateMonitor(editMonitorInfo).then(function(data){//updateMonitor与service一致
                //console.log(JSON.stringify(data));
                // mt.getMonitorList(1,10,'http_mornitor_id','DESC','');
                $state.go('monitor.http');
            },function(err){
                console.log(err);

                destroyMsg(err.des);
            });
        }

    };

    //判断node节点是否选中；
    $scope.checkNode=function(value,array){
        // console.log(value+"数组:"+JSON.stringify(array));
        for (var i=0;i<array.length;i++){
            if(value==array[i].id){
                return true;
            }else if(i==array.length-1){
                return false;
            }
        }
    };

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
    mt.addTemplate=function(templateInfo){
        templateInfo.monitorFrequency=getSelectedValue('template-edit-monitor-select-frequency');
        templateInfo.httpMethod=getRadioValue('getMethodTemp-edit');
        templateInfo.matchRule=getRadioValue('matchOptionTemp-edit');

        console.log("监控模板信息："+JSON.stringify(templateInfo));
        if(checkTemplateForm(templateInfo,'msg_monitor_template_box_edit')){
            _showMask();
            set.addTemplate(templateInfo).then(function(data){
                _hideMask();
                angular.element("#templateModalEdit").modal('hide');
                console.log("添加成功"+JSON.stringify(data));
                mt.getDefaultModels();
            },function(err){
                _hideMask();
                if(err.des=='用户token(令牌)非法'){
                    destroyMsg(err.des);
                }else{
                    showMsg(err.des,'msg_monitor_template_box_edit');
                }
                console.log(err);
            });
        }
    }





}]);

monitorApp.controller('monitor.detail',["$scope","$rootScope","$stateParams","$state","monitor","set",function($scope,$rootScope,$stateParams,$state,monitor,set){
    $rootScope.titName='HTTP监控';
    var mt=$scope.mt={};
    mt.monitorId=$stateParams.monitorId;
    /**
     * 获取监控项详情内容
     */
    mt.getDetailInfo=function(){
        _showMask();
        console.log("详情"+mt.monitorId);
        monitor.getDetailInfo(mt.monitorId).then(function(data){
            _hideMask();
            // console.log("详情内容："+JSON.stringify(data));
            mt.monitorDetailInfo=data;
            if(data.httpMonitorTemplate.length!=0){
                $scope.modelSelected={"value":data.httpMonitorTemplate.id};
                $scope.modelCon=data.httpMonitorTemplate;
                console.log($scope.modelSelected.value);
            }
        },function(err){
            _hideMask();
            console.log(JSON.stringify(err));
            destroyMsg(err.des);
        });
    };
    mt.getDetailInfo();


    /**
     * 监控项图表
     */
    //饼图
    mt.getPieData=function(){
        console.log("id="+mt.monitorId);
        monitor.getPieData(mt.monitorId).then(function(data){
            console.log("饼图的数据："+JSON.stringify(data));
            Pie('pie-count',data)
        },function(err){
            console.log(JSON.stringify(err));
            destroyMsg(err.des);
        });
    };
    mt.getPieData();
    //折线图；
    mt.getLineData=function(){
        monitor.getLineData(mt.monitorId).then(function(data){
            console.log("折线图的数据："+JSON.stringify(data));
            Line('line-count',data)
        },function(err){
            console.log(JSON.stringify(err));
            destroyMsg(err.des);
        });
    };
    mt.getLineData();
    //地图;
    mt.getMapData=function(){
        Map('web-response-map','');
        // monitor.getMapData(mt.monitorId).then(function(data){
        //     console.log("地图的数据："+JSON.stringify(data));
        //     Map('web-response-map',data)
        // },function(err){
        //     console.log(JSON.stringify(err));
        //     destroyMsg(err.des);
        // });
    };
    mt.getMapData();
    //表格内容；
    mt.getTableData=function(){
        monitor.getResponseOfMonitor(mt.monitorId).then(function(data){
            console.log("表格的数据："+JSON.stringify(data));
            $scope.tableResponseData=data.data.data;
        },function(err){
            console.log(JSON.stringify(err));
            destroyMsg(err.des);
        });
    };
    mt.getTableData();
}]);
