var ary = location.search.substring(1).split("&")
    //,filepath = "http://dingzhaobing1.oss-cn-hangzhou.aliyuncs.com/"
    ,filepath = "http://shoelives.oss-cn-shenzhen.aliyuncs.com/"
    ;
window.location_data = {};
for(var i = 0;i<ary.length;i++){
    var ay = ary[i].split("=");
    location_data[ay[0]]=ay[1]
}

function fnt(){
    document.getElementById( 'shoeslife_designer_self' ).className='designer_textf';
    document.getElementById( 'fnimg1' ).style.display='none';
    document.getElementById( 'fnimg2' ).style.display='inline-block';
    document.getElementById( 'fnimgName' ).innerHTML = '收起';
}
function fnt2(){
    document.getElementById( 'shoeslife_designer_self' ).className='designer_text';
    document.getElementById( 'fnimg2' ).style.display='none';
    document.getElementById( 'fnimg1' ).style.display='inline-block';

    document.getElementById( 'fnimgName' ).innerHTML = '展开';
}
function fn(){
    document.getElementById( 'clok' ).style.display='none';
    document.getElementById( 'clo' ).style.display='none';

}
function fnn(){
    // document.getElementById( 'clok' ).style.display='none';
    // document.getElementById( 'clo' ).style.display='none';
    $("#clok").hide();
    $("#clo").hide();
    $(".footer").hide();
}

function FormatDate (strTime) {
    var date = new Date(strTime);
    return (date.getMonth()+1)+"月"+date.getDate()+"日";
}

function appSearch(title,desc){
    console.log(window.messageHandlers)
    if(window.messageHandlers){
        window.messageHandlers.setShareArgs(title,desc);
    }
}



$(function(){
    var ua = navigator.userAgent.toLowerCase();
    var isWx = ua.match(/MicroMessenger/i)=="micromessenger";
    if(!isWx) $('[name="open"]').attr('href','#');
    $('[name="open"]').click(function(){
        if(isWx) return;
        window.location.href = 'shoelives://';
        setTimeout(function(){
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.shoelives.android';
        },3000);
    });


    var getParam = function () {
        var name, value;
        var str = location.href;
        var num = str.indexOf("?");
        str = str.substr(num + 1);
        var arr = str.split("?");
        for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                this[name] = value;
            }
        }
    };
    var Request = new getParam();
    if (typeof Request.mobType!='undefined'){
        fnn();
    }
});