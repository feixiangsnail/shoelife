/**
 * voucher.js
 * @date Created on 2017/4/14
 * @author Jamie
 *
 */

$(function () {
    /**
     * 获取URL参数
     * @constructor
     */
    var getParam = function () {
        var name, value;
        var str = location.href;
        var num = str.indexOf("?")
        str = str.substr(num + 1);
        var arr = str.split("&");
        for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                this[name] = value;
            }
        }
    }
    var Request = new getParam();
    if(Request.mobType == 'Android'){
        window.messageHandlers.setShareArgs( '有妳，婚礼才完美', '我们结婚吧，浪漫婚鞋推荐...')
    }
    /**
     * 设置 Cookie
     * @param name
     * @param value
     */
    var setCookie = function(name, value, seconds) {
        seconds = seconds || 0; //seconds有值就直接赋值，没有为0，这个根php不一样。
        var expires = "";
        if (seconds != 0 ) { //设置cookie生存时间
            var date = new Date();
            date.setTime(date.getTime()+(seconds*1000));
            expires = "; expires="+date.toGMTString();
        }
        document.cookie = name+"="+escape(value)+expires+"; path=/"; //转码并赋值
    }
    /**
     * 清除 Cookie
     */
    var clearCookie =function(name) {
        setCookie(name, "", -1);
    }
    /**
     * 应用内领取
     */
    var getInVoucher = function () {
        $.ajax({
            url: "/order/personal/voucher/getaccountvoucher/14",
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                // 领取成功-立即使用
                if (data.returncode == 0) {
                    $('.v_get').hide()
                    $('.v_sub').hide()
                    $('.v_success').show()
                    $('#toUse').text('立即使用')
                    $('.v_success_infor span').text(Request.mobNumb||$('.v_mob input').val())
                    $('.v_success').on('click','#toUse', function () {
                        if(Request.mobType == 'Android'){
                            window.messageHandlers.appHome()
                        }else {
                            window.webkit.messageHandlers.appHome.postMessage(null);
                        }
                    })
                } else {
                    $('.v_get').hide()
                    $('.v_sub').hide()
                    $('.v_warning').show()
                    $('#toOpen').hide()
                    $('.v_warning').css({'marginBottom':'0.2rem'})
                    $('.v_warning .v_warning_infor').text(data.message)
                    $('.v_warning').on('click','#toOpen', function () {
                        if(Request.mobType == 'Android'){
                            window.messageHandlers.appHome()
                        }else {
                            window.webkit.messageHandlers.appHome.postMessage(null);
                        }
                    })
                }
            },
            error: function (data) {
                console.log(data)
            }
        });
    }
    /**
     * 应用外领取
     */
    var getOutVoucher = function () {
        $.ajax({
            url: "/order/personal/voucher/getaccountvoucher/14",
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                // 领取成功-立即使用
                if (data.returncode == 0) {
                    $('.v_sub').hide()
                    $('.v_success').show()
                    $('#toUse').text('打开鞋生活APP')
                    $('.v_success_infor span').text($('.v_mob input').val())
                    $('#toUse').on('click', function () {
                        window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.shoelives.android";
                    })
                } else {
                    // 领完|已经领取过|活动结束
                    $('.v_sub').hide()
                    $('.v_get').hide()
                    $('.v_warning').show()
                    $('.v_warning .v_warning_infor').text(data.message)
                    $('#toOpen').on('click', function () {
                        window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.shoelives.android";
                    })
                }
            },
            error: function (data) {
                console.log()(data)
            }
        });
    }
    if (Request.mobType) {
        console.log("应用内");
        // TODO 应用内
        /**
         * 跳转到H5领取页面
         * 通过URL判断是否登录
         * * 已登陆（mobType、sb）
         *          微信：先H5获取验证码再领取
         *          手机号-领取成功：领取成功|领完|已经领取过|活动结束
         * 未登陆（mobType）
         *          调用原生登录
         * @type {getParam}
         */
        $('.v_get').show();
        $('.v_get').on('click', 'a', function () {
            if (Request.sb) {
                clearCookie();
                setCookie('SESSION',Request.sb)
                if(Request.mobNumb){
                    console.log('应用内-已登录-手机号')
                    console.log(Request.sb)
                    getInVoucher()
                }else {
                    console.log('应用内-已登录-微信登录')
                    $('.v_sub').show();
                    $('.v_get').hide();
                    $('#toLogin').css({'background':'#ccc'}).attr("disabled", false)
                    // 获取验证码置灰
                    $('.v_sub .v_mob .v_sent').css({'color':'#ccc'}).attr("disabled", true)

                    $('.v_mob input').on('keyup',function () {
                        if($(this).val().length == 11){
                            $('.v_sub .v_mob .v_sent').css({'color':'#EA528C'}).attr("disabled", false)
                        }else {
                            $('.v_sub .v_mob .v_sent').css({'color':'#ccc'}).attr("disabled", true)
                        }
                    })

                    $('.v_sub').on('click', '.v_mob .v_sent', function () {
                        var numVal = $(this).parent().find('input').val()
                        if (!/^1[3|5|7|8]\d{9}$/.test(numVal)) {
                            $.Prompt("请输入正确的手机号码!");
                            return false;
                        }
                        var count = 90;
                        var countdown = setInterval(CountDown, 1000);

                        function CountDown() {
                            $('.v_sent').attr("disabled", true);
                            $('.v_sent').text(count + " s后重送");
                            if (count == 0) {
                                $('.v_sent').text("| 获取验证码").removeAttr("disabled");
                                clearInterval(countdown);
                            }
                            count--;
                        }
                        // 取得验证码
                        $.ajax({
                            url: "/users/common/personal/securityCode",
                            data: JSON.stringify({
                                mobile: $('.v_mob input').val()
                            }),
                            type:'post',
                            dataType: 'json',
                            contentType: 'application/json',
                            success: function (dataCode) {
                                if (dataCode.returncode == 0) {
                                    // 点击”立即领取“-登陆并领取
                                    $('.v_code input').on('keyup',function () {
                                        if($('.v_code input').val().length == 4){
                                            $('#toLogin').css({'background':'#EA528C'}).attr("disabled", false)
                                        }else {
                                            $('#toLogin').css({'background':'#ccc'}).attr("disabled", true)
                                        }
                                    })
                                    $('.v_sub').on('click', '#toLogin', function () {
                                        var codeVal = $('.v_code input').val()
                                        if (codeVal.length != 4) {
                                            $.Prompt("请输入正确的验证码!");
                                            return false;
                                        }
                                        // 绑定再领取
                                        $.ajax({
                                            url: "/users/common/personal/bind",
                                            data: JSON.stringify({
                                                mobile: $('.v_mob input').val(),
                                                securityCode: codeVal,
                                                //securityCode: '0000',
                                            }),
                                            type: "POST",
                                            dataType: 'json',
                                            contentType: 'application/json',
                                            success: function (dataLogin) {
                                                // 取得验证码
                                                if (dataLogin.returncode == 0) {
                                                    //领取
                                                    getInVoucher()
                                                    if(Request.mobType == 'Android'){
                                                        window.messageHandlers.appBind($('.v_mob input').val())
                                                    }else {
                                                        window.webkit.messageHandlers.appBind.postMessage($('.v_mob input').val());
                                                    }

                                                } else {
                                                    $.Prompt(dataLogin.message)
                                                }
                                            },
                                            error: function (errorData) {
                                                console.log(errorData)
                                            }
                                        });
                                    })
                                } else {
                                    $.Prompt('获取验证码失败')
                                }
                            },
                            error: function (msg) {
                                $.Prompt('服务器开小差！')
                            }
                        });
                    })
                }
            } else {
                // TODO 跳转至应用内的登陆页面
                if(Request.mobType == 'Android'){
                    window.messageHandlers.appLogin()
                }else {
                    window.webkit.messageHandlers.appLogin.postMessage(null);
                }
            }
        })

        $(".v_bot .boot").hide();

        // 应用内-去设计
        $('.wrap').on('click','a',function () {
            console.log(this.id)
            if(Request.mobType == 'Android'){
                window.messageHandlers.appDIY(this.id)
            }else {
                window.webkit.messageHandlers.appDIY.postMessage(this.id);
            }
        })
    } else {
        console.log("应用外");
        // TODO 应用外
        /**
         * 默认未登录
         * 未登陆
         * 1、获取验证码
         * 2、登陆-获取accountId
         * 3、领取
         */
        $('.v_sub').show();
        $('.v_get').hide()
        // 获取验证码置灰
        $('.v_sub .v_mob .v_sent').css({'color':'#ccc'}).attr("disabled", true)


        $('.boot').on('click','a',function () {
            console.log(Request.mobType,'应用外')
            window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.shoelives.android";
        })

        $('.v_mob input').on('keyup',function () {
            if($(this).val().length == 11){
                $('.v_sub .v_mob .v_sent').css({'color':'#EA528C'}).attr("disabled", false)
            }else {
                $('.v_sub .v_mob .v_sent').css({'color':'#ccc'}).attr("disabled", true)
            }
        })

        $('#toLogin').css({'background':'#ccc'}).attr("disabled", false);
        $('.v_sub').on('click', '.v_mob .v_sent', function () {
            var numVal = $(this).parent().find('input').val()
            if (!/^1[3|5|7|8]\d{9}$/.test(numVal)) {
                $.Prompt("请输入正确的手机号码!");
                return false;
            }
            var count = 90;
            var countdown = setInterval(CountDown, 1000);

            function CountDown() {
                $('.v_sent').attr("disabled", true);
                $('.v_sent').text(count + " s后重送");
                if (count == 0) {
                    $('.v_sent').text("| 获取验证码").removeAttr("disabled");
                    clearInterval(countdown);
                }
                count--;
            }
            
            // 取得验证码
            $.ajax({
                url: "/users/common/personal/securityCode",
                data: JSON.stringify({
                    mobile: $('.v_mob input').val()
                }),
                type: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: function (dataCode) {
                    if (dataCode.returncode == 0) {
                        // 点击”立即领取“-登陆并领取
                        $('.v_code input').on('keyup',function () {
                            if($('.v_code input').val().length == 4){
                                $('#toLogin').css({'background':'#EA528C'}).attr("disabled", false)
                            }else {
                                $('#toLogin').css({'background':'#ccc'}).attr("disabled", true)
                            }
                        })
                        $('.v_sub').on('click', '#toLogin', function () {

                            var codeVal = $('.v_code input').val()
                            if (codeVal.length != 4) {
                                $.Prompt("请输入正确的验证码!");
                                return false;
                            }
                            $.ajax({
                                url: "/users/common/personal/h5login",
                                data: JSON.stringify({
                                    mobile: $('.v_mob input').val(),
                                    securityCode: $('.v_code input').val(),
                                    //securityCode: '0000',
                                }),
                                type: "POST",
                                dataType: 'json',
                                contentType: 'application/json',
                                success: function (dataLogin) {
                                    // 取得验证码
                                    if (dataLogin.returncode == 0) {
                                        //领取
                                        getOutVoucher()
                                    } else {
                                        $.Prompt(dataLogin.message)
                                    }
                                },
                                error: function (errorData) {
                                    console.log(errorData)
                                }
                            });
                        })
                    } else {
                        // 验证码错误
                        $.Prompt('验证码获取失败！')
                    }
                },
                error: function (msg) {
                    console.info(msg)
                }
            });
        });

        $('.v_message .item a').hide();

        $.ajax({
            type: 'get',
            url: "http://res.wx.qq.com/open/js/jweixin-1.0.0.js",
            dataType: "script",
            success: function (data) {
                var url='http://www.shoelives.com/h5'+$('.v_banner img').attr("src").substr(2);
                wxShare.init({'shareTitle':document.title,'shareImg':url,'shareDesc':$('#description').text()});
            }
        });
    }

    //视频播放
    $('.v_message .playBtn').click(function(event){
        event.stopPropagation();
        var myVideo=$('.v_message video')[0];
        if (myVideo.paused){
            myVideo.play();
            $(this).hide();
            myVideo.style.width="100%";
            $(".v_message .mod").hide();
            $(".v_message .poster").hide();
        }
    });
    $('.v_message .video_').click(function(){
        var myVideo=$('.v_message video')[0];
        if (myVideo.play){
            myVideo.pause();
            $('.v_message .playBtn').show();
            $(".v_message .mod").css({"height":'1.96rem',"top":'.17rem'}).show();
        }
    });
})