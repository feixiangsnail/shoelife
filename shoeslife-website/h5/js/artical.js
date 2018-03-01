var artId = location_data.id
    ;
$(function(){
    $('#openRelevant').click(function(){
        if($('#shoes').hasClass('hide')) {
            $('#shoes').removeClass('hide');
            $('#openRelevant .icon').removeClass('upper');
            $('#openRelevant b').html('收起');
            return
        }
        $('#shoes').addClass('hide');
        $('#openRelevant .icon').addClass('upper');
        $('#openRelevant b').html('展开');
    });
    $(window).scroll(function(){
        if(!$('#shoes').hasClass('hide'))
            $('#openRelevant').trigger('click');
    });
    var model = new Model({
            url:"/operations/common/article/getdetail/"+artId
        }),
        sysTime = new Model({
            url:"/operations/common/system-time"
        })
        ;
    sysTime.send({
        succ:function(time){
            time = time[0];
            model.send({
                succ:function(d){
                    d = d[0];
                    console.log(Common.timeFormat(d.modifyTime,time));
                    d.date = Common.timeFormat(d.modifyTime,time);
                    var form = new Form('#artical');
                    form.setHtml(d);
                    $("#webtitle").html(d.title);
                    $("#portrait").attr('href','/h5/user.html?id='+d.editorId);
                    $("#portrait").html(['<img src="',filepath+d.photo,'" />'].join(''));
                    addArtDataList(d.articleProduct);
                }
            });
        }
    });
    function addArtDataList(list){

        var model = new Model({
                url:"/product/common/shoe/detaillist/"
            })
            ,length = list.length
            ,ids = ''
            ;

        if(!length) return $('#articalRelevant').hide();

        for(var i=0;i<length;i++){
            if(!list[i].shoe) continue;
            ids += list[i].shoeId+',';
        }

        sessionStorage.setItem('shoeIds',ids);

        model.send({
            file:JSON.stringify(ids.split(',')),
            succ:function(d){
                d = d[0];
                console.log(d);
                addRelevantList(d);
            }
        })

    }
    function addRelevantList(list){
        var length = list.length,
            html = ''
            ;
        if(!length) return $('#articalRelevant').hide();

        for(var i=0;i<length;i++){
            if(i>10) continue;
            html += ['<li>',
                '<a href="/h5/shoes.html?id='+list[i].shoeId+'"><img src="',filepath,list[i].coverPhoto.split(",")[0],'" /></a>',
                '<h3>',list[i].shoeName,'</h3>',
                '</li>'].join('');
        }

        if(length>10){
            html += [
                '<li class="eye-all">',
                '<a href="/h5/relevant.html?id=',artId,'">',
                '<span class="num">10+</span>',
                '<span class="all">查看全部</span>',
                '</a>',
                '</li>'
            ].join('');
        }
        html += '<li class="blank"></li>';

        $('#shoes ul').html(html);
    }
});
