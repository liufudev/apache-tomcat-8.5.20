$(function () {
    //导航栏切换
    $('.nav ul').on('click', 'li', function (event) {

        $('.nav ul li').removeClass('on');
        $(this).addClass('on');
    });
    //公共切换
    $('.TabMenu li').click(function () {
        var index = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.TabBlock .m').eq(index).show().siblings().hide();
    });
    //输入框文字消失
    $('.text-change').focus(function () {
        var oldVal = $(this).val();
        if (oldVal == this.defaultValue) {
            $(this).val('');
            $(this).css('color', '#666');
        }
    })
    $('.text-change').blur(function () {
        var oldVal = $(this).val();
        if (oldVal == '') {
            $(this).val(this.defaultValue);
            $(this).css('color', '#999');
        }
    })
    //取消搜索跳回首页
    $('.cancel').on('click', function(event) {
        event.preventDefault();
        javascript:window.location='index.html';
    });
    //切换高清视频
    $('.quality-select').click(function (event) {
        $('.quality-select ul').toggle();
        $('.quality-select').toggleClass('bg-black2');
    });
    $('.quality-select ul li').click(function (event) {
        $(this).addClass('qualityOn').siblings().removeClass('qualityOn');
        $('.quality-select i').html($('.qualityOn').html())
    });

    $(document).ready(function () {
        $(".hide").click(function () {
            $(".show").slideToggle();
        });
    });
    $(document).ready(function () {
        $(".videohide").click(function () {
            $(".videoshow").slideToggle();
        });
    });
    $(document).ready(function () {
        $(".hide2").click(function () {
            $(".show2").slideToggle();
        });
    });
})
