var Model = function(config){
    this.file = {};
    this.succ = function(){};
    $.extend(this,config);
}
Model.prototype.save = function(succ){
    succ = succ || this.succ;
    $.ajax({
        url:this.url,
        data:this.file,
        method:"POST",
        type:'json',
        dataType:'json',
        contentType:'application/json',
        success:function(data){
            if(data.returncode){
                window.location = '404.html';
                return console.log(data.message);
            }
            succ(data.data);
        },
        error:function(msg){
            console.info(msg)
        }
    })
}
Model.prototype.send = function(config){
    var file = config.file || this.file;
    $.ajax({
        url:this.url,
        data:file,
        type:'post',
        dataType:'json',
        contentType:'application/json',
        success:function(data){
            if(data.returncode) {
                window.location = '404.html';
                return console.log(data.message);
            }
            /*if(config.succ) {
                config.succ(data);
            }*/
            config.succ(data.data);
        },
        error:function(msg){
            console.info(msg)
        }
    })
}