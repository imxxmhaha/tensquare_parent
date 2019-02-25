//跳转到应用
function goToWxcsApp2(param){
	var url = param.url;
	//展示模式   0：url跳转 1：iframe内嵌  	2：其他
	var display_mode = param.display_mode;
	var resName = param.resName;
	var resid = param.resid;
	var rescode = param.rescode;
	var isNeedFavour = param.isNeedFavour;
	var isNeedShare = param.isNeedShare;
	
	if(display_mode==0){  
		if(url.indexOf("?")>0){
			url = url + '&';
		}else{
			url = url + '?';
		}
		
		var sticket = param.sticket;
		var ticket = param.ticket;
		
		//四川不需要ticket
		if('/510000/'.indexOf($.cookie('provID')) > -1){
			ticket = '';
		}
		
		url += "areacode="+param.areacode;
		url += "&portaltype="+param.portaltype;
		if(param.columnid){
			url += "&columnid="+param.columnid;
		}
		url += "&resourceid="+param.resourceid;
		url += "&restype="+param.restype;
		//url += "&"+topUtil.getBackUrl();
		url += "&"+getBackUrl();
		
		//跟伟童商量暂时注释这段 zengxianlian
//		if(sticket){
//			url += "&sticket="+sticket;
//		}
		if(ticket){
			url += "&ticket="+ticket;
		}
		url += "&usessionID="+param.usessionID;
		url += "&usessionid="+param.usessionID;

//		if(loginUserId !="" && loginUserId !=null && loginUserId !="undefined"){//登录
//			url = url + "&isLogin=1"
//		}
		var loginUserId = $.cookie("he_life_user_id")==null?"":$.cookie("he_life_user_id");
//		alert("url:"+url);
//		alert("loginUserId:"+loginUserId);

		if(loginUserId !="" && loginUserId !=null && loginUserId !="undefined"){//登录
			url = url + "&isLogin=1&user_id="+loginUserId
		}
		
		url = url+ "&display_mode="+display_mode+"&redirectType=1"; //1本站跳转 0-外站
		console.log("display_mode为0，url 1:"+url);
		var timestamp = Date.parse(new Date());
		window.location.href = "/appPage/url=" + base64encode(encodeURI(url)) + "&resName=" + resName +"&resid=" + resid + "&rescode=" + rescode +"&isNeedFavour="+isNeedFavour+"&isNeedShare="+isNeedShare+"&timestamp="+timestamp;
	} else if(display_mode==1){
		//url = basePath + "/portal/pullpage/resiframe.jsp?resourceid="+param.resourceid+"&portaltype="+param.portaltype+"&restype="+param.restype;
		var params_mode = {};
		params_mode.rescode = param.resourceid;
		params_mode.portaltype = param.portaltype;
		params_mode.restype = param.restype;
		
		// 查找资源门户信息，获取url
		$.ajax({
		    type: "POST",
		    url:"/column/getResPortalInfo",
		    data:JSON.stringify(params_mode),
			contentType: "application/json",
			async: false, // 同步
		    dataType:"json",         
		    success: function(data){
		    	if(data.returnCode=="001000"){ // 成功
		    		var result = data.data;
		    		if(result != null){
		    			url = result.url;
		    			console.log("display_mode为1，url 1:"+url);
		    			
		    			url = url+ "&display_mode="+display_mode+"&redirectType=1"; //1本站跳转 0-外站
		    			console.log("display_mode为1，url 2:"+url);
//		    			console.log("display_mode为1，encode url:"+base64encode(encodeURI(url)));
		    			var timestamp = Date.parse(new Date());
		    			window.location.href = "/appPage/url=" + base64encode(encodeURI(url)) + "&resName=" + resName +"&resid=" + resid + "&rescode=" + rescode +"&isNeedFavour="+isNeedFavour+"&isNeedShare="+isNeedShare+"&timestamp="+timestamp;
					}
				} else {
					console.log("get resportal info error");
				}
		    },
	        error: function(){
				console.log("get resportal info sys error");
	        }
		});
		
	}
	
}


