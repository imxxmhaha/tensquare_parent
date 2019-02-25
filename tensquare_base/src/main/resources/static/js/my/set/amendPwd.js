function toChangePWD() {
	var request = {};
	request.portalType = $.cookie('portalType');
	request.user_id = $.cookie('he_life_user_id');
	var url = window.location.href; // 现在的URL
	request.backurl = url.substr(7);
	
	$.ajax({
		type : "post",
		url : '/my/set/toUMCChangePWD',
		data : JSON.stringify(request),
		dataType : "json",
		contentType : "application/json;charset=UTF-8",
		success : function(data) {

			var result = data.data;
			if (result != null) {
				if (result.url != "") {
					window.location.href = result.url;
				} else {
					art.dialog({
						lock : true,
						title : '温馨提示',
						content : result.desc,
						ok : function() {
						}
					});
				}
			}
		}
	});
	
	
	
//	Service.asExcute('ISSOService', 'toUMCChangePWD', [ request ], function(
//			result) {
//		if (result != null) {
//			if (result.url != "") {
//				window.location.href = result.url;
//			} else {
//				art.dialog({
//					lock : true,
//					title : '温馨提示',
//					content : result.desc,
//					ok : function() {
//					}
//				});
//			}
//		}
//	});
	
}
