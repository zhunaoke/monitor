
var subnavsClick = function () {
    var subnavs = $(".st-menu").find("h4.panel-title>a");
    var subnavsZ = $(".st-menu").find("div.active-side-menu");
    subnavs.bind("click", function () {
        var index = $(this).index();
        subnavs.removeClass("active");
        subnavsZ.hide();
        $(this).addClass("active");
        $(this).find("div.active-side-menu").show();
    });
};
var panelHeadings = $(".st-menu").find(".panel-heading");
var iconfonts = $(".st-menu").find("span.icon");
//console.log(panelHeadings.length + "--" + iconfonts.length);
$(".panel:first").find(".panel-heading").addClass("active");
subnavsClick();
panelHeadings.bind("click", function () {
    //console.log("点击");
    var index = $(this).index();
    var inClass = $(this).parent().find(".in");
    panelHeadings.removeClass("active");
    $(this).addClass("active");
    iconfonts.addClass("glyphicon-chevron-right").removeClass("glyphicon-chevron-down");
    if (inClass.length !== 0) {
        $(this).find('span.icon').addClass("glyphicon-chevron-right").removeClass("glyphicon-chevron-down");
    } else {
        $(".st-menu").find(".collapse").attr("aria-expanded", false).removeClass("in");
        $(".st-menu").find(".panel-title").attr("aria-expanded", false).addClass("collapsed");
        $(this).find('span.icon').removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
    }
});
/**
 * 侧滑效果
 */

$(".menu-show-icon").bind("click", function () {
    $(this).hide();
    $(".menu-close-icon").show();
});