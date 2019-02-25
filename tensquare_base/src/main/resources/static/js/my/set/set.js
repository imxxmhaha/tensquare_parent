
$(function(){
	if(!flag){
		$(".login").hide();
		$(".exit").hide();
	}
	
});

function about(){
	window.location='../about.html';
}
function agreement(){
	window.location='../agreement.html';
}


//登出
function logout(){
	
	var request = {};
//	request.user_id = $.cookie('he_life_user_id'); // 在后台获取
	request.provID=$.cookie('provID');
	request.region_id=$.cookie('areaID');
	request.login_region_id= $.cookie('login_region_id');
//	request.TGC_Ticket= $.cookie('TGC-Ticket');   //  在后台获取
	
	$.ajax({
		type : "post",
		url : '/login/logoutPost',
		data : JSON.stringify(request),
			dataType : "json",
		contentType : "application/json;charset=UTF-8",
		success : function(data) {
			console.log("登出成功,请出用户相关的cookie");
			var result = data.data;
			//往cookie写入登出需要采集的信息，后续会删除
			$.cookie('logout_flag', true);
			// 清楚用户相关的cookie
			delCookie();
			window.location.href =  "/index.html";
		},
		error : function(e) {
			console.log("错误了");
		}
	});
}


function toChangePWD(){
    $.ajax({
        type: 'get',
        url: '/login/isLogin',
        async: 'false',
//        dataType: "json",
//        contentType: "application/json;charset=UTF-8",
        success: function(data){
        	if("0" === data){
//        		window.location.href = "/login.html?backUrl="+base64encode(window.location.href)
        		window.location.href = "/login.html?backUrl="+base64encode("/my/toChangePwd")
        	}else{
        		window.location.href ="/my/toChangePwd"
        	}
        }
    })
	
//    $.ajax({
//        type: 'get',
//        url: '/my/toChangePwd',
////        dataType: "json",
////        contentType: "application/json;charset=UTF-8",
//        success: function(data){
//        	console.log(data);
//        	var timestamp = Date.parse(new Date());
//        	window.location.href = data+"&timestamp="+timestamp;
//        }
//    })
}


function delCookie(){
	$.cookie('nickName',null);
	$.cookie('he_life_user_id', null);
	$.cookie('he_life_account', null);	//  当前登录用户名
	$.cookie('he_life_heart_beat_time', null);
	$.cookie('isUpgradeType', null);
	$.cookie('isSysn', null);
}

