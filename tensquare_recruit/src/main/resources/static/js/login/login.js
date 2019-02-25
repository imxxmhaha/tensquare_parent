var GlobalVeriable = {};
GlobalVeriable.loginIdType = '1';

var account_type_tag = 0; // 第三方认证账号类型    0、其它 1、邮箱 2、QQ 3、微博 4、支付宝 5、微信
var keys;
var aeskey;


function getKeys() {
	$.jCryption.getKeys('/login/getPubKey', function(receivedKeys) {
		keys = receivedKeys;
		aeskey = receivedKeys.aeskey;
		//alert(aeskey);
	});
}   

function getParam(name) {
	var value = location.search.match(new RegExp(
			"[?&]" + name + "=([^&]*)(&?)", "i"));
	value = value ? decodeURIComponent(value[1]) : '100';
	return value;
}

// 获取表单标签的值value
function getValue(element) {
	var value = $(element).val();
	return value;
}

// 修改表单标签element的值 为value
function setValue(element, value) {
	$(element).val(value);
}

//用户管理中心  校验是否注册过
function checkInUMC(pwdType) {
	var me = this;
	if(pwdType == '1'){
		var loginID = $("#account").val();
		GlobalVeriable.loginIdType = '1'  //loginIdType = 1  手机号登录
    	var txzReg = /^[0-9]{5,10}$/;
    	if(txzReg.test(loginID)){
    		GlobalVeriable.loginIdType = '3';  //loginIdType = 3  通行证登录
    	}
		
	}else if(pwdType == '2'){
		var loginID = $("#phone").val();
	}
	loginID=encrypt(loginID);
	var request = {};
	var data = {
			loginID:loginID,
			portalType:portalType,
			loginIdType:GlobalVeriable.loginIdType
	}
	var umcResult = false;
	$.ajax({
		type : "post",
		url : '/login/checkInUMC',
		data : JSON.stringify(data),
		dataType : "json",
		async: false, // 同步
		contentType : "application/json;charset=UTF-8",
		success : function(data) {
			var result = data.data;
			/*
			 * return 0，表示已经存在
			 */
//			console.log(result.flag);
			if(data.data == null){
				umcResult =  false;
			}
			if (result.flag == '1') {// 用户未注册，请先注册后登录
				// $('#loginIDTips').html("该账号还未注册");
				errorMsg("账户名与密码不匹配，请重新输入");
				umcResult =  false;
			} else if (result.flag == '2') {
				errorMsg("当前IP请求过于频繁，请稍后重试");
				umcResult =  false;
			} else if (result.flag == '3') {
				errorMsg("密码错误次数已超过限制，请半个小时后再次登录");
				umcResult =  false;
			} else {
				umcResult =  true;
			}
		},
		error : function(e) {
			// alert("错误了");
		}
	});
	
	
	return umcResult;
}



//登录密码校验  pwdType =1 静态密码 ; pwdType=2  动态密码
function checkPWD (pwdType) { //gongs:2013-3-15 校验 pwd
	var pwd = $("#passwd").val();
	
	if(pwdType == '1'){
	    if (pwd == null || pwd == "") {
//	    	alert("请输入登录密码");
	    	errorMsg("请输入登录密码");
	        return false;
	    }
	    //$('#pwdCheck').attr("class", "jt-login-box msg_error");
	    if (pwd.length < 8 || pwd.length > 16) {
//	        alert("密码为8-20位字符");
	        errorMsg("密码为8-16位字符");
	        return false;
	    }

	    if (pwd.indexOf(' ') >= 0) {
//	        alert("空格不可输入");
	    	errorMsg("空格不可输入");
	        return false;
	    }
	}
	
	if(pwdType == '2'){
		//校验手机号是否是移动手机号码
		//手机号码验证
		var phone = $.trim($("#phone").val());
		if(!wxcsCheckPhone(phone)){
			errorMsg("请输入移动手机号");
	        return false;
		}
		
		pwd =  getValue("#getDynamicPWD");
	    if (pwd == null || pwd == "") {
//	    	alert("请输入登录密码");
	    	errorMsg("请输入手机验证码");
	        return false;
	    }
	    //$('#pwdCheck').attr("class", "jt-login-box msg_error");
	    if (pwd.length != 6) {
//	        alert("密码为8-20位字符");
	        errorMsg("验证码必须为6位");
	        return false;
	    }

	    if (pwd.indexOf(' ') >= 0) {
//	        alert("空格不可输入");
	    	errorMsg("空格不可输入");
	        return false;
	    }
	    
	    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
	    if(reg.test(pwd)){
	    	errorMsg("验证码不能包含中文");
	        return false;
	    }
	}
	
	
    return true;
}

//错误提示3秒后消失
function errorMsg(msg) {
	$("#errorMsg").text(msg);
	$('.pop-error').show().delay (2000).fadeOut();
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

function toLogin(){
	var me = this;
	var phoneNO = "";
	// 密码类型 pwdType = 1  静态密码登录;2动态密码
	var pwdType = getValue("#passwdtype");
	
	if(pwdType == '3'){   // 一键登录
		var cmccPhone = getValue("#cmccPhone")
		var cmccParams = {};
		cmccPhone=encrypt(cmccPhone);
		var areaCode =  $.cookie('areaCode') || "440000";
		
		cmccParams.pwdType=pwdType;
		cmccParams.cmccPhone = cmccPhone;
		cmccParams.areaCode = areaCode;
		$.ajax({
			type : "post",
			url : '/login/loginPost',
			data : JSON.stringify(cmccParams),
 			dataType : "json",
			contentType : "application/json;charset=UTF-8",
			success : function(data) {
				var result = data.data;
				toLoginSuccess(result,cmccParams.pwdType);
			},
			error : function(e) {
				// alert("错误了");
			}
		});
		
	}else{
		if(pwdType == '1'){
			 phoneNO = $.trim($("#account").val());
		    if (phoneNO == null || phoneNO == "") {
		    	errorMsg("请输入正确的和通行证、手机号码");
		        return ;
		    }
		    //验证验证码是否已经填写
		    if($('#VerificationCodeDiv').css('display')=='block'){
		    	if($("#randomCode").val()==null||$("#randomCode").val()==''||$("#randomCode").val().length!=6){
		    		errorMsg("请输入正确验证码！");
		    		return ;
		    	}
		    }
		}else if(pwdType == '2'){
			phoneNO = $.trim($("#phone").val());
		    if (phoneNO == null || phoneNO == "") {
		    	errorMsg("请输入正确的手机号码");
		        return ;
		    }
		}
		
	    if(/[\s]/.test(phoneNO)){//空格
//			alert("请输入正确的和通行证、手机号码或邮箱");
	    	errorMsg("请输入正确的和通行证、手机号码");
			return ;
		}
	    var str = /[\n\r\'\"\\|;$+`~%!#^=''?~！#￥ 　……&——‘”“'？*()（），,。、《》<>：；|/\\{}｛｝【】\[\]]/;
	    if(str.test(phoneNO)){//您输入的帐号不能包含违法内容或特殊字符
	    	errorMsg("请输入正确的和通行证、手机号码");
			return ;
		}
	     var flag = checkInUMC(pwdType);
		 if(!flag){//所用信息填写完成之后进行验证是否注册
			 return;
		 }

	    
	    var password="";
	    // 登录类型
	    if(pwdType == '1' && checkPWD(pwdType)){//静态密码
	    	 password = getValue("#passwd");
	    	var secretPs=me.getSecretPassword(password);
	        me.loginPost(phoneNO,secretPs,pwdType,GlobalVeriable.loginIdType,'1');
	    }else if(pwdType == '2' && checkPWD(pwdType)){//动态密码

	    	 password =  getValue("#getDynamicPWD");
	    	if (isDynamicPwd(password)) {
	       	 me.loginPost(phoneNO,password,pwdType,GlobalVeriable.loginIdType,'0');
	       }
	    }
	}
	

}


function getSecretPassword(password){
	var shaps=hex_sha1("fetion.com.cn:"+password);
	//检验加密后的字符串长度是否满足40位
	if(shaps.length<40){
		var s=40-shaps.length;
		var temp="";
		for(var c=0;c<s;c++){
			temp+="0";
		}
		shaps=temp+shaps;
	}
	var aesps=aesutil.encrypt(password,aeskey);
	var cmbps=shaps+"#"+aesps;
	return cmbps;
	
}


function isDynamicPwd(pwd) {
    //动态密码数字校验	
    var isDyn = true;
    if ($("#passwdtype").val() == '2') {
        var temp = "1234567890";
        for (i = 0; i < pwd.length; i++) {
            if (temp.indexOf(pwd.substring(i, i + 1)) < 0) {
                isDyn = false;
            }
        }
        //动态密码长度校验
        if (pwd.length != 6) {
            isDyn = false;
            $("#pwdTips").html('动态密码为6位字符');
        }
    } else {
        isDyn = false;
    }
    return isDyn;
}

function loginPost(loginID,password,pwdType,loginIDType,version){
	var me = this;
	//密码加密
	$.jCryption.encrypt(password, keys, function(encryptedPasswd) {   
		console.log(keys);
		password = encryptedPasswd;
		me.loginAfterEncrypt(loginID,password,pwdType,loginIDType,version);
    });
}


function loginAfterEncrypt(loginID,password,pwdType,loginIDType,version){
	var me = this;
	var request = {};
	request.frontsha=version;
	request.loginID = loginID;
	request.password = password;
	request.pwdType = pwdType;
	request.loginIDType = loginIDType;
	request.portalType = portalType;
//	request.backUrl = getUrlParam("backUrl");
//	request.ip = ip;
	var lbackUrl = me.getUrlParam("backUrl")||'';
	var loginAreacode = "";
	if(lbackUrl!=''){
		//增加校验白名单 ---zengxianlian
		request.lbackUrl = lbackUrl;
		loginAreacode = me.getBase64UrlParam(me.getUrlParam("backUrl"),"areacode") || me.getBase64UrlParam(me.getUrlParam("backUrl"),"areaCode");
		if(loginAreacode == "" || loginAreacode == "undefined"){
			loginAreacode = me.getBase64UrlParam(me.getUrlParam("backUrl"),"areaID") ||'';
		}
	}
	request.areaCode = loginAreacode || $.cookie('areaCode');
	var ck_id = $.cookie("ck_id")||'';
	if(!ck_id || ck_id==""){
		if(window.localStorage){  //增加localStorage  设置ls_id
			ck_id = window.localStorage.getItem("ls_id")||'';
		}
	}
	request.ck_id = ck_id;
	request.sc_id = $.cookie("sc_id");
	request.verify_code = $("#randomCode").val();//GlobalVeriable.verifyCode;
	request.verifyCorrectCode = verifyCorrectCode;
	// 发请求前将按钮屏蔽，防止重复提交
	
	//登录前处理部分用户采集数据
//	$.cookie('he_life_account', loginID,{ expires: 3560});
	if(window.localStorage){  //增加localStorage  
//		window.localStorage.setItem("he_life_account",loginID); 
	}
	if(account_type_tag==1){
		$.cookie('account_type_tag',account_type_tag);
		$.cookie('tc_account',loginID);
	}
	
	//登录名加密
	$.jCryption.encrypt(loginID, keys, function(encryptedLoginID) {
		request.loginID = encryptedLoginID;
		$.ajax({
			type : "post",
			url : '/login/loginPost',
			data : JSON.stringify(request),
 			dataType : "json",
			contentType : "application/json;charset=UTF-8",
			success : function(data) {
				var result = data.data;
				toLoginSuccess(result,request.pwdType);
			},
			error : function(e) {
				// alert("错误了");
			}
		});
	});
}


//获取url中的参数
function getUrlParam(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}


function toLoginSuccess(result,pwdType){
	var dataobj1=new Date();
	//往cookie写入登录需要采集的信息，后续会删除
	$.cookie('TGC-Ticket', result.tgcticket); // 这个只是客户端需要用到，用于wap应用内登录返回后，客户端的自动登录 joshui
	$.cookie('tticket',result.tticket);
	$.cookie('flag', "1"); // 这个只是客户端需要用到，用于wap应用内登录返回后，客户端的自动登录 joshui
	
	var keyParam = '';
	//登录成功
	if(result.login_flag=='10086'){
		console.log("登录成功"); 
		var nickName=result.nick_name;
		if(nickName==''  || nickName==null || nickName==undefined){//用户信息中没有昵称
			nickName=$.trim($("#account").val());
		}
		$.cookie('nickName',nickName);
	
		var isUpgradeType = result.isUpgradeType;
		$.cookie('user_code', result.user_code);
		$.cookie('he_life_user_id', result.user_id);
		$.cookie('he_life_heart_beat_time', 0);
		$.cookie('isUpgradeType', isUpgradeType);
		//$.cookie('isSysn', isSysn);
		$.cookie('usessionId', result.usessionid);
		ip = result.ip;
		$.cookie('ip', ip,{ expires: 3560});
		$.cookie('he_life_mobile_num', result.phone,{ expires: 3560});
		$.cookie('pass_id', result.passId,{ expires: 3560});
		if(window.localStorage){  //增加localStorage  
			window.localStorage.setItem("he_life_mobile_num",result.phone); 
		}
		$.cookie('he_life_region_id',result.region_id);
		$.cookie('login_region_id',$.cookie('areaID'),{ expires: 3560});
		
		
		keyParam += $.cookie('user_code') + '_';
		keyParam += $.cookie('he_life_user_id') + '_';
//		keyParam += $.cookie('he_life_account') + '_';
		keyParam += $.cookie('he_life_mobile_num') + '_';
		keyParam += $.cookie('t_ticket') + '_';
		keyParam += $.cookie('he_life_region_id');
		
		$.cookie('last_login_info', keyParam);//记录上一次登录
		var now = (new Date()).getTime();
		$.cookie('last_login_info_time', now);
		
		var backUrl = result.lbackUrl;
		// 
		if(backUrl!=null&&backUrl!=''&&backUrl!='null'){
			var sticket = result.sticket;
			var usessionid = result.usessionid;
			var tticket = result.tticket;
			//增加backUrl是否带?xx=aa参数 by zengxianlian
			var url = base64decode(backUrl);
//			//防止用户直接修改backUrl参数，先判断是否有“无线城市”几个字
//			url = decodeURI(url);
//			if (url.indexOf('无线城市')>-1) {
//				url = url.substring(4);
//			} else {
//				url = 'http://www.wxcs.cn/portal/index.jsp';
//			}
			var timestamp = Date.parse(new Date());
			if(url.indexOf("?")>0){
				// 删除usession 和usessionID，重新添加
				url = delQueStr(url, "usessionid");
				url = delQueStr(url, "usessionID");
				//暂时屏蔽sticket返回 zengxianlian
				//url = url + "&usessionID="+usessionid+ "&usessionid="+usessionid+"&sticket="+sticket+"&ticket="+tticket;
				
				url = url + "&usessionID="+usessionid+ "&usessionid="+usessionid+"&ticket="+tticket+"&timestamp="+timestamp;
			}else{
				//暂时屏蔽sticket返回 zengxianlian
				//url = base64decode(backUrl) + "?usessionID="+usessionid+ "&usessionid="+usessionid+"&sticket="+sticket+"&ticket="+tticket;
				url = url + "?usessionID="+usessionid+ "&usessionid="+usessionid+"&ticket="+tticket+"&timestamp="+timestamp;
			}
			var loginurl=domainUrlFilter(url);
			
			//增加校验白名单 ---zengxianlian
			var isInWhite = result.isInWhite;
			if("1"==isInWhite){
				window.location.href=loginurl;
			}else{//非白名单
				window.location.href = "/common/unwhite.html";
			}
		}else{
			window.location.href = "/index.html";
		}
	}else if(result.login_flag=='9001'){
		if(pwdType=='1'){
			errorMsg("密码累计错误3次，用户被锁定，半小时后登录");
		}else{
			errorMsg("短信验证码累计错误3次，用户被锁定，半小时后登录");
		}
	}else if(result.login_flag=='9004'){
		art.dialog({lock: true,title:'温馨提示',content:"系统繁忙，请稍后重试",ok:function(){}});
		errorMsg("系统繁忙，请稍后重试");
		if(pwdType=='1'){
			$('#VerificationCodeDiv').css('display','block');
			getDynamicPwdRandomCode();
		}
	}else if(result.login_flag=='9006'){
		errorMsg("动态密码错误");
	}else if(result.login_flag=='9009'){
		errorMsg("动态密码超时");
	}else if(result.login_flag=='9011'){
		if(pwdType=='1'){
			errorMsg("密码已输入错误2次，第3次输入错误后账号将被锁定");
			$('#VerificationCodeDiv').css('display','block');
			getDynamicPwdRandomCode();
		}else{
			errorMsg("验证码输入错误2次，第3次输入错误后账号将被锁定");
		}
	}else if(result.login_flag=='9012'){
		if(pwdType=='1'){
			errorMsg("密码累计错误3次，用户被锁定，半小时后登录");
		}else{
			errorMsg("验证码累计错误3次，用户被锁定，半小时后登录");
		}
	}else if(result.login_flag=='9013'){
		errorMsg("验证码错误");
		if(pwdType=='1'){
			$('#VerificationCodeDiv').css('display','block');
			getDynamicPwdRandomCode();
		}
	}else if(result.login_flag=='2'){
        errorMsg("账户名与密码不匹配，请重新输入");
		if(pwdType=='1'){
			$('#VerificationCodeDiv').css('display','block');
			getDynamicPwdRandomCode();
		}
	}else if(result.login_flag=='1'){
		errorMsg("用户不存在");
		if(pwdType=='1'){
			$('#VerificationCodeDiv').css('display','block');
			getDynamicPwdRandomCode();
		}
	}else{
		errorMsg("系统繁忙，请稍后重试");
		if(pwdType=='1'){
			$('#VerificationCodeDiv').css('display','block');
			getDynamicPwdRandomCode();
		}
	}
}

//获取base64加密Url中的参数
function getBase64UrlParam(base64url,name){
	var params = base64decode(base64url);
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = params.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

function domainUrlFilter(url){
	var href = window.location.href;
	var domain = 'wxcs.cn';
	if(href.indexOf(domain) > -1){
		if(url.indexOf(domain) == -1){
			//throw new Error('禁止访问: '+url);
			//return 'www.wxcs.cn';
			return url;
		}
	}
	return url;
}

// 登出
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
			console.log("登录成功,清楚用户相关的cookie");
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


function delCookie(){
	$.cookie('nickName',null);
	$.cookie('he_life_user_id', null);
	$.cookie('he_life_account', null);	//  当前登录用户名
	$.cookie('he_life_heart_beat_time', null);
	$.cookie('isUpgradeType', null);
	$.cookie('isSysn', null);
}

function toModifyPwd(){
	$.ajax({
		type : "post",
		url : '/login/forgetPwd',
		// data : JSON.stringify(data),
//		dataType : "json",
//		contentType : "application/json;charset=UTF-8",
		success : function(data) {
			console.log("跳转成功");
		}
	});
}

var verifyCorrectCode="";
//获取图片验证码
function getDynamicPwdRandomCode(){
	var key = Math.floor((Math.random() * 100+1)); //[1,100)
	var img_prefix = "http://"+window.location.host;
    var arr = ['3', '4', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'T', 'U', 'V', 'W', 'X', 'Y'];
    var verifyCode = "";
    for (var i = 0; i < 6; i++) {
        var pos = Math.round(Math.random() * (arr.length-1));
        verifyCode += arr[pos];
    }
    sum ="";
    for (var i = 0; i < 3; i++) {
        var pos = Math.round(Math.random() * (arr.length-1));
        sum += arr[pos];
    }
    sum+= verifyCode;
    for (var i = 0; i < 3; i++) {
        var pos = Math.round(Math.random() * (arr.length-1));
        sum += arr[pos];
    }
    verifyCorrectCode=sum;
    var loginID=$("#account").val();
    loginID=encrypt(loginID);
    var src=img_prefix + "/servlet/ImageServlet/"+base64encode(loginID)+"/"+verifyCorrectCode+
    		"?verifyCorrectCode="+verifyCorrectCode+"&loginID="+encodeURIComponent(loginID)+"&isUserAes=1";
//    var src=img_prefix + "/servlet/ImageServlet/"+(key+89)+"?verifyCorrectCode="+verifyCorrectCode+"&loginID="+loginID+"&isUserAes=1";
    $('#code').attr('src', src);
//	GlobalVeriable.verifyCode=verifyCode;
//	setTimeout(function(){
//		GlobalVeriable.verifyCode = '-1';
//	},120000);
}

//删除参数值
function delQueStr(url, ref) {
    var str = "";

    if (url.indexOf('?') != -1)
        str = url.substr(url.indexOf('?') + 1);
    else
        return url;
    var arr = "";
    var returnurl = "";
    var setparam = "";
    if (str.indexOf('&') != -1) {
        arr = str.split('&');
        for (i in arr) {
            if (arr[i].split('=')[0] != ref) {
                returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
            }
        }
        return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
    }
    else {
        arr = str.split('=');
        if (arr[0] == ref)
            return url.substr(0, url.indexOf('?'));
        else
            return url;
    }
}


