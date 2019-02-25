var keys;
var icode;
var countdown=60;
var aeskey='';
function getKeys() {  
	$.jCryption.getKeys('/login/getPubKey',function(receivedKeys) {
        keys = receivedKeys;
        aeskey = receivedKeys.aeskey;
    }); 
}

//错误提示3秒后消失
function errorMsg(msg) {
	$("#errorMsg").text(msg);
	$('.pop-error').show().delay (3000).fadeOut();
}

function registerByPhone() {  
	var request = {};
	request.msgAuthCode = $("#msgAuthCode").val(); // 动态验证码
	request.password = $("#password").val(); // 密码
	//request.verify_code = GlobalVeriable.verifyCorrectCode; // 随机数
	//request.verifyCorrectCode = $("#verifyCorrectCode").val(); // 随机数2
	request.portalType = $.cookie('portalType'); // portalType;
	request.icode = getUrlParam("icode"); // url带过来的


	$.jCryption.encrypt(request.password, keys, function(encryptedPasswd) {   
		request.password = encryptedPasswd;
		request.ip = $.cookie("ip");
		request.areaID = $.cookie('areaID');
		$.jCryption.encrypt($("#phoneNO").val(), keys, function(encryptedPhoneNO) { 
			request.phoneNO = encryptedPhoneNO;
			$.ajax({
			    type: "POST",
			    url:"/registerPostPhone",
			    data:JSON.stringify(request),
				contentType: "application/json",
			    dataType:"json",         
			    success: function(reply){
					if(reply.success) {
						/*
						var phoneNO = $("#phoneNO").val();
						var pwd = $("#password").val();
						//往cookie写入注册需要采集的信息，后续会删除
						$.cookie('register_flag', 1);
						$.cookie('regist_account', phoneNO);
						$.cookie('he_life_mobile_num', phoneNO,{ expires: 3560});
						$.cookie('user_code', reply.user_code);
						*/
						
						//backUrl为null时导致跳转错误页面,增加判断 by zengxianlian
						/*if(backUrl!=null&&backUrl!=''&&backUrl!='null'){
							window.location.href = "/portal/registPhoneSuc.jsp?backUrl="+base64encode(backUrl);
						}else{
							window.location.href = "/portal/registPhoneSuc.jsp";
						}*/
						window.location.href = "index.html";
					}else{
						if(reply.regist_flag=='8001'){
//							$('#msgAuthCodeCheck').show();
//							$('#msgAuthCodeCheck').html("短信验证码错误");
							
							errorMsg("短信验证码错误");
						}else if(reply.regist_flag=='8011'){
//							art.dialog({lock: true,title:'温馨提示',content:"短信验证码超时",ok:function(){}});
							
							errorMsg("短信验证码超时");
						}else if(reply.regist_flag=='8004'){
//							art.dialog({lock: true,title:'温馨提示',content:"系统繁忙，请稍后重试",ok:function(){}});	
							
							errorMsg("系统繁忙，请稍后重试");
						}else if(reply.regist_flag=='8002'){
//							art.dialog({lock: true,title:'温馨提示',content:"注册失败",ok:function(){}});	
							
							errorMsg("注册失败");
						}else if(reply.regist_flag=='8005'){
//							$('#loginIDTips').html("用户已创建通行证");
							
							errorMsg("用户已创建通行证");
						}else if(reply.regist_flag=='8006'){
//							$('#pwd1CheckTips').html("密码太过简单");
							
							errorMsg("密码太过简单");
						}else if(reply.regist_flag=='8007'){
//							$('#loginIDTips').html("手机号码非法");
							
							errorMsg("手机号码非法");
						}else if(reply.regist_flag=='8008'){
//							$('#loginIDTips').html("邮箱地址非法");
							
							errorMsg("邮箱地址非法");
						}else if(reply.regist_flag=='8009'){
//							$('#loginIDTips').html("和通行证号的账号已存在");
							
							errorMsg("和通行证号的账号已存在");
						}else if(reply.regist_flag=='8010'){
//							art.dialog({lock: true,title:'温馨提示',content:"系统繁忙，请稍后重试",ok:function(){}});
							
							errorMsg("系统繁忙，请稍后重试");
						}else if(reply.regist_flag=='8012'){
//							art.dialog({lock: true,title:'温馨提示',content:"验证码错误",ok:function(){}});
//							$("#vcodeImgWord").click();
							
							errorMsg("验证码错误");
						}else if(result.regist_flag == "8020") {
//							art.dialog({lock: true,title:'温馨提示',content:"您输入的手机号码已注册，请重新输入或直接登录",ok:function(){}});
//							$("#authCode").hide();
							
							errorMsg("您输入的手机号码已注册，请重新输入或直接登录");
						} else {
							console.log("注册异常");
							errorMsg("系统繁忙，请稍后重试");
						}												
						//$("#getMsgAuthCode").show();
					}
			    },
		        error: function(){
					console.log("register post phone sys error");
		        }
			});
			
		});
		
	});
	
	
}

function wxcsCheckPhone(str){
	//var reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
	//var reg = /^(1(3[4-9]|5[012789]|8[23478]|4[7]|7[8])[0-9]{8}$/;
	var reg = /^(13[4-9]|15[012789]|17[8]|18[23478]|14[7]|198)[0-9]{8}$/;
	if(reg.test(str)){
		return true;
	}
	return false;
}

$(function() {
	getKeys();
	
	// 手机号码校验
	$("#phoneNO").blur(function(){ 
		//手机号码验证
		var phoneNO = $.trim($("#phoneNO").val());
		
		if ($.trim(phoneNO) == "") {
			//$('#loginIDTips').css('display', '');
			//$('#loginIDTips').html("请输入手机号码或通过139邮箱注册");
			
			$("#phoneNOTips").text("请输入手机号码注册和通行证");
			return ;
		}
		
		var isPhoneReg = /^1[3,4,5,7,8,9]\d{9}$/;
        if(!isPhoneReg.test(phoneNO)){
//        	$('#loginIDTips').css('display', '');
//			$('#loginIDTips').html("请输入正确的手机号或139邮箱 ");
//			$('.jt-login-sms').hide();
			
			$("#phoneNOTips").text("请输入正确的手机号");
            return;
        }else{    // 正确，手机号符合格式，隐藏longinIdTips提示信息
        	//$("#loginIDTips").hide();
        	
        	$("#phoneNOTips").empty(); // 删除子节点
        	//$("#phoneNOTips").hide();
        }
        
        if(wxcsCheckPhone(phoneNO)){
//        	$('#loginIDTips').html("该手机号码可注册");
//        	$("#authCode").show();
        	
        	//$("#phoneNOTips").text("该手机号码可注册");
        	$("#phoneNOTips").empty(); // 删除子节点
        }else{
//        	$('#loginIDTips').css('display', '');
//			$('#loginIDTips').html("非移动手机号用户，请通过139邮箱注册 ");
//			$('.jt-login-sms').hide();
			
			$("#phoneNOTips").text("非移动手机号用户");
			return ;
        }
	});
	
	// 密码和重复密码校验
	PasswordValid.init();
	
	// 验证码输入校验
	MsgAuthCodeValid.init();
	
	// 发送验证码
	VarifyCodeValid.init();
	
	// 复选框
	$("#checkboxDiv").click(function(){
		$("#register").toggleClass("disable");
	});
	
	
	
	// 注册
	$("#register").click(function(){
		var flag = $(this).hasClass("disable");
		if(!flag) { // 可以注册
			/**
			 * 触发手机校验
			 */
			$("#phoneNO").blur();
			var _phoneNOTips = $("#phoneNOTips").text();
			if(_phoneNOTips != "") {
				return ;
			}
			
			/**
			 * 触发验证码校验
			 */
			$("#msgAuthCode").blur();
			$("#msgAuthCode").keyup();
			var _msgAuthCodeHidden = $("#msgAuthCodeHidden").val();
			if(_msgAuthCodeHidden != "") {
				return ;
			}
			
			/**
			 * 校验密码
			 */
			if(!PasswordValid.checkPassword()){
				return;
			}
			
			/**
			 * 校验重复密码
			 */
			$("#repassword").blur();
			var _repasswordHidden = $("#repasswordHidden").val();
			if(_repasswordHidden != "") {
				return ;
			}
			
			/**
			 * 校验是否发送过短信
			 */
			/*var _sendMsgFlag = $("#sendMsgFlag").val();
			if(_sendMsgFlag != "1") {
				errorMsg("请获取验证码");
				return ;
			}*/
			
			/**
			 * 注册
			 */
			registerByPhone();
		}
	});
});

var MsgAuthCodeValid = {
		params: {},
		init: function(){
			var me = this;
			me.initEvent();
		},
		initEvent: function(){
			var me = this;
			$("#msgAuthCode").blur(function(){
				me.checkMsgAuthCode();
			});
			
			// 出去非数字
			$("#msgAuthCode").keyup(function(){
				if(this.value.length==1){
					this.value=this.value.replace(/[^0-9]/g,'');
				}else{
					this.value=this.value.replace(/\D/g,'');
				}
			});
		},
		checkMsgAuthCode: function(){//检测短信验证码
			//$('#msgAuthCodeCheck').attr("class", "jt-login-error");
			var msgAuthCode = $("#msgAuthCode").val();
			if (msgAuthCode == null || msgAuthCode == "") {
				//$('#msgAuthCodeCheck').css('display', '');
				//$('#msgAuthCodeCheck').html("请输入短信验证码");
				
				errorMsg("请输入短信验证码");
				$("#msgAuthCodeHidden").val("请输入短信验证码"); // 错误标识
				return ;
			}
			if(isNaN(msgAuthCode)){
			//	$('.jt-login-capt').css('display', '');
				//$('#msgAuthCodeCheck').html("您输入的短信验证码有误，请重新输入");
				//$('#msgAuthCodeCheck').css('display', '');
				
				errorMsg("您输入的短信验证码有误，请重新输入");
				$("#msgAuthCodeHidden").val("您输入的短信验证码有误，请重新输入");
				return ;
			}
			
			//$('#msgAuthCodeCheck').css('display', 'none');
			//$('#msgAuthCodeCheck').html("");
			
			//$("#errorMsg").text("");
			$("#msgAuthCodeHidden").val("");
		}
};


var PasswordValid = {
		params: {},
		init: function(){
			var me = this;
			me.initEvent();
		},
		initEvent: function(){
			var me = this;
			$("#password").blur(function(){
				me.checkPassword();
			});
			
			$("#repassword").blur(function(){
				var _password = $("#password").val();
				var _repassword = $(this).val();
				if (_password != _repassword) {
					errorMsg("您两次输入的密码不一致");
					$("#repasswordHidden").val("您两次输入的密码不一致");
					return ;
				}
				$("#repasswordHidden").val("");
			});
			
			/*$("#password").keyup(function(){
				//密码输入框，输入验证（前端验证）
				//me.showPWD1ProcessBar(this.value);
				me.checkPassword();
			});*/
			
		},
		checkPassword: function(){
			var me = this;
			var _password = $("#password").val();
			var phoneNO = $.trim($("#phoneNO").val());
			var result = Password.checkPassword(_password,phoneNO);
			var isSuccess = result.success;
			if(isSuccess){ // 密码校验通过
				//$('#pwd1CheckTips').html('');
				//me.showProcessBarByLevel(result.strongLevel);
			}else{
				//$('#pwd1CheckTips').html(result.errorMsg);
				errorMsg(result.errorMsg);
			}
			return isSuccess;
		}/*,
		showProcessBarByLevel: function(_level){
			$('#redBar1').attr("class", "");
			$('#redBar2').attr("class", "");
			$('#redBar3').attr("class", "");
			if(_level == 0){
				$('#redBar1').attr("class", "jt-login-inten-tx");
			}else if(_level == 1){
				$('#redBar1').attr("class", "jt-login-inten-tx");
				$('#redBar2').attr("class", "jt-login-inten-tx");
			}else if(_level == 2){
				$('#redBar1').attr("class", "jt-login-inten-tx");
				$('#redBar2').attr("class", "jt-login-inten-tx");
				$('#redBar3').attr("class", "jt-login-inten-tx");
			}else{
				$('#redBar1').attr("class", "");
				$('#redBar2').attr("class", "");
				$('#redBar3').attr("class", "");
			}
		},*/
		/*showPWD1ProcessBar: function(str){
			var me = this;
			if(str.length > 0){
				var level = Password.getStrongLevel(str);
				me.showProcessBarByLevel(level);
			}else{
				$('#redBar1').attr("class", "");
				$('#redBar2').attr("class", "");
				$('#redBar3').attr("class", "");
			}
			
		}*/
		
};



var Password = {
	// 弱:0,中:1,强:2
	/*getStrongLevel : function(pwd) {
		if (pwd.length < 6)
			return 0;
		var modes = Password.countCharMode(pwd);
		// 弱
		// 6-8位,且仅包含数字,字母,特殊符号中的1种
		// 6-8位,且仅包含数字,字母,特殊符号中的2种
		// 9-30位,且仅包含数字,字母,特殊符号中的1种
		if (pwd.length <= 8 && modes <= 2) {
			return 0;
		} else if (pwd.length > 8 && modes == 1) {
			return 0;
		}

		// 中
		// 6-8位,且仅包含数字,字母,特殊符号中的3种
		// 9-30位,且仅包含数字,字母,特殊符号中的2种
		if (pwd.length <= 8 && modes >= 3) {
			return 1;
		} else if (pwd.length > 8 && modes == 2) {
			return 1;
		}
		// 强
		// 9-30位,且仅包含数字,字母,特殊符号中的3种
		if (pwd.length > 8 && modes >= 3) {
			return 2;
		}

		return 0;
	},*/
		
	// 测试某个字符是属于哪一类
	/*getCharMode : function(c) {
		if (/^\d$/.test(c))
			return 1;
		if (/^[A-Z]$/.test(c))
			return 2;
		if (/^[a-z]$/.test(c))
			return 4;
		return 8;
	},
	// 计算出当前密码当中一共有多少种模式
	countCharMode : function(str) {
		var mode = 0;
		for (var i = 0; i < str.length; i++) {
			var c = str.charAt(i);
			mode |= Password.getCharMode(c);
		}
		return mode.toString(2).match(/1/g).length;
	},*/
	// 判断字符串是否为连续的字母或者数字
	// 234,111,aaa,abc
	isSimpleString : function(str) {
		// 相同串
		function same(s) {
			//var reg = new RegExp("^" + s.charAt(0).replace(/([^a-zA-Z0-9])/, "\\$1") + "+$");
			//return reg.test(s);
			var repeatCount = 1;
			var rCArray = s.split('');
			for (var i = 0; i < rCArray.length - 1; i++) {
				if (rCArray[i] == rCArray[i + 1]) {
					repeatCount++;
				} else {
					repeatCount = 1;
				}
				if (repeatCount > 2) {
					return true;
				}
			}
		}
		// 连续串
		function continuous(s) {
			if (!window._cacheCharsList) {
				var s1 = "abcdefghijklmnopqrstuvwxyz";
				var s2 = s1.toUpperCase();
				var s3 = "0123456789";
				var s4 = "9876543210";
				var s5 = "zyxwvutsrqponmlkjihgfedcba";
				var s6 = s5.toUpperCase();
				//var s7 = "$#";
				//var s8 = "#$";
				window._cacheCharsList = [ s1, s2, s3, s4, s5, s6 ];
			}
			var list = window._cacheCharsList;
			for (var l = 0; l < list.length; l++) {
				for (var i = 0; i < list[l].length - 2; i++) {
					var tempStr = list[l].substring(i, i + 3);
					var sss =s.indexOf(tempStr);
					if (sss!=-1) {
						return true;
					}
				}
			}
			return false;
		}
		if (same(str))
			return true;
		if (continuous(str))
			return true;
		return false;
	},
	
	checkPassword : function(pwd, phoneNO) {
		var min = 8;
		var max = 16; // 密码最大长度只支持16位，跟飞信保持一致 
						
		var errorCode = 0;
		var len = pwd.length;
		if (len == 0) {// 为空
			errorCode = 1;
		} else if (len < min) {// 太短
			errorCode = 2;
		} else if (len > max) {// 太长
			errorCode = 3;
		} else if (isError4()) {
			errorCode = 4;
		}else if (/[^A-Za-z0-9_~@#$\^]/.test(pwd)) {// 包含特殊字符
			errorCode = 5;
		} else if (isError6()) {
			errorCode = 6;
		} else if (isError8()) {
			errorCode = 8;
		} else if (isError9()) {
			errorCode = 9;
		} else if(isError10()){
			errorCode = 10;
		}
		if (errorCode == 0) {
			return {
				success : true//,
				//strongLevel : Password.getStrongLevel(pwd)
			};
		} else {
			var errorMsg = {
				"1" : "密码不能为空",
				"2" : "密码必须为8-16位",
				"3" : "密码必须为8-16位",
				"4" : "密码不能为纯数字",
				"5" : "密码不支持_~@#$^以外的特殊符号或中文字符",
				"6" : "密码不能出现连续数字或连续字母",
				"7" : "密码不能有字符串联",
				"8" : "密码不能与帐号相同或者密码组成部分不能与帐号相同",
				"9" : "密码不能是注册账号中连续3位及以上作为密码的组成部分",
				"10" : "必须包含大写字母、小写字母、数字、特殊字符四种字符中至少三种" 
			}
			return {
				success : false,
				errorCode : errorCode,
				errorMsg : errorMsg[errorCode]//,
				//strongLevel : Password.getStrongLevel(pwd)
			};
		}
		function isError4() {
			return /^\d+$/g.test(pwd);
		}
		function isError6() {
			return Password.isSimpleString(pwd);
		}
		function isError7() {
			return Password.isSimpleString(pwd);
		}
		function isError8() {
			if (phoneNO == pwd) {
				return true;
			}
			if ( pwd.indexOf(phoneNO) > 0 ) {
				return true;
			}
			return false;
		}
		function isError9() {
			for (var i = 0; i < phoneNO.length - 2; i++) {
				var tempStr = phoneNO.substring(i, i + 3);
				if (pwd.indexOf(tempStr)>=0) {
					return true;
				}
			}
			return false;
		}
		function isError10(){
			var i=0;
			//包含大写字母
			if(pwd.match(RegExp(/[A-Z]/))){
				i+=1;
			}
			//包含小写字母
			if(pwd.match(RegExp(/[a-z]/))){
				i+=1;
			}
			//包含数字
			if(pwd.match(RegExp(/[0-9]/))){
				i+=1;
			}
			//包含特殊字符
			if(pwd.match(RegExp(/[_~@#$]/))){
				i+=1;
			}
			if(i>=3){
				return false;
			}else{
				return true;
			}
		}
	}
};


var VarifyCodeValid = {
		
		params: {},
		init: function(){
			var me = this;
			me.initEvent();
		},
		initEvent: function(){
			var me = this;
			$("#authCode").on("click",function(){
				
				// 手机号码校验
				 
					//手机号码验证
					var phoneNO = $.trim($("#phoneNO").val());
					
					if ($.trim(phoneNO) == "") {
						//$('#loginIDTips').css('display', '');
						//$('#loginIDTips').html("请输入手机号码或通过139邮箱注册");
						$("#phoneNOTips").text("请输入手机号码注册和通行证");
//						$("#authCodeNOTips").html("请输入手机号码注册和通行证");
						return ;
					}
					
					var isPhoneReg = /^1[3,4,5,7,8,9]\d{9}$/;
			        if(!isPhoneReg.test(phoneNO)){
//			        	$('#loginIDTips').css('display', '');
//						$('#loginIDTips').html("请输入正确的手机号或139邮箱 ");
//						$('.jt-login-sms').hide();
						
						$("#phoneNOTips").html("请输入正确的手机号");
			            return;
			        }else{    // 正确，手机号符合格式，隐藏longinIdTips提示信息
			        	//$("#loginIDTips").hide();
			        	
//			        	$("#authCodeNOTips").hide();
			        }
			        
			        if(wxcsCheckPhone(phoneNO)){
//			        	$('#loginIDTips').html("该手机号码可注册");
//			        	$("#authCode").show();
			        	
			        	//$("#phoneNOTips").text("该手机号码可注册");
			        }else{
//			        	$('#loginIDTips').css('display', '');
//						$('#loginIDTips').html("非移动手机号用户，请通过139邮箱注册 ");
//						$('.jt-login-sms').hide();
						
						$("#phoneNOTips").html("非移动手机号用户");
						return ;
			        }
			        $("#authCodeNOTips").hide();
			        me.sendAuthCode(this);
				
			});
			
		},
		sendAuthCode: function(val){
//			$("#sendMsgFlag").val("1"); // 发送短信标识

			var phone=$("#phoneNO").val();
			phone=encrypt(phone);
			phone=encodeURIComponent(phone);
			var data = {
				portalType:portalType,
				phone:phone,
				verifyCodeType:$("#verifyCodeType").val()
			}
			//  处理逻辑
			$.ajax({
				type : "post",
				url : '/login/getDynamicPWD',
				data: JSON.stringify(data),
			 	dataType : "json",
				contentType : "application/json;charset=UTF-8",
				success : function(data) {
					if(data.returnCode==="001000"){
						console.log("短信验证码发送成功");
						
					}
				}
			});
			// 获取验证码60秒倒计时
			settime(val);
			
		   function settime(val) {
				if (countdown === 0) {
				    val.removeAttribute("disabled");
				    val.value="获取验证码";
				    val.innerHTML="获取验证码";
				    countdown = 60;
				} else {
				    val.setAttribute("disabled", true);
				    val.value="重新发送(" + countdown + ")";
				    val.innerHTML="重新发送(" + countdown + ")";
				    countdown--;
				}
				setTimeout(function() {
				    if (countdown!==0){
				        settime(val)
				    } else {
				        countdown=0;
				        val.value="重新发送(" + countdown + ")";
				        val.innerHTML="重新发送(" + countdown + ")";
				        val.value="获取验证码";
				        val.innerHTML="获取验证码";
				        val.removeAttribute("disabled");
				    }
				},1000)
			}
		}
};


