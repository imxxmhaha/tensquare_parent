
var keys;
var searchParams={};
var check_val = []; //需要移除的收藏
searchParams.isNeedFavour = 1; //显示收藏

var collections = {};
$(function() {
	Collection.init();
});

//基本信息
var Collection = {
	params: function(){
	},
	init: function(){
		var me = this;
		me.initEvent();
		me.initCollections();
		
	},
	initEvent: function(){
		var me = this;
		
		$(".enter").click(function(){
	    	//检查状态
			if($(".bottom").css('display') == "none"){
		   		$(".checkbox").show();
		   		$(".bottom").show();
	    		$(this).html("完成");
				$(".container a").each(function(index1, elem){
					$(elem).unbind("click"); 
				});
			}else{
				var arr = Object.keys(collections);
				if(arr.length == 0){
					location.reload();
					return
				}
				me.saveCollections();
//				location.reload();
//		   		$(".checkbox").hide();
//		   		$(".bottom").hide();
//	    		$(this).html('<img src="../../images/icon-edit.png" class="edit-img"/>');
			}
		});
		
		
	},
	
	/**
	 * 初始化收藏页面
	 */
	initCollections : function(){
		var me = this;
		var user_id = $.cookie('he_life_user_id');
	    var oData = {
	    		"userid": user_id,
	    		"nodetype": "1",
	    		"pagenum":"1",
	    		"pagesize":"100"
	    	  };
	    oData = JSON.stringify(oData);
	    $.ajax({
	        type: "post",
	        url: '/user/collect/getCollectionReq',
	        data: oData,
	        dataType: "json",
	        contentType: "application/json",
	        success: function(data){
	        	var arr = "";
				if(null != data &&　data.returnCode == "001000"){
					var list = data.data.collectionlist;
					if(null != list && list.length > 0){
						for(var i = 0; i<list.length; i++){
							var resource = list[i].resource;
							var resMap = list[i].resMap;
//							var url = resource.logolist.filter((p) => {
//								return p.key == "smallogo_file";
//							});
//							arr +="<a href=\"#\" class=\"content\"><img src=\""+ url[0].value+"\" class=\"icon1\"/>" +
//							"<span>"+resource.resname+"</td></span></a>"
							
							arr +='<a href="javascript:void(0);" class="content"  url="/App/appPage?resCode='+resource.rescode+'" rescode ="'+resource.rescode+'" resid="'+list[i].nodeid+'" nodetype="'+list[i].nodetype+'" display_mode="'+resource.portallist[0].displaymode+'" restype="1" >'+
 					   		'<div class="checkbox"><input type="checkbox" name="collect" id="collect'+(i+1)+'"><label for="collect'+(i+1)+'"></label></div>'+
					   		'<img src="'+ resMap.smallogo_file+'" class="icon1"/><span>'+resource.resname+'</span></a>';
							
						}
					}
					
				}
				$(".container").html(arr);
				$(".container a").each(function(index1, elem){
					$(elem).unbind("click").bind("click",function(){
						me.addClickApp(elem, searchParams);
					});
				});
				
		   		$(".bottom").hide();
		   		$(".checkbox").hide();
		   		
		   		//初始化按钮
		   		me.initCheck();
	        },
	        error: function(e){
	          console.log(e);
	        }
	    
	    })
	},
	
	/**
	 * 初始化收藏页面的复选框事件
	 */
	initCheck : function(){
		var me = this;
		console.log("initCheck");
	    var ckAll=document.getElementById("collectAll");
	    var ckcs=document.querySelectorAll(
	        ".content div:first-child>input"
	    );
	    
	   	ckAll.onclick=function(){
	        for(var i=0;i<ckcs.length;i++){
	            ckcs[i].checked=this.checked;
	        }
	    }
	   	
	    for(var i=0;i<ckcs.length;i++){
	        ckcs[i].onclick=function(){
	            if(!this.checked){
	                ckAll.checked=false;
	            }else{
	                var unchecked=
	                    document.querySelector(
	                        ".content div:first-child>input:not(:checked)"
	                    );
	                if(unchecked===null){
	                    ckAll.checked=true;
	                }
	            }
	        }
	    }
	    
	    //设置监听
	    $("input[type='checkbox']").click(function () {
	    	clacColletions();
	    });
	    // 计算收藏数量
	    function clacColletions(){
	        var checkCount = 0;
	        $("[name='collect']").each(function () {
	            if ($(this).prop("checked")) {
	                checkCount++;
	            }
	        });
	        var unchecked=
	            document.querySelector(
	                ".content div:first-child>input:not(:checked)"
	            );
	        if(unchecked===null && checkCount>0){
	        	checkCount--;
	        }
	        $("#amount").text("取消收藏" + "(" + checkCount + ")");
	    }
	    
	    // 页面移除收藏
	    $("#amount").click(function () {
	    	var del = $("input[type='checkbox']");
	    	
//	    	var check_val = [];
	   	  	for(var i = 0; i < del.length-1; i++){
	   	  		if(del[i].checked){
	       		  	var resid = $(del[i]).parent().parent().attr("resid");
	       		  	var nodetype = $(del[i]).parent().parent().attr("nodetype");
	       		 	var json = {"nodeid":resid, "nodetype":nodetype}
	                check_val.push(json);
	       		 	$(del[i]).parent().parent().remove();
	   	  		}
	   	  	}
	   	  	collections.list = check_val;
	   	  	console.log(collections);
	   	  	clacColletions();
	    });
	    
	},
	
	/**
	 * 保存删除的数据
	 */
	saveCollections : function(){
		var me = this;
		collections.userid = $.cookie('he_life_user_id');
		collections.optype = "1";
//	 	collections.memevent = ""; 0000
//	 	collections.account = "";
//	 	collections.usessionid = "";
//		console.log(collections);
	    oData = JSON.stringify(collections);
	    $.ajax({
	        type: "post",
	        url: '/user/collect/setCollectionReq',
	        data: oData,
	        dataType: "json",
	        contentType: "application/json",
	        success: function(data){
				if(null != data &&　data.returnCode == "001000"){
					
				}else{
					alert(data.errorMessage);
				}
				location.reload();
	        },
	        error: function(e){
	          console.log(e);
	        }
	    
	    })
	},
	/**
	 * 点击应用
	 */
	addClickApp : function(obj, params){
		var url = $(obj).attr("url");
		var display_mode = $(obj).attr("display_mode");
		var rescode = $(obj).attr("rescode");
		var access_right= $(obj).attr("access_right");//访问权限
		var resName = $(this).find("p").text();
		var resid = $(obj).attr("resid");
		console.log("addClickApp:"+ url);
		
		if(access_right == 1){ //需要登录才能访问
			$.ajax({
			    type: "GET",
			    url:"/login/isLogin",
//			    data:JSON.stringify(cityJson),
//				contentType: "application/json",
//			    dataType:"json",  
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
							isNeedTicketInfo:"1",
							url: url,
							areacode: $.cookie('areaCode'),
							portaltype: $.cookie('portalType'),
							columnid: params.column_id,
							isNeedFavour: params.isNeedFavour,
							resourceid: rescode,
							restype: 1,
							display_mode:display_mode,
							resName:resName,
							resid:resid,
							rescode:rescode
						};
						//alert(JSON.stringify(param));
						goToWxcsApp(param);
			    	}
//			    	return;
			    }
			});
		} else { // 不需要登录
			////////////////跳转到详情页面/////////////////////////	
			var param = {
				isNeedTicketInfo:"1",
				url: url,
				areacode: $.cookie('areaCode'),
				portaltype: $.cookie('portalType'),
				columnid: params.column_id,
				isNeedFavour: params.isNeedFavour,
				resourceid: rescode,
				restype: 1,
				display_mode:display_mode,
				resName:resName,
				resid:resid,
				rescode:rescode
			};
//			alert(JSON.stringify(param));
			goToWxcsApp(param);
		}
		
	}
	
	
}

