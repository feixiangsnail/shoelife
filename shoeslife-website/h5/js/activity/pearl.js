$(function(){
    var model = new Model({
        url:"/product/common/shoe-subject/search"
    });
    model.send({
        file:JSON.stringify({id:1}),
        succ:function(d){
            d =  d[0];
            var list = d.list[0].shoeInfos,
                length = list.length,
                html = '',imgUrl = ''
            ;
            for(var i=0;i<length;i++){
                var url = list[i].coverPhoto.split(',')[0];
                if(!i) imgUrl = filepath+url;
                html += [
                    '<div class="block">',
                    '<div class="content">',
                    '<img src="',filepath,url,'" />',
                    '<div class="info">',
                    '<h1>',list[i].shoeName,'</h1>',
                    '<span class="money">¥',list[i].price,'</span>',
                    '<a href="http://m.shoelives.com/#/shoes/',list[i].shoeId,'">',
                        '<div class="but-padding">',
                        '<span class="but">查看详情</span>',
                    '</a>',
                    '</div>',
                    '</div>',
                    '</div>',
                    '</div>'
                ].join('');
            }
            $('#list').html(html);
        }
    });
    $.ajax({
        type: 'get',
        url: "http://res.wx.qq.com/open/js/jweixin-1.0.0.js",
        dataType: "script",
        success: function (data) {
            var url='http://www.shoelives.com/h5'+$('#banner').attr("src").substr(2);
            wxShare.init({'shareTitle':document.title,'shareImg':url,'shareDesc':'珍珠，给人一种“Elegant”的感觉，在很多人印象中与朝气无缘，但近年时尚界却玩出了不少新花样，奢华 的它如今也变得年轻有趣，潮味十足，不仅可以 出现在耳畔颈间，甚至还能穿在脚上'});
        }
    });
    appSearch(document.title,'珍珠，给人一种“Elegant”的感觉，在很多人印象中与朝气无缘，但近年时尚界却玩出了不少新花样，奢华 的它如今也变得年轻有趣，潮味十足，不仅可以 出现在耳畔颈间，甚至还能穿在脚上')

})