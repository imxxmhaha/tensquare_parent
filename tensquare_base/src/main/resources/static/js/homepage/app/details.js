
var user_id = $.cookie('he_life_user_id');

// 分享应用上报
function shareApp() {
	var params = {};
	$.ajax({
	    type: "POST",
	    url:"/reportShare/shareApp",
	    data:JSON.stringify(params),
		contentType: "application/json",
	    dataType:"json",         
	    success: function(data){
	    	if(data.returnCode=="001000"){ // 成功
				console.log("share app success");
			} else {
				console.log("share app error");
			}
	    },
        error: function(){
			console.log("share app sys error");
        }
	});
}
$(function() {
	
	//判断是否显示收藏0:不显示，1:显示
	if(isNeedFavour == "1"){
		if(user_id != null&&"" != user_id){
			//检查收藏
			checkCollection();
			$(".collection").click(function(){
				if($(this).hasClass('unselected')) {
					addCollection(this);
				}else{
					delCollection(this);
				}
			});
		}else{
			$(".collection").click(function(){
				var btnArray = ['取消', '确定'];
	            mui.confirm('您尚未登录，无法收藏，立即登录', '', btnArray, function(e) {
	                if (e.index == 1) {
	                	window.location.href= "/login/toLogin";
	                } else {
	                	return;
	                }
	            });
			});
		}
		
	}else{
//		$(".share").hide();
		$(".collection").hide();
	}
	
	function checkCollection(){
		if(resid == "" || resid=="undefined" || resid == null){
			return;
		}
		
		var oData ={
				"resid": resid,
				"userid":user_id
		}
		$.ajax({
			type: "post",
			url: '/user/collect/checkCollectionReq',
			data: JSON.stringify(oData),
			dataType: "json",
			contentType: "application/json",
			success: function(data){
				//显示已收藏
				if(null != data &&　data.returnCode == "001000" && data.data == "1"){
					$(".collection").removeClass("unselected");
					$(".collection").addClass("selected");
				}
				
			},
			error: function(e){
				console.log(e);
			}
		})
	}
	
	//添加收藏
	function addCollection(obj){
		var oData ={
				"memevent":"0000",
				"userid":user_id,
				"optype":"0"
		}
		var collection={};
		collection.portaltype = "1";
		collection.nodetype = "1";
		collection.nodeid = rescode;
		oData.collection = collection;
		$.ajax({
			type: "post",
			url: '/user/collect/setCollectionReq',
			data: JSON.stringify(oData),
			dataType: "json",
			contentType: "application/json",
			success: function(data){
				if(null != data &&　data.returnCode == "001000"){
					//改样式
					$(obj).removeClass("unselected");
					$(obj).addClass("selected");
				}
			},
			error: function(e){
				console.log(e);
			}
		})
		
	}
	
	//删除收藏
	function delCollection(obj){
		var oData ={
				"memevent":"0000",
				"userid":user_id,
				"optype":"1"
		}
		var check_val = [];
		var delCollection={};
		delCollection.portaltype = "1";
		delCollection.nodetype = "1";
		delCollection.nodeid = resid;
		check_val.push(delCollection);
		oData.list = check_val;
		
		$.ajax({
			type: "post",
			url: '/user/collect/setCollectionReq',
			data: JSON.stringify(oData),
			dataType: "json",
			contentType: "application/json",
			success: function(data){
				if(null != data &&　data.returnCode == "001000"){
					//改样式
					$(obj).removeClass("selected");
					$(obj).addClass("unselected");
					
				}
			},
			error: function(e){
				console.log(e);
			}
		})
		
	}
	
});

	
