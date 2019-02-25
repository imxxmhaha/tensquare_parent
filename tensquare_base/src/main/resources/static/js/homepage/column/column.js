
// 栏目下应用展现
function showColRes(params){
	// 栏目查询
	$.ajax({
	    type: "POST",
	    url:"/column/getColRes",
	    data:JSON.stringify(params),
		contentType: "application/json",
	    dataType:"json",         
	    success: function(data){
	    	if(data.returnCode=="001000"){ // 成功
	    		var result = data.data;
	    		if(result != null){
					for(var i=0; i<result.length; i++){
						var file_url = "";
						if(i%2==0){ // 偶数
							file_url = result[i].green_file
						}else{
							file_url = result[i].red_file;
						}
						if(file_url == "" || file_url=="undefined" || file_url == null){
							file_url = result[i].smallogo_file;
						}
						
						var res_name = result[i].res_name;
						
						var a_element = $("<a href='javascript:;' url='/App/appPage?resCode="+result[i].res_code+"' display_mode='"+result[i].display_mode+"' rescode='"+result[i].res_code+"' restype='1' columnid='"+params.column_id+"' access_right='"+result[i].access_right+"' resid='"+result[i].res_id+"'>" +
								(result[i].showNewFlag=='1'?"<span class='new-span'></span>":"") +
									"<img src='"+file_url+"'/>" +
									"<p>"+res_name+"</p>" +
								"</a>");
						
						$("#high-quality-app").append(a_element);
						
						// 点击应用
						$(a_element).click(function(){
							var url = $(this).attr("url");
							var display_mode = $(this).attr("display_mode");
							var rescode = $(this).attr("rescode");
							var access_right= $(this).attr("access_right");//访问权限
							var resName = $(this).find("p").text();
							var resid = $(this).attr("resid");

							
							if(access_right == 1){ //需要登录才能访问
								$.ajax({
								    type: "GET",
								    url:"/login/isLogin",
//								    data:JSON.stringify(cityJson),
//									contentType: "application/json",
//								    dataType:"json",  
								    async: false, // 同步
								    dataType:"text",         
								    success: function(data){
								    	if('0' == data) {//未登录
								    		// 弹窗提示切换
											var btnArray = ['取消', '确定'];
								            mui.confirm('您尚未登录，立即登录', '', btnArray, function(e) {
								                if (e.index == 1) {
								                	window.location.href= "/login/toLogin";
								                } else {
								                	return;
								                }
								            });
								            
								    	} else { // 已登录，获取sticket
											//=====================================================================//
								    		////////////////跳转到详情页面/////////////////////////	
											var param = {
												url: url,
												areacode: $.cookie('areaCode'),
												portaltype: $.cookie('portalType'),
												columnid: params.column_id,
												resourceid: rescode,
												restype: 1,
												display_mode:display_mode,
												resName:resName,
												resid:resid,
												isNeedTicketInfo:"1",
												rescode:rescode
											};
											//alert(JSON.stringify(param));
											goToWxcsApp(param);
											//=====================================================================//
								    	}
								    	//return;
								    }
								});
							} else { // 不需要登录
								////////////////跳转到详情页面/////////////////////////	
								var param = {
									url: url,
									areacode: $.cookie('areaCode'),
									portaltype: $.cookie('portalType'),
									columnid: params.column_id,
									resourceid: rescode,
									restype: 1,
									display_mode:display_mode,
									resName:resName,
									resid:resid,
									rescode:rescode
								};
//								alert(JSON.stringify(param));
								goToWxcsApp(param);
							}
							
							
						});
						
					}
					
				}
			} else {
				console.log("get column res error");
			}
	    },
        error: function(){
			console.log("get column res sys error");
        }
	});
	
	
	
}

$(function(){
	
	if($.cookie('areaID') != null && $.cookie('areaID') != '') { // 已定过位
		var www_page_index = "10";	// 定义常量
		var wap_page_index = "20"; // 定义常量
		var portal_type_www = "0"; // 定义常量
		var portal_type_wap = "1"; // 定义常量 
		
		var params = {};
		params.portalType = $.cookie('portalType'); //门户类型
		params.provID = $.cookie('provID'); // 省ID
		params.areaID = $.cookie('areaID'); // 地市ID
		if ($.cookie('portalType') == portal_type_www) {
			params.column_page = www_page_index; // web首页
		} else if ($.cookie('portalType') == portal_type_wap) {
			params.column_page = wap_page_index; // wap首页
		}
		
		// 栏目查询
		$.ajax({
		    type: "POST",
		    url:"/column/getColumnStateByPage",
		    data:JSON.stringify(params),
			contentType: "application/json",
		    dataType:"json",         
		    success: function(data){
		    	if(data.returnCode=="001000"){ // 成功
		    		var result = data.data;
		    		if(result != null){
						for(var i=0; i<result.length; i++){
							if(result[i].column_name == "精品应用"){ 
								params.column_id = result[i].column_id;
								showColRes(params); //加载栏目下应用
								
							}else if(result[i].column_name == "频道"){
								params.column_id = result[i].column_id;
								getSecondColumn(params);// 获取频道下二级栏目
							}
						}
					}
				} else {
					console.log("get coloumn error");
				}
		    },
	        error: function(){
				console.log("get coloumn sys error");
	        }
	});
	}
});

//获取频道下二级栏目
function getSecondColumn(params){
	
	$.ajax({
	    type: "POST",
	    url:"/column/getScondColumn",
	    data:JSON.stringify(params),
		contentType: "application/json",
	    dataType:"json",         
	    success: function(data){
	    	if(data.returnCode=="001000"){ // 成功
	    		var result = data.data;
	    		
	    		if(result != null){
					var first_scondcolumn = 1; // 是否是第一个二级栏目，默认是
					for(var i=0; i<result.length; i++){
						var count = result[i].count;
						if(count > 0){
							var a_element = $("<a "+(first_scondcolumn == 1?"class='active'":"")+">"+result[i].column_name+"<span></span></a>");
							first_scondcolumn = 0;
							
							$("#scondColumnDiv").append(a_element);
							
							// 点击二级栏目，切换下划线
							$(a_element).click(function(){
								$(".nav a").removeClass("active");
					            $(this).addClass("active");
							});
							
							var channel_params = {};
							channel_params.portalType = $.cookie('portalType'); //门户类型
							channel_params.provID = $.cookie('provID'); // 省ID
							channel_params.areaID = $.cookie('areaID'); // 地市ID
							channel_params.column_id = result[i].column_id;
							channel_params.column_name = result[i].column_name;
							showChannelColRes(channel_params); //获取频道二级栏目下的应用
						}
					}
				}
	    		
			} else {
				console.log("get second column error");
			}
	    },
        error: function(){
        	console.log("get second column sys error");
        }
	});
	
	
	
}


var index = -1; // 二级栏目计数器
//获取频道二级栏目下的应用
function showChannelColRes(params){
	index = index + 1;
	var channel_ele =  $("<div class='recommend-contain' id='"+params.column_id+"'>"+
						    "<div class='top'>"+
						        "<span></span>"+
						        "<p>"+params.column_name+"</p>"+
						        "<span></span>"+
						    "</div>"+
						    "<div class='middle'>"+
						        "<div class='content' id='channelColResDiv_"+params.column_id+"'>"+
						            
						        "</div>"+
						    "</div>"+
						    "<div class='bottom1' id='moreChannelColResDiv_"+params.column_id+"'>"+
						        
						    "</div>"+
						"</div>");
	
	$("#scondColumnContainer").append(channel_ele);

	var showNum = 8; // 展开个数
	$.ajax({
	    type: "POST",
	    url:"/column/getChannelColRes",
	    data:JSON.stringify(params),
		contentType: "application/json",
	    dataType:"json",   
	    async: false, // 同步
	    success: function(data){
	    	if(data.returnCode=="001000"){ // 成功
	    		var result = data.data;
	    		if(result != null){
					for(var i=0; i<result.length; i++){
						var file_url = "";
						if(index%4==0){ // lu
							file_url = result[i].green_file;
						}else if(index%4==1){ // hong
							file_url = result[i].red_file;
						}else if(index%4==2){ // lan
							file_url = result[i].blue_file;
						}else if(index%4==3){ // huang
							file_url = result[i].yellow_file;
						}
						if(file_url == "" || file_url=="undefined" || file_url == null){
							file_url = result[i].smallogo_file;
						}
						
						var res_name = result[i].res_name;
						
						var a_element = $("<a href='javascript:;' url='/App/appPage?resCode="+result[i].res_code+"' display_mode='"+result[i].display_mode+"' rescode='"+result[i].res_code+"' restype='1' columnid='"+params.column_id+"' access_right='"+result[i].access_right+"' resid='"+result[i].res_id+"'>" +
								(result[i].showNewFlag=='1'?"<span class='new-span'></span>":"") +
									"<img src='"+file_url+"'/>" +
									"<p>"+res_name+"</p>" +
								"</a>");
						
						$("#channelColResDiv_"+params.column_id).append(a_element);
						
						if(i > (showNum-1)) { // 大于8个，隐藏应用
							a_element.hide();
						}
						
						// 点击应用
						$(a_element).click(function(){
							var url = $(this).attr("url");
							var display_mode = $(this).attr("display_mode");
							var rescode = $(this).attr("rescode");
							var access_right= $(this).attr("access_right");//访问权限
							var resName = $(this).find("p").text();
							var resid = $(this).attr("resid");

							
							if(access_right == 1){ //需要登录才能访问
								$.ajax({
								    type: "GET",
								    url:"/login/isLogin",
//								    data:JSON.stringify(cityJson),
//									contentType: "application/json",
//								    dataType:"json",  
								    async: false, // 同步
								    dataType:"text",         
								    success: function(data){
								    	if('0' == data) {//未登录
								    		// 弹窗提示切换
											var btnArray = ['取消', '确定'];
								            mui.confirm('您尚未登录，立即登录', '', btnArray, function(e) {
								                if (e.index == 1) {
								                	window.location.href= "/login/toLogin";
								                } else {
								                	return;
								                }
								            });
								            
								    	} else { // 已登录，获取sticket
								    		////////////////跳转到详情页面/////////////////////////	
											var param = {
												url: url,
												areacode: $.cookie('areaCode'),
												portaltype: $.cookie('portalType'),
												columnid: params.column_id,
												resourceid: rescode,
												restype: 1,
												display_mode:display_mode,
												resName:resName,
												resid:resid,
												isNeedTicketInfo:"1",
												rescode:rescode
											};
											//alert(JSON.stringify(param));
											goToWxcsApp(param);
								    	}
								    	//return;
								    }
								});
							} else { // 不需要登录
								////////////////跳转到详情页面/////////////////////////	
								var param = {
									url: url,
									areacode: $.cookie('areaCode'),
									portaltype: $.cookie('portalType'),
									columnid: params.column_id,
									resourceid: rescode,
									restype: 1,
									display_mode:display_mode,
									resName:resName,
									resid:resid,
									rescode:rescode
								};
//								alert(JSON.stringify(param));
								goToWxcsApp(param);
							}
							
							
						});
						
					}
					
					// 显示 展开更多
					if(result.length > showNum) {
						var more_ele = $("<a class='more' column_id='"+params.column_id+"'>展开更多("+(result.length-showNum)+")<img src='images/icon-more.png'/></a>");
						$("#moreChannelColResDiv_"+params.column_id).append(more_ele);
						
						// 点击展开更多
						$(more_ele).click(function(){
							var cl_id = $(this).attr("column_id");
							$("#channelColResDiv_"+cl_id).find("a").show();
							$(this).hide();
						});
					}
				}
			} else {
				console.log("get channel column res error");
			}
	    },
        error: function(){
			console.log("get channel column res sys error");
        }
	});
	
	
	
}

