
var nickName=null;
$(
	nickName=getQueryString('nickName'),
	$('#nickName').val(nickName)
);

//获取地址栏参数，name:参数名称
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return decodeURI(r[2]); return null; 
}

//修改昵称
function updateNick(){
	$.ajax({
		type : 'POST',
		url : '/my/updateNick',
		data : {
			bindtype:'2',//绑定类型，0：手机号；1：邮箱；2：用户名
			taskId:'2',//事件引擎，完善个人中心的任务id为2
			bindaccount:$('#nickName').val(),
			oldnick:nickName
		},
		dataType : 'json',
		success : function(data) {
			console.info(data);
			if(data.returnCode=="001000"){
				window.location.href='/my/personalData';
			}else{
				alert(data.errorMessage);
			}
		},
		error : function(xhr, type) {
			alert('Ajax error!');
		}
	})
}

function back(){
	window.location.href='/my/personalData';
}