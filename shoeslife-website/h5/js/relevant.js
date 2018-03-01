var artId = location_data.id
$(function(){
    var ids = sessionStorage.getItem('shoeIds');
    var model = new Model({
        url:"/product/common/shoe/detaillist/"
    });
    model.send({
        file:JSON.stringify(ids.split(',')),
        succ:function(d){
            d = d[0];
            console.log(d);
            addRelevantList(d);
        }
    })
    function addRelevantList(list){
        var length = list.length,
            html = ''
            ;
        for(var i=0;i<length;i++){
            html += [
                '<div>',
                '<a href="/h5/shoes.html?id='+list[i].shoeId+'"><img src="',filepath,list[i].coverPhoto.split(",")[0],'" ></a>',
                '<h3>',list[i].shoeName,'</h3>',
                '</div>'
            ].join('');
        }
        $('#shoesList').html(html);
    }
});