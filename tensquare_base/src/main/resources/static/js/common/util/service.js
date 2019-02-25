/**
 * 服务接口
 * @author lishuangquan
 */
Package("mm.common.business.service");
mm.common.business.service = {
	setting: {
		type: "POST",
		dataType: "json",
		timeout: 90000,
		beforeSend: this.beforeSend,
		complete: this.complete,
		success: this.success,
		error: this.error,
		async: true,//默认:true 所有请求均为异步请求。
		cache: true//默认:true，设置为false将不会从浏览器缓存中加载请求信息。
	},
	send: function(config, options){
		var finalOptions = {};
		if (typeof(config) === 'string') {
			finalOptions.url = config;
		} else {
			finalOptions = config;
		}
		jQuery.extend(finalOptions, mm.common.business.service.setting, options);
		jQuery.ajax(finalOptions);
	},
	beforeSend: function(){
		//alert("beforeSend");
	},
	complete: function(){
		//alert("complete");
	},
	success: function(json){
		//alert(json.ret);
	},
	error: function(){
		alert("\u5BF9\u4E0D\u8D77\uFF0C\u7CFB\u7EDF\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5\uFF01");
	}
};
