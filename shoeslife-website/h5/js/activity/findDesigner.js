/**
 * Created by eleven on 2017/6/12.
 */
$(function(){
    $.ajax({
        type: 'get',
        url: "http://res.wx.qq.com/open/js/jweixin-1.0.0.js",
        dataType: "script",
        success: function (data) {
            var url='http://www.shoelives.com/h5'+$('#banner').attr("src").substr(2);
            wxShare.init({'shareTitle':'发现设计师 - 鞋生活','shareImg':url,'shareDesc':'Carol de Leon - 出生于亚洲的著名鞋履设计师。曾就职于Blonde Ambition 创意总监，其设计的鞋款在全球顶级时尚商店皆有售卖。'});
        }
    });
    appSearch('发现设计师 - 鞋生活','Carol de Leon - 出生于亚洲的著名鞋履设计师。曾就职于Blonde Ambition 创意总监，其设计的鞋款在全球顶级时尚商店皆有售卖。')

});