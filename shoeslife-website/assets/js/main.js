$(function() {

    var u = navigator.userAgent, app = navigator.appVersion;
    var browser = {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    };

    if(browser.ios) {
        $('body').addClass('ios')
    }

    $('body').removeClass('hide');

    var ua = navigator.userAgent.toLowerCase();
    var isIE = ua.indexOf("msie")>-1;
    var version;
    if(isIE){
        version =  ua.match(/msie ([\d.]+)/)[1];
        if(parseInt(version) > 8) {
            new WOW().init();
        }
    }else {
        new WOW().init();
    }
    

    $(document).on('scroll', function (e) {
        var docScrollTop = $(document).scrollTop();
        var winHeight = $(window).height();

        checkMenuBar();

        // if(docScrollTop > winHeight) {
        //     $(".footer-toTop").fadeIn();
        // }else {
        //     $(".footer-toTop").fadeOut();
        // }

    });

    function checkMenuBar() {
        var docScrollTop = $(document).scrollTop();
        var menuHeight = $("#topMenu").height();
        var bannerHeight = $("#bannerImageContainer").height();

        if(docScrollTop + menuHeight >= bannerHeight) {
            $("#topMenu").addClass("reverse");
        }else {
            $("#topMenu").removeClass("reverse");
        }
    }

    setTimeout(function () {
        checkMenuBar();
    }, 100)
    
    $("#downloadApp").click(function (e) {
        if(browser.mobile) {
            return true;
        }else {
            $('body').addClass('no-scroll');
            $(".qrcode-container").fadeIn();
        }
        return false;
    });

    $(".qrcode-close, .qrcode-overlay").click(function (e) {
        $('body').removeClass('no-scroll');
        $(".qrcode-container").fadeOut();
    });

    $(".footer-toTop").click(function (e) {
        $("html,body").animate({
            scrollTop: 0
        }, 500);
    });

    var imgs = $("img.lazyload");
    var imgIdx = 0;

    function lazyload(idx) {
        if(idx >= imgs.length) {
            return false;
        }

        var img = imgs.eq(idx);
        img.on('load', function(e) {
            lazyload(++idx);
            img.off('load')
        });
        img.on('error', function(e) {
            lazyload(++idx);
            img.off('error')
        });
        img.attr('src', img.data('src'));
    }

    // lazyload(imgIdx)

    // var player = videojs('my-player');
    // var player2 = videojs('my-player2');
    // window.player = player

    function playMov() {
        var myPlayer = this;
        myPlayer.play();
    }

    $(".index-view2").on('animationend', function() {
        videojs("my-player").ready(playMov);
    });

    $(".index-view3").on('animationend', function() {
        videojs("my-player2").ready(playMov);
    });

    $(".watch-mov").on('click', function () {
        videojs("my-player" + $(this).data('mov')).play();
        $("#ios-post" + $(this).data('mov')).hide();
    })
})