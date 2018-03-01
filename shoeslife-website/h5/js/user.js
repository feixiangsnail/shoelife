$(function(){
    var editorId = location_data.id
    var userInfo = new Model({
        url:"/users/common/user-info/"+editorId
    }),
        fanscount = new Model({
            url:"/operations/common/follow/fanscount/"+editorId,
        })
    ;

    userInfo.send({
        succ:function(d){
            var json = d[0];
            $('[name="shoeslife_head_photo"]').attr("src",filepath+json.photo)
            $("#shoeslife_user_name").html(json.adminName)
            $("#shoeslife_user_name_title").html(json.adminName)
            $("#shoeslife_designer_title").html(json.userType==4?"主编简介":"设计师简介")
            $("#shoeslife_designer_self").html(json.profils)
            $("#shoeslife_art_title").html(json.userType==4?'文章':'鞋款')
            $("#shoeslife_art_title_id").html(json.userType==4?'文章':'鞋款')
            loatArtOrEditNnmber(json.id,json.userType)

            if(json.profils.length<62){
                $('#designerImg').hide();
            }
        }
    });
    fanscount.send({
        succ:function(d){
            console.log(d[0]);
            $("#shoeslife_fans_num").html(d[0])
        }
    })
})

function loatArtOrEditNnmber(id,type){
    var editcount = new Model({
            url:"/operations/common/article/editcount/"+id,
        }),
        search = new Model({
            url:"/operations/common/article/releasesearch",
        }),
        article = new Model({
            url:"/product/common/shoe/search",
        }),
        countbydesigner = new Model({
            url:"/product/common/shoe/countbydesigner/"+id,
        }),
        file = JSON.stringify({editorId: id,pageNum: 1,pageSize: 20})
        , fileDesigner = JSON.stringify({designerId:id,status:'ONLINE',pageNum:1,pageSize:20})
    ;
    if(type==4){
        editcount.send({
            succ:function(d){
                $("#shoeslife_art_number").html(d[0]);
            }
        })

        search.send({
            file:file,
            succ:function(d){
                var json = d[0].list;
                for(var i=0;i<json.length;i++){
                    var dt = json[i];
                    $("#shoeslife_plist").append(
                        [
                            '<div class="proli"><div class="proli_left fl">',
                            '<a href="/h5/artical.html?id=',dt.articleId,'"><img src="'+filepath+dt.icon+'" ></a>',
                            '</div>',
                            '<div class="proli_right fl">',
                            '<div class="proli_right_t1">',
                            '<div class="proli_t1 fl">'+FormatDate(dt.releaseTime)+'</div>',
                            '<span class="proli_symbol">•</span>',
                            '<div class="proli_t2 fl"><img src="images/view.svg"  ></div>',
                            '<div class="proli_t3 fl">'+dt.browseNum+'</div></div>',
                            '<div class="proli_right_t2"><a href="/h5/artical.html?id='+dt.articleId+'">'+dt.title+'</a></div>',
                            '</div>',
                            '</div>'
                        ].join('')
                    )
                }
            }
        })

    }else{
        countbydesigner.send({
            succ:function(d){
                var json = d[0];
                $("#shoeslife_art_number").html(json);
            }
        })
        article.send({
            file:fileDesigner,
            succ:function(d){

                var html = '<div class="shoes-list" id="shoesList">'
                    ,d = d[0]
                    ;
                    var json = d.list;
                    for(var i=0;i<json.length;i++){
                        var dt = json[i],
                            url = filepath
                        ;
                        if(dt.coverPhoto)
                            url += dt.coverPhoto.split(',')[0]

                        html += [
                            '<div>',
                            '<a href="/h5/shoes.html?id='+dt.shoeId+'">',
                            '<img src="',url,'"  >',
                            '</a>',
                            '<h3><a href="/h5/shoes.html?id='+dt.shoeId+'">'+dt.shoeName+'</a></h3>',
                            '<span class="date">'+FormatDate(dt.lastOnlineTime)+'</span>',
                            '</div>'
                        ].join('');
                    }
                    html+='</div>';
                    $("#shoeslife_plist").html(html);
            }
        })
    }
}