window.gamehall = window.gamehall || {getValue:function(){},onEvent:function(){}};

var Common = {
	getUrlParam:function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
	},
	getUrlParamS:function(names){
		var len=names.length
			,vals = []
		;
		for( var i=0;i<len;i++ ){
			vals.push(this.getUrlParam(names[i]));
		}
		return vals;
	},
	getDataStatus:function(data,name,val){
		for(var j=0,len=data.length;j<len;j++){
			if(data[j][name]==val)
				return data[j];
		}
		return{};
	},
	removeLetter:function(list,name){
		for( var i=0,le=list.length;i<le;i++ ){
			if(list[i][name])
				list[i][name] = list[i][name].replace(/[a-zA-Z]/g,"");
		}
	},
	getTwoTimeDifference:function(start,end){
		var date1=new Date()
			,date2=new Date()
		;
		
		date1.setTime(start*1000);
		date2.setTime(end * 1000);
		
		var date3=date2.getTime()-date1.getTime();  //时间差的毫秒数
		 
		//计算出相差天数
		var days=Math.floor(date3/(24*3600*1000));
		//计算出小时数
		var leave1=date3%(24*3600*1000);    //计算天数后剩余的毫秒数
		var hours=Math.floor(leave1/(3600*1000));//计算相差分钟数
		var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
		var minutes=Math.floor(leave2/(60*1000));
		 
		//计算相差秒数
		var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
		var seconds=Math.round(leave3/1000);

		return {
			day:days,
			hours:hours,
			minute:minutes,
			second:seconds
		}
	},
    getUrlParam:function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    },
	timeFormat:function(start,end){
        if(!start&&!end) return;
        var date = this.getTwoTimeDifference(start,end)
            ,format = ''
		;
        console.log(date);
        if(date.day>30){
            date = new Date(start);
            format = (date.getMonth()+1)+"月"+date.getDate()+"日";
		}else if(date.day>=1){
            format = date.day+'天前';
        }else if(date.hours>=1){
            format = date.hours+'小时前';
        }else if(date.minute>=1){
            format = date.minute+'分前';
		}else{
            format = date.second+'秒前';
        }
        return format;
	},
    setTime:function(start,end,succ){
    	if(!start&&!end) return;
    	var date = this.getTwoTimeDifference(start,end)
    		,format = []
    	;
		if(date.day>=1){
			format[0] = '<span>'+date.day+'</span>';
			format[1] = '天';
			format[2] = '<span>'+date.hours+'</span>';
			format[3] = '小时';
			format[4] = '<span>'+date.minute+'</span>';
			format[5] = '分';
		}else if(date.hours>=1){
			format[0] = '<span>'+date.hours+'</span>';
			format[1] = '小时';
			format[2] = '<span>'+date.minute+'</span>';
			format[3] = '分';
			format[4] = '<span>'+date.second+'</span>';
			format[5] = '秒';
		}else if(date.minute >=1){
			format[0] = '<span>'+date.minute+'</span>';
			format[1] = '分';
			format[2] = '<span>'+date.second+'</span>';
			format[3] = '秒';
		}else if(date.second>=1){
			format[0] = '0';
			format[1] = '分';
			format[2] = '<span>'+date.second+'</span>';
			format[3] = '秒';
		}else{
			if(succ)
				succ();
			format[0] = '0';
			format[1] = '分';
			format[2] = '0';
			format[3] = '秒';
		}
		return format.join('');
    },
	client:function(){
		var width = $(document).width()
			,height = $(document).height()
		;
		return {
			height:height
			,width:width
		}
	},
	isScroll:function(){
		var boxHeight = document.body.clientHeight,
			visibleHeight = document.documentElement.clientHeight,
			boxScrollTop = document.body.scrollTop
		;
		return Math.abs(boxHeight - visibleHeight) <= boxScrollTop
	},
	singleClass:function($id,i,name){
		$id.removeClass(name);
		$id.eq(i).addClass(name);
	}
};