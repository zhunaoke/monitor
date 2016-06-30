/**
 * Created by Administrator on 2016/3/22.
 */
//测试validateForm.js文件;
describe("validateForm.js",function(){

    it("登陆表单校验-正常",function(){
        var userinfo={
            "loginName":"20158087",
            "passWord":"yuan8087"
        };
        expect(checkLoginForm(userinfo)).toEqual(true);
    });
    it("登陆表单校验-为空",function(){
        var userinfo={
            "loginName":"",
            "passWord":""
        };
        expect(checkLoginForm(userinfo)).toEqual(false);
    });
    it("登陆表单校验-undefined",function(){
        var userinfo={
        };
        expect(checkLoginForm(userinfo)).toEqual(false);
    });

});

//测试util.js文件；
describe("util.js",function(){

    describe("测试cookie",function(){
        var spy;
        beforeEach(function(){
            spy=jasmine.createSpy('spy');

        });
        var cname='createCookie',cvalue='I am a developer!',ehour=2;
        it("创建cookie",function(){
            setCookie(cname,cvalue,ehour);
            expect(getCookie(cname)).not.toBeNull();
            expect(document.cookie).not.toBeNull();
        });
        it("获取cookie",function(){
            var cname='getCookie',cvalue='getCookie-getCookie',exhours=2;
            var d = new Date();
            d.setTime(d.getTime() + (exhours*60*60*1000));//设置过期时间是多少小时；
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
            expect(getCookie(cname)).not.toBeNull();
        });
        it("删除cookie",function(){
            clearCookie(cname);
            expect(getCookie(cname)).toBeNull();
        });

    });

    describe("加密解密",function(){
        var mingwen='hello你好',miwen;
        it("测试加密",function(){
            miwen=base64encode(utf16to8(mingwen));
            console.log(miwen);
            expect(miwen).not.toBeNull();
            expect(miwen).not.toEqual(mingwen);
        });
        it("测试解密",function(){
            console.log(miwen);
            console.log(utf8to16(base64decode(miwen)));
           expect(utf8to16(base64decode(miwen))).toBe(mingwen);
        });

    })


});