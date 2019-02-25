/**
 * Declare an object to which we can add real functions.
 */
var portalType = "0";
path = "http://" + window.location.host;
function initEngineUtil() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid
			|| bIsCE || bIsWM) {
		portalType = "1"; // wap
	} else {
		portalType = "0"; // www
	}
	if("2" == getUrlParam("portaltype")){
		portalType = "2"; // client
	}
	$.cookie('portalType', portalType);
	if (portalType == "1") {
		// path = "http://www.wxcs.cn";
        // path = "http://localhost:7080";
        // path = "http://" + window.location.host;
	} else {
		// path = "http://www.wxcs.cn";
        // path = "http://localhost:7080";
        // path = "http://" + window.location.host;
	}
}


function getUrlParam(name){
	try{
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r != null){
			return unescape(r[2]); 
		} 
	}catch(e){

	}
	return null; //返回参数值
}

initEngineUtil();


/**
 * 解析参数
 */
function createDwrParams(actionId, methodName, parameters, callback) {
	if(parameters.length !=0 ){
		obj = parameters[0];
		obj.portalType = portalType;
		obj.user_id = $.cookie("he_life_user_id")==null?"":$.cookie("he_life_user_id");
	}
	var params = [ actionId, methodName, parameters, {
		callback : function(result) {
			$('div[id="pop_shade"]').remove();
			if (callback != null) {
				callback(result);
			}
		},
		exceptionHandler : function() {

		}
	} ];
	return params;
}
