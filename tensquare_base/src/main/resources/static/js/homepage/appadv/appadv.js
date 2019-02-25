var params = {};


$(function(){
	params.portalType = $.cookie("portalType"); // 门户类型
	params.provID = $.cookie("provID")||"440000"; // 省ID    如果取不到 默认取广州的
	params.areaID = $.cookie("areaID")||"440100"; // 地市ID   如果取不到 默认取广州的
	
	// 获取应用广告
	getAppadv();
})



// 广告位广告轮播
function getAppadv(){
	var data = {};
	data.prov_id = params.provID;
	data.portal_type = params.portalType;
	data.region_id = params.areaID;
	data.qry_range = 'BANNER_APP_RES';
    $.ajax({
        type: "POST",
        url: '/appadv/getAppadv',
        data:JSON.stringify(data),
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function(data){
        	console.log("获取应用广告成功");
        	var result = data.data.BANNER_APP_RES;
        	console.log(result);
        	// 遍历应用广告
        	var appadv_info="";
        	var size = (result.length>6?6:result.length)
        	for(var i=0; i<size; i++){
        		var url = result[i].info_url==null?"#":result[i].info_url;
        		var info_title = result[i].info_title;
        		var logo_file = result[i].logo_file;
//        		var index = (i%3)+1;
        		appadv_info += '<div class="swiper-slide" onClick="jumpToUrl(this)">'+
        							'<a href="#" need_login="'+result[i].need_login+'" info_id="'+result[i].info_id+'"  url="'+ url +'" restype=5 info_title="'+result[i].info_title+'" '+
        							'>'+
//        							'class="banner'+index+'">'+
//        							'<span>'+info_title+'</span>' +
        							'<img src="'+logo_file+'">'+
        							'</a>'+
        					   '</div>'
        		
        	}
        	$("#appadv-swiper-wrapper").append(appadv_info);
//        <div class="swiper-wrapper" id="appadv-swiper-wrapper">
//            <div class="swiper-slide"><a href="#" class="banner2"><span>景点解说>></span><p>旅游中文语音讲解</p></a></div>
//        </div>
        }
    })
}

/**
 * 点击跳转
 * @param ele
 */
function jumpToUrl(ele){
	
	var url = $(ele).find("a").attr("url");
	var info_id = $(ele).find("a").attr("info_id")||'';
	var need_login = $(ele).find("a").attr("need_login")||'';
	var resName = $(ele).find("a").attr("info_title")||'';
	
	
	// 弹窗提示切换
	if(need_login==="1"){
		$.ajax({
		    type: "GET",
		    url:"/login/isLogin",
		    async: false, // 同步
		    dataType:"text",         
		    success: function(data){
		    	if('0' == data) {//未登录
		    		// 后续要换成弹窗
		    		var btnArray = ['取消', '确定'];
		    	    mui.confirm('您尚未登录，立即登录', '', btnArray, function(e) {
		    	        if (e.index == 1) {
		    	        	window.location.href= "/login/toLogin";
		    	        } else {
		    	        	return;
		    	        }
		    	    });
		    	}else{  //已登录
		    		////////////////跳转到详情页面/////////////////////////	
		    		var param = {
		    			url: url,
		    			areacode: $.cookie('areaCode'),
		    			portaltype: $.cookie('portalType'),
		    			resName:resName,
		    			display_mode:0,
		    			isNeedFavour:0,
		    			isNeedShare:0,
		    			isNeedTicketInfo:1
		    		};
		    		//alert(JSON.stringify(param));
		    		goToWxcsApp(param);
		    	}
		    	return;
		    }
		});
	}else{
		
	    $.ajax({
	        type: 'get',
	        url: '/appadv/adv?resName='+resName+'&resourceId='+info_id+'&infoUrl='+url,
//	        dataType: "json",
//	        contentType: "application/json;charset=UTF-8",
	        success: function(data){
	        	console.log(data);
	        	var arr = data.split("&")
	        	var timestamp = Date.parse(new Date());
	        	window.location.href = "/appPage/url="+arr[0]+"&"+arr[1]+"&timestamp="+timestamp;
	        }
	    })
		
		
		
//		
//		var timestamp = Date.parse(new Date());
//		window.location.href = "/appPage/url=" + base64encode(encodeURI(url)) + "&resName=" + resName +"&resid=" + info_id +"&isNeedShare=0&isNeedFavour=0&isNeedTicketInfo=0"+ "&timestamp="+timestamp;
////		var wxcsurl =  "/appadv/adv?resName="+resName+"&resourceId="+info_id+"&infoUrl="+base64encode(url);
////		window.location.href = wxcsurl;
//		return;
	}
}

