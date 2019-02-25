$(
	//获取用户当前经验
	$.ajax({
		type : 'GET',
		url : '/my/getMemInfo',
		data : {},
		dataType : 'json',
		success : function(data) {
			console.info(data);
			if(data.returnCode=="001000"){
				//设置经验值
				var exp=data.data.exp;
				var nextgradExp=data.data.nextgradExp;
				var levelCode=data.data.levelCode;
				var rate = exp/nextgradExp;
				$('#rate').css("width", rate*100+"%");
				$('#exp').html(exp+'/'+nextgradExp);
				if(levelCode){
					levelCode=levelCode.replace('LV','');
					$('#levelCode').html(levelCode);
				}
				//设置金币
				var point=data.data.point;
				$('#point').html(point+'金币');
			}
		},
		error : function(xhr, type) {
			console.error(xhr);
			console.error(type);
		}
	}),
	//获取用户的头像
	$.ajax({
		type : 'GET',
		url : '/my/getUserInfo',
		data : {},
		dataType : 'json',
		success : function(data) {
			if(data.returnCode=="001000"){
				if(data.data.userinfo.userlogolist[0].userlogourl){
					$('#userLogoUrl').attr('src', data.data.userinfo.userlogolist[0].userlogourl);
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
	}),
	//判断用户是否登录，如果是登录，则返回加密的手机号码，格式为：187****2727
	$.ajax({
		type : 'GET',
		url : '/my/getShowPhone',
		data : {},
		dataType : 'json',
		success : function(data) {
			console.info(data);
			if(data.returnCode=="001000"){
				if(data.data.isLogin==1){
					$('#phoneArea').html(data.data.phone);
				}
			}
		},
		error : function(xhr, type) {
			console.error(xhr);
			console.error(type);
		}
	}),
	
	//获取金币任务列表数量
	$.ajax({
		type : 'GET',
		url : '/my/getGoldTaskList/1',
		timeout : 3000, //超时时间设置，单位毫秒
		dataType : 'json',
		success : function(data) {
			console.info(data);
			if(data.returnCode=="001000"){
				var taskList=data.data.data;
				var totalSize=0;
				var finishSize=0;
				if(taskList){
					for(var i=0;i<taskList.length;i++){
						var task_list=taskList[i].task_list;
						for(var j=0;j<task_list.length;j++){
							totalSize+=1;
							var task=task_list[j];
							if(task.task_status==3){
								finishSize+=1;
							}
						}
					}
				}
			}else{
				alert(data.errorMessage);
			}
			$('#goldArea').html(finishSize+"/"+totalSize);
		},
		error : function(xhr, type) {
//			alert('Ajax error!');
			window.location.href = window.location.href; //超时之后重新加载
			console.error(xhr);
			console.error(type);
		}
	}),
	
	//获取底部广告
	$.ajax({
	    type: "POST",
	    url:"/textAdv/customPositionAdv",
		data : {position:501},
	    dataType:"json",         
	    success: function(data){
	    	if(null!= data.returnCode &data.returnCode=="001000"){ // 成功
	    		var result = data.data;
	    		if(null != result){
	    			console.log(result);
	    			var timestamp = Date.parse(new Date());
	    			var urlTmp = littleUrl.encode(result.info_url);
	    			var url = "/appPage/url=" + base64encode(urlTmp) + "&resName=" + result.title + "&isNeedShare=0"+ "&timestamp="+timestamp;
	    			$('.banner').find('a').attr("href", url);
	    			$('.banner').find('img').attr("src", result.image_url);
	    		}else{
	    			$('.banner').hide();
	    		}
			} else {
				$('.banner').hide();
				console.log("get textAdv customPositionAdv error");
			}
	    }
	})
);

function entryMyBasicInfo(){
	window.location.href = "/my/personalData";
};

function entryGoldTaskList(){
	window.location.href='/my/goldTaskList';
};

function returnIndex(){
	window.location='/';
}

function entrySet(){
	window.location='/set/page';
}

//进入我的经验页面
function entryMyExpDetail(){
	window.location.href='/my/jumpMyExpPage';
}

//进入经验详情页面
function entryForDetail(){
	window.location.href='/my/jumpExpDetail';
}

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

//会员权益
function clickMemberRight(){
	$.ajax({
		type : 'GET',
		url : '/memberRight/queryMemberRight',
		data : {},
		dataType : 'json',
		success : function(data) {
			console.info(data);
			if(data.returnCode=="001000"){
				if(data.memberrightlist==null){
		    		var btnArray = ['确定'];
		    	    mui.confirm('', '<p class="mui-text">当前城市暂未开通会员权益<span class="mui-span">，敬请期待！</span></p>', btnArray, function(e) {
		    	        if (e.index == 1) {
		    	        	return;
		    	        } else {
		    	        	return;
		    	        }
		    	    });
				}else{
					//暂未处理，稍后问产品
				}
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

$(document).ready(function(){
	//设置收藏数量
	var count = $(".i1").html();
	console.log(count);
	if(count && parseInt(count) > 99){
		$(".i1").html("99+");
	}
}); 