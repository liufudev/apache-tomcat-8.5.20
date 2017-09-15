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
    //活动切换
    $('.activityTab li').click(function () {
        var index = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.activityBlock .mact').eq(index).show().siblings().hide();
    });
    //取消搜索跳回首页
    $('.cancel').on('click', function (event) {
        event.preventDefault();
        javascript:window.location = 'index.html';
    });
    //切换高清视频
    $('.quality-select').click(function (event) {
        $('.quality-select ul').toggle();
        $('.quality-select').toggleClass('bg-black2');
    });
    $('.quality-select ul li').click(function (event) {
        $(this).addClass('qualityOn').siblings().removeClass('qualityOn');
        $('.quality-select em').html($('.qualityOn').html())
    });

    $(".hide").click(function () {
        $(".show").slideToggle();
    });
    $(".videohide").click(function () {
        $(".videoshow").slideToggle();
    });
    $(".hide2").click(function () {
        $(".show2").slideToggle();
    });
    $(".hide1").click(function () {
        $(".show1").slideToggle();
    });
    function tolayer() {
        if ($(".layerbg").length > 0) {
            $(".layerbg").addClass("layerbg-active");
        } else {
            $("body").append('<div class="layerbg"></div>');
            $(".layerbg").addClass("layerbg-active");
        }
        $(".layerbg-active,.layer-sns,.share_btn").click(function () {
            $(".layer").removeClass("am-modal-active");
            setTimeout(function () {
                $(".layerbg-active").removeClass("layerbg-active");
                $(".layerbg").remove();
            }, 300);
        })
    };

    $(function () {
        $('#share').on('click', function (event) {
            event.preventDefault();
            $(".layer1").addClass("am-modal-active");
            tolayer();
        });
        $('#font').on('click', function (event) {
            event.preventDefault();
            $(".layer2").addClass("am-modal-active");
            tolayer();
        });
        $('#say').on('click', function (event) {
            event.preventDefault();
            $(".layer3").addClass("am-modal-active");
            tolayer();
            $('#comment').focus();
        });
        $('#tel').on('click', function (event) {
            event.preventDefault();
            $(".layer4").addClass("am-modal-active");
            tolayer();
        });
    });

})
