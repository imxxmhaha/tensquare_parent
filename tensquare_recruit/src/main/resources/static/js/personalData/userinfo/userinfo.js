var type=$('#type').val();
$(
	//获取用户的个人信息
	$.ajax({
		type : 'GET',
		url : '/my/getUserInfo',
		data : {},
		dataType : 'json',
		success : function(data) {
			console.info(data);
			if(data.returnCode=="001000"){
				var userName=data.data.userinfo.username;
				var sex=data.data.userinfo.sex;
				var birthday=data.data.userinfo.birthday;
				var cityName=data.data.userinfo.areaname;
				var mobnum=data.data.userinfo.mobnum;
				var mail=data.data.userinfo.mail;
				$('#nickName').html(userName);
				if(sex=='0'){
					$('#sex-span').html('男');
				}else{
					$('#sex-span').html('女');
				}
				if(birthday){
					$('#birthday').html(birthday.replace('-','年').replace('-','月')+'日');
				}
				$('#cityName').html(cityName);
				$('#cityName').attr('areacode',data.data.userinfo.areacode);
				$('#mobnum').html(mobnum);
				$('#email').html(mail);
				if(data.data.userinfo.userlogolist[0].userlogourl){
					$('#userLogoUrl').attr('src', data.data.userinfo.userlogolist[0].userlogourl);
				}
			}
		},
		error : function(xhr, type) {
			alert('Ajax error!');
		}
	})
//	dateReset()
);
//重置日期
//function dateReset(){
//	var date_choice=$('#date_choice');
//	var date=new Date;
//	var json = '{"type":"date","beginYear":1900,"endYear":'+date.getFullYear()+'}';
//	$('#date_choice').attr('data-options',json);
//}
function entryUpdateNick(){
	window.location='../rename.html?nickName='+$('#nickName').html();
}
function changeSex(a){
	//0男1女
	var sex = $(a).text();
	if("男" == sex){
		sex = 0;
	}else if("女" == sex){
		sex = 1;
	}
	var areacode=$('#cityName').attr('areacode');
	var birthday=$('#birthday').text();
	if(birthday.indexOf('年')>=0){
		birthday=birthday.replace('年','').replace('月','').replace('日','');
	}
	var userInfo=new Object();
	userInfo.userinfo = {
			"birthday":birthday,
			"sex":sex,
			'areacode':areacode
	}
	oData = JSON.stringify(userInfo);
	updateUserInfo(oData);
}

function updateBirthday(birthday){
	birthday = birthday.replace('-','').replace('-','');
	var userInfo = {};
	userInfo.memevent="";
	var sex = $('#sex-span').text();
	if("男" == sex){
		sex = 0;
	}else if("女" == sex){
		sex = 1;
	}
	var areacode=$('#cityName').attr('areacode');
	var userInfo=new Object();
	userInfo.userinfo = {
			"birthday":birthday,
			"sex":sex,
			'areacode':areacode
	}
	oData = JSON.stringify(userInfo);
	updateUserInfo(oData);
};

function updateUserInfo(data){
	$.ajax({
		type : 'post',
		url : '/my/setUserInfo',
		data : data,
		dataType : 'json',
        contentType: "application/json",
		success : function(data) {
			if(data.returnCode == "001000"){
				alert("修改个人信息成功！");
				window.location.reload();
			}else{
				console.error(data.errorMsg);
			}
		},
		error : function(e) {
			console.error(e);
		}
	})
};


//返回，如果type=0,跳转到金币任务页面
function back(){
	if(type==0){
		window.location='/my/goldTaskList';
	}else{
		window.location='/my';
	}
}

