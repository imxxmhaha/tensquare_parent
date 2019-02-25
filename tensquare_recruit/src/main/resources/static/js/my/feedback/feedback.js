var feedbackType=null;
// 切换选择
$(".feedbackType .type").click(function(){
    $(".feedbackType .type").removeClass("select");
    $(this).addClass("select");
    feedbackType=$(this).attr('feedbackType');
})
// textarea限制字数、监听字数
function limitTextarea(self,nowleng){
    $(self).on('input propertychange', function(event) {
        var _val = $(self).val();
        _val = _val < 200 ? _val : _val.substr(0,200);
        $(self).val(_val);
        $(nowleng).text(_val.length)
    });
    $(self).blur(function(){
        $(self).off('input propertychange');
    });
}

function addFeedback(){
	if(feedbackType!=null){
		var feedbackText=$('#feedbackText').val();
		if(feedbackText!=null&&feedbackText!='null'&&feedbackText.length>0&&feedbackText.trim().length>0&&feedbackText!=' '){
			$.ajax({
				type : 'POST',
				url : '/my/addFeedback',
				data : {
					portalType:'2',
					clientType:'',
					feedbackText:feedbackText.trim(),
					// "1", "故障投诉", "2", "改善建议", "3", "内容需求", "4", "其它问题"
					feedbackType:feedbackType,
				},
				dataType : 'json',
				success : function(data) {
					if(data.returnCode=="001000"){
						alert("意见反馈成功");
						window.location.href='/my';
					}else{
						alert(data.errorMessage);
					}
				},
				error : function(xhr, type) {
					alert('Ajax error!');
				}
			})
		}else{
			alert("请填写反馈内容！");
		}
	}else{
		alert("请选择反馈类型！");
	}
}

function returnMyIndex(){
	window.location.href='/my';
}

