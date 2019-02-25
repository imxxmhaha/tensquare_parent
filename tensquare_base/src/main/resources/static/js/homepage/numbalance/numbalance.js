$(
	//首页，判断用户是否登录，如果是登录，则返回加密的手机号码，格式为：187****2727
	$.ajax({
		type : 'GET',
		url : '/my/getShowPhone',
		data : {},
		dataType : 'json',
		success : function(data) {
			console.info(data);
			if(data.returnCode=="001000"){
				if(data.data.isLogin==1){
					$('#phoneArea').html('hi,'+data.data.phone);
				}
			}
		},
		error : function(xhr, type) {
			console.error(xhr);
			console.error(type);
		}
	}),
	//获取文字广告
	$.ajax({
		type : 'GET',
		url : '/textAdv/getTextAdvList',
		data : {},
		dataType : 'json',
		success : function(data) {
			console.info(data);
			if(data.returnCode=="001000"){
				var data=data.data;
				var html='';
				if(data!=null&&data.length>0){
					html+='<div class="content-remain">'
								+'<div class="title" onclick="javascript:toTextAdv(\''
								+data[0].id+'\',\''
								+data[0].infoUrl+'\',\''
								+data[0].title+'\',\''
								+data[0].isNeedLogin+'\')">'
									+'<img src="images/icon-telephone.png" class="telephone-img"/>'
									+'<p>'+data[0].title+'</p>'
								+'</div>'
							+'<div class="green-bar"></div>'
						+'</div>'
				}
				if(data!=null&&data.length>1){
					html+='<div class="content-remain">'
								+'<div class="title" onclick="javascript:toTextAdv(\''
								+data[1].id+'\',\''
								+data[1].infoUrl+'\',\''
								+data[1].title+'\',\''
								+data[1].isNeedLogin+'\')">'
									+'<img src="images/icon-telephone.png" class="telephone-img"/>'
									+'<p>'+data[1].title+'</p>'
								+'</div>'
							+'<div class="green-bar"></div>'
						+'</div>'
				}
				$('#middle').html(html);
			}else{
				console.error(data.errorMessage);
			}
		},
		error : function(xhr, type) {
			console.error(xhr);
			console.error(type);
		}
	})
);



//点击进入文字广告页面
function toTextAdv(id,info_url,title,isNeedLogin){
	if(isNeedLogin==1){
		//判读是否已经登录
		$.ajax({
			type : 'GET',
			url : '/login/isLogin',
			data : {},
			dataType : 'json',
			success : function(data) {
				if('0' == data) {//未登录
		    		// 后续要换成弹窗
		    		var btnArray = ['取消', '确定'];
		    	    mui.confirm('您尚未登录，立即登录', '', btnArray, function(e) {
		    	        if (e.index == 1) {
		    	        	window.location.href= "/login/toLogin";
		    	        } else {
		    	        	return;
		    	        }
		    	    });
		    	} else { // 已登录
		    		entryTextAdv(id,info_url,title);
		    		window.location.href=info_url;
		    	}
			},
			error : function(xhr, type) {
				console.error(xhr);
				console.error(type);
			}
		});
	}else{
		entryTextAdv(id,info_url,title);
		window.location.href=info_url;
	}
}

function entryTextAdv(id,info_url,title){
	//记录文字广告点击
	$.ajax({
		type : 'GET',
		url : '/textAdv/clickTextAdv',
		data : {textAdvId:id,title:title,infoUrl:info_url},
		dataType : 'json',
		success : function(data) {
			console.info(data);
			if(data.returnCode=="001000"){
			}else{
				console.error(data.errorMessage);
			}
		},
		error : function(xhr, type) {
			console.error(xhr);
			console.error(type);
		}
	});
}

function entryMy(){
	window.location.href='/my';
}

function entryLogin(){
	var userId=$.cookie('he_life_user_id');
	//已经登录
	if(userId){
		window.location.href='/my';
	}else{
		window.location='/login.html';
	}
}
