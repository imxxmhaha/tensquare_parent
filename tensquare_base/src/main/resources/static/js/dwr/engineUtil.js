/**
 * Declare an object to which we can add real functions.
 */
var portalType = "0";
var path = "";
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
		path = "http://wap.wxcs.cn";
	} else {
		path = "http://www.wxcs.cn";
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

if (dwr == null)
	var dwr = {};
if (dwr.engine == null)
	dwr.engine = {};
if (DWREngine == null)
	var DWREngine = dwr.engine;
if (Service == null)
	var Service = {};
if (FileService == null)
	var FileService = {};
/**
 * DWR路径，同步加载路径
 */
Service._path = path + '/dwr';

/**
 * 异步 actionId : 接口名 methodName ： 接口里的方法 parameters ：入参 callback ： 执行完方法，回调函数
 */
Service.asExcute = function(actionId, methodName, parameters, callback) {
	// loadingImage();
	var params = createDwrParams(actionId, methodName, parameters, callback);
	DWREngine._execute(Service._path, 'Service', 'excute', params);
}

FileService.excute = function(actionId, methodName, param, is, callback) {
	param.portalType = portalType;
	param.user_id = $.cookie("he_life_user_id")==null?"":$.cookie("he_life_user_id");
	var params = [ actionId, methodName,[param], is, {
		callback : function(result) {
			$('div[id="pop_shade"]').remove();
			if (callback != null) {
				callback(result);
			}
		},
		exceptionHandler : function() {

		}
	} ];
	DWREngine._execute(Service._path, 'FileService', 'excute', params);
}

/**
 * 同步
 */
Service.excute = function(actionId, methodName, parameters, callback) {
	DWREngine.setAsync(false);
	var params = createDwrParams(actionId, methodName, parameters, callback);
	DWREngine._execute(Service._path, 'Service', 'excute', params);
	DWREngine.setAsync(true);
}

/**
 * 异步时候图片加载
 */
function loadingImage() {
	var html = '<div id="pop_shade" style="width: 100%; height: 100%; position: fixed; z-index: 1988; top: 0px; left: 0px; overflow: hidden;">'
			+ '<div style="height: 100%; opacity: 0.7; background: rgb(0, 0, 0);">'
			+ '<img style="position: fixed; width:600px; left:50%; top:15%; margin-left:-300px;" src='
			+ path + '/static/dwr/loading.gif"></div></div>';
	$('body').append(html);
}

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
