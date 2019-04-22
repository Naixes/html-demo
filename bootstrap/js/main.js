/**
 * Created by Administrator on 2018/2/23.
 */
$(function () {
    function resize() {
//获取屏幕宽度
        var windowWidth = $(window).width();//注意括号
//判断屏幕大小分类
        var isSmall = windowWidth < 768;
//根据屏幕大小设置背景图片
        $("#main_ad > .carousel-inner > .item").each(function (i,item) {
            var $item = $(item);
            //$element.data()
            //一个函数，用于取元素上的自定义属性（data-abc）
            //参数是要取得的属性名称（abc）
            var imgSrc = isSmall ? $item.data('image-sm') : $item.data('image-lg');
            //当小图时改换成image
            if(isSmall) {
                $item.html('<img src="'+imgSrc+'" alt="" />');
            } else {
                $item.empty();
                $item.css('backgroundImage','url("'+ imgSrc +'")');
            }
        });
    }
//注册事件
    $(window).on('resize',resize).trigger('resize');
});

