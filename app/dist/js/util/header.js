/**
 * Created by Administrator on 2016/3/9.
 */
var $navbar=$(".navbar-menu li a");
var $navbar_before= $('.navbar-menu li>a::before');
var menus=$(".navbar-menu").find("li");

menus.bind("click",function(){
    var logo=$("#nav-logo-img");
    var index=$(this).index()+1;
    $(this).addClass("active").siblings().removeClass("active");
    $navbar.removeAttr("class");
    $navbar_before.removeAttr("class");
    switch (index){
        case 1:
            $navbar.addClass("menu-c1");
            $navbar_before.addClass("menu-c1_before");
            logo.css({"background-position":"0 0"});
            break;
        case 2:
            $navbar.addClass("menu-c2");
            $navbar_before.addClass("menu-c2_before");
            logo.css({"background-position":"0 -42px"});

            break;
        case 3:
            $navbar.addClass("menu-c3");
            $navbar_before.addClass("menu-c3_before");
            logo.css({"background-position":"0 -84px"});
            break;
        case 4:
            $navbar.removeAttr("class").addClass("menu-c4");
            $navbar_before.addClass("menu-c4_before");
            logo.css({"background-position":"0 -126px"});
            break;
        case 5:
            $navbar.addClass("menu-c5");
            $navbar_before.addClass("menu-c5_before");
            logo.css({"background-position":"0 -168px"});

            break;
        case 6:
            $navbar.addClass("menu-c6");
            $navbar_before.addClass("menu-c6_before");
            logo.css({"background-position":"0 -210px"});
            break;
        default:
            $navbar.addClass("menu-c1");
            $navbar_before.addClass("menu-c1_before");
            logo.css({"background-position":"0 0"});

    }
});

function changeHeader(index){
    var logo=$("#nav-logo-img");
    var $navbar=$(".navbar-menu li a");
    var $navbar_before= $('.navbar-menu li>a::before');
    var navbarClassName='menu-c'+(index+1);
    var navbar_beforeClassName='menu-c'+(index+1)+'_before';
    $("header .navbar-menu li").eq(index).addClass("active").siblings("li").removeClass("active");
    $navbar.removeAttr("class");
    $navbar_before.removeAttr("class");

    //console.log(navbarClassName+";;;"+navbar_beforeClassName);

    $navbar.addClass(navbarClassName);
    $navbar_before.addClass(navbar_beforeClassName);
    var pY=index*42;
    logo.css({"background-position":'0 '+(-pY)+'px'});
}