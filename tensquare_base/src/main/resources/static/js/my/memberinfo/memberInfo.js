$(
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
	//获取用户当前经验
	$.ajax({
		type : 'GET',
		url : '/my/getMemInfo',
		timeout : 3000, //超时时间设置，单位毫秒
		data : {
			userId:'686',
		},
		dataType : 'json',
		success : function(data) {
			console.info(data);
			if(data.returnCode=="001000"){
				var exp=data.data.exp;
				var nextgradExp=data.data.nextgradExp;
				var levelCode=data.data.levelCode;
				var rate = exp/nextgradExp;
				$('#rate').css("width", rate*100+"%");
				$('#totalExps').html(exp);
				$('#nextLevelExp').html(nextgradExp);
				if(levelCode){
					levelCode=levelCode.replace('LV','');
					$('#levelCode').html(levelCode);
				}
				var lift=nextgradExp-exp;
				$('#prompt_p').html("距升级还需"+lift+"经验值");
			}
		},
		error : function(xhr, type) {
//			alert('Ajax error!');
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
	})
);

function entryMyBasicInfo(){
	window.location.href = "/my/personalData";
};

//跳转到金币任务页面
function entryGoldTaskList(){
	window.location.href='/my/goldTaskList';
};