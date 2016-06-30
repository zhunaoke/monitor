/**
 * Created by Administrator on 2016/3/6.
 */
//"use strict";

//提示信息；
var showMsg=function(msg,msgBoxId){
    $('#'+msgBoxId).show();
    $('#'+msgBoxId+" .msg-alert").html(msg);
};
/**
 * 验证是否为空;
 * @param str
 * @returns {boolean}
 */
function isNull(str){
    return str==null||str==''||str==undefined;
}
/**
 * 验证邮箱
 * @param email
 * @returns {boolean}
 */
function isEmail(email){
    var reg=/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    return reg.test(email);
}
/**
 * 验证手机号
 * @param phone
 * @returns {boolean}
 */
function isPhone(phone){
    var reg=/^(0|86|17951)?(13[0-9]|15[012356789]|17[0123456789]|18[0-9]|14[57])[0-9]{8}$/;
    return reg.test(phone);
}
/**
 * 验证是否是正确的接口地址;
 * @param url
 */
function isUrl(url){
    var reg=/^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+$/;
    return reg.test(url);
}

/**
 * 验证登陆表单
 * @param user
 * @returns {boolean}
 */
var checkLoginForm=function(user,msgBoxId){
   if(isNull(user.loginName)){
        showMsg("账户名未填写",msgBoxId);
        return false;
    }else if(isNull(user.passWord)){
        showMsg("密码未填写",msgBoxId);
        return false;
    }else{
       $("#"+msgBoxId).hide();
        return true;
    }
};
/**
 * 验证添加联系人
 * @param person
 * @returns {boolean}
 */
var checkAddPeopleForm=function(person,msgBoxId){
  if(isNull(person.name)){
      showMsg('请输入姓名！',msgBoxId);
      return false;
  }else if(!isNull(person.email)&&!isEmail(person.email)){
      showMsg("邮箱格式不正确！",msgBoxId);
      return false;
  }else if(isNull(person.phone)){
      showMsg("请输入手机号！",msgBoxId);
      return false;
  }else if(!isPhone(person.phone)){
      showMsg("手机号格式不正确！",msgBoxId);
      return false;
  }else if(isNull(person.authCode)){
      showMsg("请输入验证码！",msgBoxId);
      return false;
  }else{
      $("#"+msgBoxId).hide();
      return true;
  }
};
/**
 * 验证编辑联系人
 * @param staticPhone
 * @param person
 * @param msgBoxId
 * @returns {boolean}
 */
var checkEditPeopleForm=function(staticPhone,person,msgBoxId){
    if(isNull(person.name)){
        showMsg('请输入姓名！',msgBoxId);
        return false;
    }else if(!isNull(person.email)&&!isEmail(person.email)){
        showMsg("邮箱格式不正确！",msgBoxId);
        return false;
    }else if(isNull(person.phone)){
        showMsg("请输入手机号！",msgBoxId);
        return false;
    }else if(!isPhone(person.phone)){
        showMsg("手机号格式不正确！",msgBoxId);
        return false;
    }else if((staticPhone!=person.phone)&&isNull(person.authCode)){
        showMsg("请输入验证码！",msgBoxId);
        return false;
    }else{
        $("#"+msgBoxId).hide();
        return true;
    }
};
/**
 * 验证模板表单
 * @param template
 * @param msgBoxId
 * @returns {boolean}
 */
var checkTemplateForm=function(template,msgBoxId){
    if(isNull(template.templateType)){
        showMsg('请选择模板类型！',msgBoxId);
        return false;
    }else if(isNull(template.name)){
        showMsg("请输入模板名称！",msgBoxId);
        return false;
    }else if(isNull(template.monitorFrequency)||template.monitorFrequency==-1){
        showMsg("请选择监控频率！",msgBoxId);
        return false;
    }else if(isNull(template.httpMethod)){
        showMsg("请选择请求方式！",msgBoxId);
        return false;
    }else{
        $("#"+msgBoxId).hide();
        return true;
    }
};

/**
 * 校验监控项菜单
 * @param monitorInfo
 * @param msgBoxId
 */
console.log("验证url:"+(!isUrl('xc')&&!isNull('xc')));

var checkMonitorForm=function(monitorInfo,msgBoxId){
    if(isNull(monitorInfo.name)){
        showMsg('请输入监控名称！',msgBoxId);
        return false;
    }else if(isNull(monitorInfo.url)){
        showMsg("请输入监控对象！",msgBoxId);
        return false;
    }else if(!isUrl(monitorInfo.url)){
        showMsg("您输入的网址格式不正确！",msgBoxId);
        return false;
    }else if(monitorInfo.nodes.length==0){
        showMsg("请选择监测点！",msgBoxId);
        return false;
    }else if(monitorInfo.httpMonitorTemplate.length==0){
        showMsg("请选择监控模板！",msgBoxId);
        return false;
    }else if(isNull(monitorInfo.maxAlarmTime)||monitorInfo.maxAlarmTime==0){
    showMsg("请输入响应时间！",msgBoxId);
    return false;
    }else if(isNull(monitorInfo.maxExcptionAlarm)||monitorInfo.maxExcptionAlarm==0){
        showMsg("请输入异常次数！",msgBoxId);
        return false;
     }else if(isNull(monitorInfo.maxNodeAlarm)||monitorInfo.maxNodeAlarm==0){
        showMsg("请输入监测点个数！",msgBoxId);
        return false;
     }else if(isNull(monitorInfo.alarmTimeMessage)||monitorInfo.alarmTimeMessage==0){
    showMsg("请选择告警次数！",msgBoxId);
    return false;
     }else{
        $("#"+msgBoxId).hide();
        return true;
    }
}

/**
 * 获取select下拉菜单的选中值
 * @param selectedId
 * @returns {*}
 */
var getSelectedValue=function(selectedId){
    var obj=document.getElementById(selectedId);
    var index=obj.selectedIndex;
    return obj.options[index].value;
};
/**
 * 获取radio单选框的选中值
 * @param radioName
 * @returns {*}
 */
var getRadioValue=function(radioName){
    var radios=document.getElementsByName(radioName);
    for(var i=0;i<radios.length;i++){
        if(radios[i].checked){
            return radios[i].value;
        }
    }
};

/**
 * 获取复选框中的选中值
 * @param checkboxName
 * @returns {Array}
 */
var getCheckboxValue=function(checkboxName){
    var nodes=[];
    var checkbox=document.getElementsByName(checkboxName);
    for(var i=0;i<checkbox.length;i++){
        if(checkbox[i].checked){
            nodes.push({"id":checkbox[i].value});
        }
    }
    return nodes;
};




