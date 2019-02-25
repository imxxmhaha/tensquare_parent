/**
 * Declare an object to which we can add real functions.
 */
var portalType = "0";
var path = "http://" + window.location.host;
var basePath = "http://" + window.location.host;

$(function(){

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
		// path = "http://wap.wxcs.cn";
        // path = "http://localhost:7080";
        // path = "http://" + window.location.host;
	} else {
		// path = "http://www.wxcs.cn";
        // path = "http://localhost:7080";
        // path = "http://" + window.location.host;
	}
	
	
	var url = window.location.href; //现在的URL zengxianlian
	if("1"==portalType&&url.indexOf("http://www.wxcs")>-1){
		var newUrl = url.replace("http://www","http://wap");
		window.location.href = newUrl;
	}
	var startIndex = url.indexOf(".wxcs");

	if(startIndex > 0 && typeof(fromGetLifeHead) == "undefined"){ // 地区域名输入 但是对拉头拉尾进行过滤
		//根据键盘获取程序相关信息
		var spec = url.substring(0,startIndex);
		if(spec.indexOf('http://') == 0){
			spec = spec.substr(7, spec.length); // 去除http://
		}
		if(spec.indexOf('https://') == 0){
			spec = spec.substr(8, spec.length); // 去除https://
		}
		
		//再次过滤.wap域名 zengxianlian
		var startwapIndex = spec.indexOf(".wap");
		if(startwapIndex > 0){
			spec = spec.substr(0, startwapIndex);
			basePath =  "http://"+spec+".wap.wxcs.cn";
		}
		
		//if( spec != "www" && spec != "zte" && spec != "ac"){
		if( spec != "www" && spec != "zte" && spec != "ac" && spec != "wap"){
			var wxcs_host = '.wxcs.cn';
			if("1"==portalType&&url.indexOf(".wap")<0&&url.indexOf(wxcs_host)>0){
				var i = url.indexOf(wxcs_host);
				var subfix = url.substr(i + wxcs_host.length, url.length);
				window.location.href = "http://"+spec+".wap.wxcs.cn" + subfix;
			}
		}
	}

})

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



