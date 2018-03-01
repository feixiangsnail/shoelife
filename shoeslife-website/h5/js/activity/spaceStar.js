$(function () {
    /*var elWidth = document.documentElement.clientWidth||document.body.clientWidth;
    if (elWidth >= 640) {
        elWidth = 640;
        document.body.style.margin = '0 auto';
        document.body.style.width = "640px";
    }
    document.documentElement.style.fontSize = elWidth / 15 + 'px';*/
    //document.body.style.fontSize = elWidth / 15 + 'px';

    $.ajax({
        url: "/product/common/shoe-subject/search",
        type: "POST",
        dataType: 'json',
        data: JSON.stringify({id: 2}),
        contentType: 'application/json',
        success: function (data) {
            var shoeInfos = data.data[0].list[0].shoeInfos;
            var html = '',imgUrl = '';
            $.each(shoeInfos, function (i, item) {
                html += '<li>' +
                    '<img src="'+filepath+item.coverPhoto.split(',')[0]+'">' +
                    '<div>' +
                    '<p>'+item.shoeName+'</p>' +
                    '<span>¥'+item.price+'</span>' +
                    '<a href="http://m.shoelives.com/#/shoes/'+item.shoeId+'">查看详情</a>' +
                    '</div>' +
                    '</li>'
            });
            $('#shoeList').html(html);
        }
    });

    $.ajax({
        type: 'get',
        url: "http://res.wx.qq.com/open/js/jweixin-1.0.0.js",
        dataType: "script",
        success: function (data) {
            var url='http://www.shoelives.com/h5'+$('#banner img').attr("src").substr(2);
            wxShare.init({'shareTitle':document.title,'shareImg':url,'shareDesc':'鞋生活 - 星空系列高跟鞋，设计师 J.A.Lapray 利用金属材料、电绣车线及布料配色，让素材发声，使这一季的「星空系列」充满无限想象。'});
        }
    });
    appSearch(document.title,'鞋生活 - 星空系列高跟鞋，设计师 J.A.Lapray 利用金属材料、电绣车线及布料配色，让素材发声，使这一季的「星空系列」充满无限想象。')


});