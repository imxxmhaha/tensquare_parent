(function(){

	var byteRangeLengthMethod = function(value, element, param){
		var length = value.length;
		for (var i = 0; i < value.length; i++) {
			if (value.charCodeAt(i) > 127) {
				length++;
			}
		}
		return this.optional(element) || (length >= param[0] && length <= param[1]);
	};
	$.validator.addMethod("byteRangeLength", byteRangeLengthMethod, "请确保输入的值在{0}-{1}个字节之间(一个中文字算2个字节)");
	
	
	var stringLengthMethod = function(value, element, param){
		var length = value.length;
		return this.optional(element) || (length >= param[0] && length <= param[1]);
	};
	$.validator.addMethod("stringLength", stringLengthMethod, "请确保输入的值在{0}-{1}个字符之间");

	
	
	
	
	var identMethod=function(value, element, param){
		var _v = false;
		if(value==null || value==""){
			_v = true;
		}else{
			_v = /^[a-zA-Z][a-zA-Z0-9_]*/.test(value);
		}
		return this.optional(element) || _v;
	};
	$.validator.addMethod("ident", identMethod, "名称必须是字母、_、数字的组合，第一个字符必须是字母字符");
	
	var notContainsMethod = function(value, element, param){
		var _reg = new RegExp("["+param+"]","g");
		var _v = _reg.test(value);
		return this.optional(element) || !_v;
	};
	$.validator.addMethod("notContains", notContainsMethod, "不能包括{0}等字符！"); 
	
	
	
	// 手机号码 规则来自validate.js
	var msisdnMethod = function(mobileId, element, param){
		var _v=false;
		var reg_format = /^1[3458]\d{9}$/;
		var reg_1 = /^13[456789]\d{8}$/;
		var reg_2 = /^\+?15\d{9}$/;
		var reg_3 = /^134[012345678]\d{7}$/;
		var reg_4 = /^\+?18[278]\d{8}$/;
		var reg_5 = /^\+?147\d{8}$/;
		if (mobileId.length == 0) {
			_v=false;
		} else if (/^\d+$/.test(mobileId) == false) {
			_v=false;
		} else if (mobileId.length != 11) {
			_v=false;
		}
		else if (!reg_format.test(mobileId)) {
			_v=false;
		}
		else if (reg_1.test(mobileId) || reg_2.test(mobileId) || reg_3.test(mobileId) || reg_4.test(mobileId) || reg_5.test(mobileId)) {
			_v=true;
		}
		else
		{
			_v=false;
		}
		return this.optional(element) || _v;
	};
	$.validator.addMethod("msisdn", msisdnMethod, "手机号码格式不正确！"); 
 
})();

