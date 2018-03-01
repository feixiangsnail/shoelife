

function loadShoeData(){
	$.ajax({
		url:"/product/common/shoe/info/"+shoeId,
		//data:json_data,
		method:"POST",
		type:'json',
		dataType:'json',
		contentType:'application/json',
		success:function(data){
			if(data.returncode == 0){
				var json = data.data[0];
				var coveries = json.coverPhoto.split(",");
				var price = '';
				for (var j = 0; j < coveries.length; j++) {
					$('#shoeslife_shoe_main').append("<li><img src="+filepath+coveries[j]+"></li>")
					$('#shoeslife_shoe_href').append('<a href="#"></a>')
				}
				$("#shoeslife_shoe_title").html(json.shoeName);
				$("#shoeslife_shoe_title_id").html(json.shoeName);
				if(json.bottomPrice==json.topPrice)
                    price = '&yen;'+json.bottomPrice;
				else
					price = '&yen;'+json.bottomPrice+' – &yen;'+json.topPrice;
				$("#shoeslife_shoe_price").html(price);
				$.ajax({
					url:"/users/common/user-info/"+json.designerId,
					//data:json_data,
					method:"POST",
					type:'json',
					dataType:'json',
					contentType:'application/json',
					success:function(data){
						if(data.returncode == 0){
							var json = data.data[0];
							$("#shoeslife_shoe_designer_photo").attr("src",filepath+json.photo)
							$("#shoeslife_shoe_designer_name").html(json.adminName)
							$("#shoeslife_shoe_designer_profile").html(json.profils)
						}else{
                            window.location='404.html';
						}
					},
					error:function(msg){
						console.info(msg)
					}
				})
				$("#shoeslife_shoe_subhead").html(json.shoeName);
				if(json.introducePhoto) {
                    var arr = json.introducePhoto.split(",");
                    for (var j = 0; j < arr.length; j++) {
                        $("#shoeslife_shoe_content").append('<img src="' + filepath + arr[j] + '"  width="100%;" >')
                    }
                }
				bind_____();
			}else{
				window.location='404.html';
				console.log(data.message)
			}
		},
		error:function(msg){
			console.info(msg)
		}
	})
}

function bind_____(){
	$(".main_visual").hover(function(){
		$("#btn_prev,#btn_next").fadeIn()
	},function(){
		$("#btn_prev,#btn_next").fadeOut()
	});
	
	$dragBln = false;
	
	$(".main_image").touchSlider({
		flexible : true,
		speed : 200,
		btn_prev : $("#btn_prev"),
		btn_next : $("#btn_next"),
		paging : $(".flicking_con a"),
		counter : function (e){
			$(".flicking_con a").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	$(".main_image").bind("mousedown", function() {
		$dragBln = false;
	});
	
	$(".main_image").bind("dragstart", function() {
		$dragBln = true;
	});
	
	$(".main_image a").click(function(){
		if($dragBln) {
			return false;
		}
	});
	
	timer = setInterval(function(){
		$("#btn_next").click();
	}, 5000);
	
	$(".main_visual").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(function(){
			$("#btn_next").click();
		},5000);
	});
	
	$(".main_image").bind("touchstart",function(){
		clearInterval(timer);
	}).bind("touchend", function(){
		timer = setInterval(function(){
			$("#btn_next").click();
		}, 5000);
	});
	
}
