var areaID = "";
var areaCode = "";
var provID = "";
var areaFullSpell = "";
var areaName = "";
var ip = "";

// 点击切换城市
function clickToChange() {
	var params = $.parseJSON(base64UTF8Decode($.cookie('first-city-position')));
	
	// 更新到最近访问cookie
	saveRecentVisitCookie(params);
	
	// 更新到cookie
//	$.cookie('searchhotwords_ck_default', null, {path:"/"});
//	$.cookie('searchhotwords_ck', null, {path:"/"});
//	$.cookie('areaID', params.areaID,{ expires: 3560});
//	$.cookie('areaCode', params.areaCode,{ expires: 3560});
//	$.cookie('provID', params.provID,{ expires: 3560});
//	$.cookie('areaName', base64UTF8Encode(params.areaName),{ expires: 3560});
//	$.cookie('areaFullSpell', params.areaFullSpell,{ expires: 3560});
	// 更新到cookie
	saveDataCookie(params);
}

$(function(){
	// 选择城市
	$("#choose-cityAdress").click(function(){
		window.location.href = "city.html";
	});
	
	/**
	 * 首页定位城市
	 */
	areaCode = $.cookie('areaCode');
	areaName = base64UTF8Decode($.cookie('areaName'));
	
	if(null == areaCode) {// 在没有城市定位的情况下：默认显示城市【广州】
		//alert(21);
//		ip = result.ip;
//		$.cookie('ip', result.ip,{ expires: 3560});
		
		// 赋值全局变量，注意：数据库查询出的变量名都是小写，即result都是小写
		areaID = "440100";
		areaCode = "440100";
		provID = "440000";
		areaName = "广州";
		areaFullSpell = "guangzhou";
		// 保存到cookie
		$.cookie('areaID', areaID,{ expires: 3560});
		$.cookie('areaCode', areaCode,{ expires: 3560});
		$.cookie('provID', provID,{ expires: 3560});
		$.cookie('areaName', base64UTF8Encode(areaName),{ expires: 3560});
		// 保存域名路径到cookie
		$.cookie('areaFullSpell', areaFullSpell),{ expires: 3560};
		// 展现城市名称
		$("#jt-cityAdress").text(areaName);
	}
	
	
	// 判断地区是否为空
	function areaCodeIsNull(){
		if(areaCode== null){
		//if(areaCode=="" || areaCode== null || areaCode== 'undefined' || areaName== "" || areaName== null || areaName== 'undefined'){
			return true;
		}
		return false;
	}
	
	if(areaCodeIsNull()){
		//areaCode = $.cookie('areaCode');
		//var areacode = '440300';
		//var cityJson = {'portalType':portalType,'areacode':areaCode};
		var cityJson = {'portalType':$.cookie('portalType'),'areacode':''};
		$.ajax({
			    type: "POST",
			    url:"/getIpAndCity",
			    data:JSON.stringify(cityJson),
				contentType: "application/json",
			    dataType:"json",         
			    success: function(result){
			    	if(result == null  || result.message==null  || result.message=="error"){
			    		// 跳转至选择城市页面
			    		window.location.href = "city.html";
					}else{
						ip = result.ip;
						$.cookie('ip', result.ip,{ expires: 3560});
						
						// 赋值全局变量，注意：数据库查询出的变量名都是小写，即result都是小写
						areaID = result.areaid;
						areaCode = result.areacode;
						provID = result.provid;
						areaName = result.areaname;
						areaFullSpell = result.areafullspell;
						// 保存到cookie
						$.cookie('areaID', areaID,{ expires: 3560});
						$.cookie('areaCode', areaCode,{ expires: 3560});
						$.cookie('provID', provID,{ expires: 3560});
						$.cookie('areaName', base64UTF8Encode(areaName),{ expires: 3560});
						// 保存域名路径到cookie
						$.cookie('areaFullSpell', areaFullSpell),{ expires: 3560};
						// 展现城市名称
						$("#jt-cityAdress").text(areaName);
						
						//初始化热门搜索词到cookie
						initSearchHotWordsToCookie(null); 
					}
			    	
			    	
			    },
		        error: function(){
					console.log("get ip and city sys error");
		        }
		});
		
	} else {
		$("#jt-cityAdress").text(areaName);
		//初始化热门搜索词到cookie
		initSearchHotWordsToCookie(null); 
	}
	
	// 首次打开浏览器,判断定位。位置不一致则弹窗提示切换
	if($.cookie('first-city-position') == null || $.cookie('first-city-position') == '') {
		console.log("首次打开浏览器,判断定位");
//		alert(11);
		var cityJson = {'portalType':$.cookie('portalType'),'areacode':''};
		$.ajax({
			    type: "POST",
			    url:"/getIpAndCity",
			    data:JSON.stringify(cityJson),
				contentType: "application/json",
			    dataType:"json",         
			    success: function(result){
			    	if(result == null  || result.message==null  || result.message=="error"){
			    		// 跳转至选择城市页面
			    		//window.location.href = "city.html";
			    		console.log("get ip and city error")
					}else{
						if($("#jt-cityAdress").text() != null && $("#jt-cityAdress").text() != '' && $("#jt-cityAdress").text() != result.areaname) {
							
							var params = {};
							// 获取需要保持到cookie的数据
							params.areaID = result.areaid;
							params.areaCode = result.areacode;
							params.areaName = result.areaname;
							params.areaFullSpell = result.areafullspell;
							params.provID = result.provid;
							params.gotoCityUrl = true; //是否跳转对应城市首页(此参数为了实现热门搜索词同步设置到cooki，热门搜索词需要优先设置否则会刷新页面设置热搜词失败)
							
							//.wap的域名需要跳转对应的 zengxianlian
							var url = window.location.href;
							if(url.indexOf(".wap")>0){
								params.cityUrl = "http://"+params.areaFullSpell+".wap.wxcs.cn";
							}else{
								params.cityUrl = "http://"+params.areaFullSpell+".wxcs.cn";
							}
							
							$.cookie('first-city-position', base64UTF8Encode(JSON.stringify(params))); // 标识为已经打开过浏览器
							
							
							// 弹窗提示切换
							var btnArray = ['取消', '切换城市'];
				            mui.confirm('定位显示您现在处于：'+result.areaname+'，是否需要切换到'+result.areaname+'？', '城市切换', btnArray, function(e) {
				                if (e.index == 1) {
				                	clickToChange();
				                } else {
				                    console.log("切换城市点击取消");
				                	$.cookie('first-city-position', '1'); // 标识为已经打开过浏览器
				                }
				            });
				            
				            
						} else {
							$.cookie('first-city-position', '1'); // 标识为已经打开过浏览器

						}

					}
			    	
			    	
			    },
		        error: function(){
					console.log("get ip and city sys error");
		        }
		});
	}

	/**
	 * 初始化搜索词到cookie
	 */
	function initSearchHotWordsToCookie (inparams){
		console.log("initSearchHotWordsToCookie:"+ areaCode);
		var hotck = base64UTF8Decode($.cookie("searchhotwords_ck",{raw:true}));
		if(null==hotck || ""== hotck ){
		    var oData = {
		    	"areacode": areaCode
//		    	"isbusinesscircle": "1"
		    };
		    oData = JSON.stringify(oData);
		    $.ajax({
		        type: "post",
		        url: '/search/hotwordsreq',
		        data: oData,
		        dataType: "json",
		        contentType: "application/json",
		        success: function(data){
					if(null != data &&　data.returnCode == "001000"){
						var result = data.data;
						var searchhotwords_ck = new Array(); // 10个热搜索词
						if(result != null && result.length>0 ){
							for(var i=0; i<result.length; i++){
								searchhotwords_ck.push(result[i].word);
							}
							
							var jsonStr = "";
							for(var i=0;i<searchhotwords_ck.length;i++){
								jsonStr = jsonStr + searchhotwords_ck[i];
								if(i != searchhotwords_ck.length-1){
									jsonStr =jsonStr + ',';
								}
							}
							$.cookie("searchhotwords_ck",base64UTF8Encode(jsonStr),{ expires: 1,path:"/",raw:true});
						}
					}

		        },
		        error: function(e){
		          console.log(e);
		        }
		    })
		}
	};
	
});
