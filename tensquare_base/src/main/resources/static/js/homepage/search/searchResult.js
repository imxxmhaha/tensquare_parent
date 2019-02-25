var serach_word ="";
var SearchResult = {
	params: function(){
	},
	init: function(){
		var me = this;
		me.initEvent();
		me.initSearchResult();
	},
	initEvent: function(){
		var me = this;
		$(".search input").val("");
		if(key.indexOf("$") == -1){
			$(".search input").val(key);
		}
		$(".search a").eq(0).unbind("click").click(function(){
			var keyword = $(".search input").val();
			me.searchValid(keyword);
		});
		$(".search a").eq(1).unbind("click").click(function(){
//			var keyword = $(".search input").val();
//			keyword = keyword.substring(0, keyword.length-1);
//			$(".search input").val(keyword);
			$(".search input").val("");
		});
//		$('.search input').keydown(function(e) {
//	 	    var keyCode = e.keyCode;
//	 	    if(keyCode == 13) {
//	 	    	me.searchValid($("#search-input").val());
//	 	    }
//	 	  })
		 	  
//		$('.search-tip').on("mousedown", 'li', function() {
//		    var searchWord = $(this).html();
//		    $(".search input").val(searchWord);
//		    me.toSearch(searchWord);
//		})

		$(".search input").blur(function() {
			$(".search-tip").removeClass("on");
		})
			$('.search-tip-list').on("mousedown", 'li', function() {
			  var code = $(".search-tip").attr("find");
			  if(code == "11"){
				  mui.alert('无此应用!', '温馨提示');
				  return;
			  }
			    var searchWord = $(this).find("span").html();
			    $(".search input").val(searchWord);
			    me.toSearch(searchWord);
			})
			
		var flag = true;
		$('.search input').on('compositionstart',function(){
		    flag = false;
		})
		$('.search input').on('compositionend',function(){
		    flag = true;
		})
		$('.search input').on('input',function(){
			var that = this;
		    setTimeout(function(){
		        if(flag){
		        	var word = that.value;
				    var len = word.length;
				    if(len) {
				    	var find = $(".search-tip").attr("find");
				    	if(find == "11"){
				    		if(word.startWith(serach_word)){
				    			$(".contain").hide();
					  			$(".show-tip-list").show();
				    			console.log("return");
				    			return;
				    		}
				    	}
				    	var str = /[\n\r\'\"\\|;$+`~%!#^=''?~！#￥ 　……&——‘”“'？*()（），,。、《》<>：；|/\\{}｛｝【】\[\]]/;
			    	    if(str.test(word)){
//			    			$(".search-tip ul").empty();
//			    			$(".search-tip ul").append("<li>未找到应用</li>");
			    			$(".search-tip-list").empty();
			    	    	$(".search-tip-list").append("<li><a href='javascript:void(0);'><span>未找到应用</span></a></li>");
			    	    	console.log("return2");
			    	    	return;
			    		}
				    	me.cueSearch(word);
				    } else {
				      $(".search-tip").removeClass("on");
				      $(".contain").show();
				      $(".show-tip-list").hide();
				    }
		        }
		    },0)
		})
		
	},
	
	cueSearch: function(word){
		var me = this;
		console.log("cueSearch...");
		 var oData = {
		    		"keyword": word,
		    		"areacode": $.cookie('areaID')
		    };
		    oData = JSON.stringify(oData);

			$.ajax({
			    type: "post",
			    url: '/search/searchCueResultReq',
			    data: oData,
			    dataType: "json",
			    contentType: "application/json",
			    success: function(data){
					if(null != data &&　data.returnCode == "001000"){
						var results = data.data.results;
						if(results.items.length > 0){
							var result = results.items;
//							$(".search-tip ul").empty();
							$(".search-tip-list").empty();
							var item ="";
							for(var i = 0; i < results.items.length; i++) {
//								item += "<li>" + results.items[i].resname + "</li>";
								var url = result[i].logolist[3].value;
								item += "<li><a href='javascript:void(0);'><img src='"+url+"' /><span>"+results.items[i].resname+"</span></a></li>";
							}
							
//							$(".search-tip ul").append(item);
							$(".search-tip-list").append(item);
//							$(".search-tip").addClass("on");
							$(".contain").hide();
							$(".show-tip-list").show();
							$(".search-tip").attr("find","10");
							
						}else{
							me.notFindSearch(word);
						}
					}else{
						me.notFindSearch(word);
					}
					
			    },
			    error: function(e){
			    	me.notFindSearch(word);
			    	console.log(e);
			    }
			})
			
	},
	notFindSearch: function(word){
		var me = this;
		serach_word = word;
		
//		$(".search-tip ul").empty();
//		$(".search-tip ul").append("<li>未找到应用</li>");
//		$(".search-tip").addClass("on");
		
		$(".search-tip-list").empty();
    	$(".search-tip-list").append("<li><a href='javascript:void(0);'><span>未找到应用</span></a></li>");
		$(".search-tip").attr("find","11");
		$(".contain").hide();
		$(".show-tip-list").show();
	},
	
	
	/**
	 * 初始化搜索结果
	 */
	initSearchResult: function(){
		var me = this;
	    var oData = {
	    		"keyword": key,
	    		"areacode": $.cookie('areaID')
	    };
	    oData = JSON.stringify(oData);
		$.ajax({
		    type: "post",
		    url: '/search/toSearchResultReq',
		    data: oData,
		    dataType: "json",
		    contentType: "application/json",
		    success: function(data){
				if(null != data &&　data.returnCode == "001000"){
					var results = data.data.results;
					var mmapps = data.data.mmapps;
					//搜索结果
					var html= "";
					var searchParams={};
					searchParams.isNeedFavour = 1; //显示收藏
					for(var i = 0; i<results.items.length; i++){
						var result = results.items;
						var url = result[i].logolist[3].value;
						html += "<div class='content'  url='/App/appPage?resCode="+result[i].rescode+"' display_mode='"+result[i].portallist[0].displaymode+"' " +
								"rescode='"+result[i].rescode+"' restype='1' access_right='"+result[i].accessright+"' " +
										"resid='"+result[i].mcserviceid+"' ><img src='"+url+"'/><p>"+results.items[i].resname+"</p></div>";

					}
					$("#results").html(html);
					$("#results").find('.content').each(function(index1, elem){
						$(elem).unbind("click").bind("click",function(){
							me.addClickApp(elem, searchParams);
						});
					});
					
					//MM精品应用
					me.initMMAppSearchResult(mmapps);
					//热门推荐
					if(html == ""){
						var name = $(".search input").val();
						$("#results").html("<div class=\"title\">找不到“"+name+"”相关的应用</div>");
						me.initSearchRecommended();
					}
					
				}else{
					console.log(data.errorMessage);
				}
		    },
		    error: function(e){
		      console.log(e);
		    }
		})
		
	},
	
	/**
	 * MM精品应用
	 */
	initMMAppSearchResult: function(mmapps){
		var me = this;
		var htmlps = '';
		if(null != mmapps){
			for(var i = 0; i<mmapps.length; i++){
				var desc = mmapps[i].desc.substr(0,5)+"...";
				htmlps += "<div class='item'>"+
				"<img src='"+mmapps[i].iconurl+"' url='"+mmapps[i].url+"'  type='"+mmapps[i].type+"' /><p class='name'>"+mmapps[i].app+"</p><p class='category'>"+desc+"</p></div>";
			}
			$("#mmapps").html(htmlps);
			$("#mmapps").find('.item').each(function(index1, elem){
				$(elem).unbind("click").bind("click",function(){
					var url = $(elem).find("img").attr("url");
					var resName = $(elem).find("p").eq(0).text();
					var urlTmp = littleUrl.encode(url);
					window.location='/appPage/url='+ base64encode(urlTmp)  +'&resName='+resName +'&isNeedFavour=0';
				});
			});
		}else{
			console.log("mmapps is null");
		}
	
	},
	
	
	/**
	 * 初始化推荐应用
	 */
	initSearchRecommended: function(){
		var me = this;
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
		var recommended ='';
		$("#recommended").html(recommended);
		
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
								console.log("params.column_id:"+params.column_id);
								// 精品应用查询
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
								    			params.isNeedFavour = 1; //显示收藏
								    			recommended += '<div class="title">推荐应用</div>';
								    			
												for(var i=0; i<result.length; i++){
													var file_url = result[i].smallogo_file;
													file_url = file_url == null ?" ":file_url;
													var res_name = result[i].res_name;
													
													recommended +="<div class='content' url='/App/appPage?resCode="+result[i].res_code+"' display_mode='"+result[i].display_mode+"' " +
															"rescode='"+result[i].res_code+"' restype='1' columnid='"+params.column_id+"' access_right='"+result[i].access_right+"' " +
																	"resid='"+result[i].res_id+"' ><img src='"+file_url+"'/><p>"+res_name+"</p></div>";
												}
												$("#recommended").html(recommended);
												$("#recommended").find('.content').each(function(index1, elem){
													$(elem).unbind("click").bind("click",function(){
														me.addClickApp(elem, params);
													});
												});
												
											}
										} else {
											console.log("get column res error");
										}
								    }
								});
							}
						}
					}
				} else {
					console.log("get coloumn error！ returnCode="+data.returnCode);
				}
		    }
		});
		
		
	},
	/**
	 * 输入校验
	 */
	searchValid: function(searchKey){
		var me = this;
		var str = /[\n\r\'\"\\|;$+`~%!#^=''?~！#￥ 　……&——‘”“'？*()（），,。、《》<>：；|/\\{}｛｝【】\[\]]/;
		if(searchKey==null || searchKey==""){
			mui.alert('请输入关键词进行查询!', '温馨提示');  
	    	return;
		}
		if(searchKey.length >10){
			mui.alert('您输入的内容含超过10个，请重新输入!', '温馨提示');
			return;
		}
	    if(str.test(searchKey)){
	    	mui.alert('您输入的内容含有特殊字符，请重新输入!', '温馨提示');  
	    	return;
		}
	    me.toSearch(searchKey);
	},
	/**
	 * 搜索
	 */
	toSearch: function(searchKey){
		var me = this;
	    //搜索历史:信息存储在cookie
		if(null != searchKey && ""!=searchKey){
			me.addCookieSearchKey(searchKey);
		}
		console.log("searchKey-->"+searchKey);
		window.location.href = "/search/toSearchResultPage/"+searchKey;
	},
	/**
	 * 添加搜索词到搜索历史记录
	 * @param searchKey
	 */
	addCookieSearchKey : function(searchKey){
		var search_histories = new Array(); //搜索历史
		var search_histories_new = new Array();
		//eg  [{"search_key":"公交"},{"search_key":"公"},{"search_key":"交"}]
		var shist = base64UTF8Decode($.cookie("search_histories",{raw:true})) || '';
		if(""!=shist){
			search_histories = eval("("+shist+")");
		}
		//从cookie中还原数组
		if(search_histories == null || search_histories == ""){
			var search_cookie = new Object();
			search_cookie.search_key = searchKey;
			search_histories_new.push(search_cookie);
		}else{
			//在加入数组时，先要遍历下存在的cookie数组，是否有相同的记录存在。 如果原cookie不存在，则添加.
			//如存在相同内容，先把相同的记录删除(不存在相同的加入新数组)，再在数组push加入一条新记录，这样就能保持时间的排序。
			var x;
			for(x in search_histories){ 
				if(search_histories[x].search_key != searchKey){
					search_histories_new.push(search_histories[x])
				}
			}
			var search_cookie = new Object();
			search_cookie.search_key = searchKey;
			search_histories_new.push(search_cookie);
		}
		var view_length=search_histories_new.length;//浏览记录的数组长度;
		if(view_length > 10){
			var delcode = search_histories_new.shift(); //把数组的第一个元素从其中删除，并返回第一个元素的值
		}
		
		var jsonStr = "[";
		for(var i=0;i<search_histories_new.length;i++){
			jsonStr = jsonStr + '{"search_key":"' + search_histories_new[i].search_key +'"}';
			if(i != search_histories_new.length-1){
				jsonStr =jsonStr + ',';
			}
		}
		jsonStr = jsonStr+"]";
		
		//将数组转换为Json字符串保存在cookie中,过期时间为365天
		$.cookie("search_histories",base64UTF8Encode(jsonStr),{ expires: 365,path:"/",raw:true}); 
	},
	
	/**
	 * 点击应用
	 */
	addClickApp : function(obj, params){
		var url = $(obj).attr("url");
		var display_mode = $(obj).attr("display_mode");
		var rescode = $(obj).attr("rescode");
		var access_right= $(obj).attr("access_right");//访问权限
		var resName = $(obj).find("p").text();
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
							isNeedTicketInfo:1,
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
//监听回车事件
function enterEvent(){
	SearchResult.searchValid($("#search-input").val());
}
$(function() {
	SearchResult.init();
	String.prototype.startWith=function(str){
		var reg=new RegExp("^"+str);
		return reg.test(this);
	};
	String.prototype.endWith=function(str){
		var reg=new RegExp(str+"$");
		return reg.test(this);
	};
});

		
		