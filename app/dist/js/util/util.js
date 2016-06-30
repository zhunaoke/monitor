function setCookie(cname, cvalue, exhours) {
    var d = new Date();
    //d.setTime(d.getTime() + (exhours*1000));//设置过期时间是多少秒后；
    d.setTime(d.getTime() + (exhours*60*60*1000));//设置过期时间是多少小时；
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return null;
}
function clearCookie(name) {
    setCookie(name, "", -1);
}

/*
 * 加密解密
 * */
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1,
    63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31,
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
    50, 51, -1, -1, -1, -1, -1);
function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4)
                | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}
function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        /* c1 */
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);
        if (c1 == -1)
            break;
        /* c2 */
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);
        if (c2 == -1)
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        /* c3 */
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64DecodeChars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1)
            break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        /* c4 */
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64DecodeChars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}
function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}
function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                // 0xxxxxxx
                out += str.charAt(i - 1);
                break;
            case 12:
            case 13:
                // 110x xxxx 10xx xxxx
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx 10xx xxxx 10xx xxxx
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12)
                    | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
}


/**
 * show modal;
 */
function showAddPeopleModal(){
    $("#people-add-modal").modal({
        backdrop:"static"
    })
}
/**
 * 获取验证码计时;
 * @param triggerId
 * @param telTextId
 */
function timeCount(triggerId,telTextId,submitBtnId){
    var curMinutes=60;
    $('.people button#'+triggerId).attr("disabled","disabled");
    $("#"+triggerId).html('还剩'+curMinutes+'秒');
    var timer=setInterval(function(){
        if(curMinutes==0){
            clearInterval(timer);
            $("#"+triggerId).html('重新获取');
            angular.element("#"+telTextId).removeAttr("disabled");
            $('.people button#'+triggerId).removeAttr("disabled");
            curMinutes=60;
        }else{
            $('.people button#'+triggerId).attr("disabled","disabled");
            curMinutes=curMinutes-1;
            $("#"+triggerId).html('还剩'+curMinutes+'秒');
        }
    },1000);

    $("button.confirm,button.close,button.cancel").bind("click",function(){
        clearInterval(timer);
        $("#"+triggerId).html('获取验证码');
        angular.element("#"+telTextId).removeAttr("disabled");
        $('.people button#'+triggerId).removeAttr("disabled");
        curMinutes=60;
    });
}


var maskMark='';
var _showMask = function () {
    maskMark='show';
    $('#mask').show();
    setTimeout('checkInternet()',120000);//2min后还没消失就提示网络异常；
}
var _hideMask = function () {
    maskMark='hide';
    $('#mask').hide();
}
function checkInternet(){
    if(maskMark=='show'){
        _hideMask();
        swal("","超时！","warning");
    }else{}
}


/**
 * 图表制作函数
 */

/**
 * 饼图
 */
function Pie(id,data){

    // var pieChart=echarts.init(document.getElementById('pie-count'));
    var pieChart=echarts.init(document.getElementById(id));
    var pieOption={
        title : {
            text: '',
            subtext: '',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} :{d}%"
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView : {show: false, readOnly: true},
                restore : {show: false},
                saveAsImage : {show: false},
                mark : {show: true}
            }
        },
        legend: {
            show:false,
            orient: 'vertical',
            left: 'left',
            data: ['可用率','不可用率']
        },
        series : [
            {
                name: '可用率',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {
                        value:data.data[0].value,
                        name:'可用率',
                        itemStyle: {
                        normal:{
                            color:'rgba(250,152,1,1)'
                        },
                        emphasis:{
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(250,152,1,1)'
                        }
                    }},
                    {
                        value:data.data[1].value,
                        name:'不可用率',
                        itemStyle: {
                        normal:{
                            color:'rgba(135,206,250,1)'
                        },
                        emphasis:{
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(135,206,250,1)'
                        }
                    }}
                ]

            }
        ]
    };
    pieChart.setOption(pieOption);
}
/**
 * 折线图
 */
function Line(id,data) {
    var lineChart=echarts.init(document.getElementById(id));
    var newXData=new Array();
    var xData=(data.xData).reverse(),yData=(data.yData).reverse();
    for(var i=0;i<xData.length;i++){
        newXData.push(xData[i].substr(11,5));
    }
    console.log(JSON.stringify(newXData));

    var lineOption={
        title: {
            text: ''
        },
        tooltip : {
            trigger: 'axis',
            formatter: "{b}<br/>{a} :{c}%"
        },
        legend: {
            show:false,
            data:['可用率']
        },
        toolbox: {
            show: false
//            orient: 'vertical',
//            left: 'right',
//            top: 'center',
//            feature: {
//                dataView : {show: false, readOnly: true},
//                restore : {show: false},
//                saveAsImage : {show: false},
//                mark : {show: true}
//            }
        },
        grid: {
            left: '5px',
            right: '5p',
            bottom: '5px',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                // data : ['00:00','01:00','02:00','','04:00','','06:00','','08:00','','10:00','','12:00','','14:00','','16:00','','18:00','','20:00','','22:00',''],
                data :newXData,
                axisLine:{
                    lineStyle:{
                        width:0
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLine:{
                    lineStyle:{
                        width:0
                    }
                }
            }
        ],
        series : [
            {
                name:'可用率',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:yData,
                itemStyle:{
                    normal:{
                        color:'rgba(135,206,250,1)',
                        borderWidth:4
                    }
                }
            }
        ]
    };
    lineChart.setOption(lineOption);
}

/**
 * 地图
 */
function Map(id,data){
    // var mapChart = echarts.init(document.getElementById('web-response-map'));
    var mapChart = echarts.init(document.getElementById(id));
// 基于准备好的dom，初始化echarts
    var mapOption = {
        title: {
            text: '',
            subtext: '',
            left: 'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}ms"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data:['平均时间']
        },
        visualMap: {
            min: 0,
            max: 2500,
            left: 'right',
            top: 'bottom',
            text: ['快','慢'],           // 文本，默认为数值文本
            calculable: false,
            inRange: {
                color: ['rgba(255,0,0,1)', 'rgba(255,255,0,1)', 'rgba(0,128,64,1)']
            }
        },
        toolbox: {
            show: false,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView : {show: false, readOnly: true},
                restore : {show: false},
                saveAsImage : {show: false},
                mark : {show: true}
            }
        },
        series: [
            {
                name: '平均数据',
                type: 'map',
                mapType: 'china',
                roam: false,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                data:[
                    {name: '北京',value:0 },
                    {name: '四川',value:0}
                ]
            }
        ]
    };
    mapChart.setOption(mapOption); 
}


