//基本信息
var serach_word ="";
var Search = {
	params: function(){
	},
	init: function(){
		var me = this;
		me.initEvent();
		me.searchInfo();
		me.showSearchHistories();
//		me.initSearchHotWordsToCookie();
		me.setSearchHotWords();
		
	},
	initEvent: function(){
		var me = this;
//		$(".header1 a").unbind("click").click(function(){
//			window.location.href = "index.html";
//		});
		
//	 	  $('.search input').keydown(function(e) {
//	 	    var keyCode = e.keyCode;
//	 	    if(keyCode == 13) {
//	 	    	me.searchValid($("#search-input").val());
//	 	    }
//	 	  })

	 	
		//去除输入框中的内容
		  $(".search a").eq(1).unbind("click").click(function(){
			  $(".search input").val("");
		  });
		  
//		  $('.search-tip').on("mousedown", 'li', function() {
//			    var searchWord = $(this).html();
//			    $(".search input").val(searchWord);
//			    me.toSearch(searchWord);
//			})
//		  $(".search input").blur(function() {
//			  $(".search-tip").removeClass("on");
//		  })
		  $(".search input").blur(function() {
		      $(".contain").show();
		      $(".show-tip-list").hide();
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
//				    			$(".search-tip ul").empty();
//				    			$(".search-tip ul").append("<li>未找到应用</li>");
				    			$(".search-tip-list").empty();
				    	    	$(".search-tip-list").append("<li><a href='javascript:void(0);'><span>未找到应用</span></a></li>");
				    	    	console.log("return2");
				    	    	return;
				    		}
					    	me.cueSearch(word);
					    	
					    } else {
//					      $(".search-tip").removeClass("on");
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
	
	
	// 搜索功能
	searchInfo: function(){
		var me = this;
		//wap/小页面  点击搜索，弹窗

//		me.setSearchHistories(); //设置历史搜索词列表
		//搜索按钮单击
//		$(".header1 .search a").each(function(){
//			$(this).bind("click",function(){
//				var textVal = $(this).parent().find("input[name='b_searchKey_1']").attr("value");
//				me.searchValid(textVal);
//			});
//		});
		$("#start-search").unbind("click").click(function(){
			var textVal = $("#search-input").val();
			me.searchValid(textVal);
		});
		
		//点击隐藏历史搜索记录
		$("body").bind("click",function(){
			$(".jt-historySearchKey").hide();
		});
		// form点击冒泡
//		$('.jt-search-btn').parent().click(function(index, e) {  
//			var ev;
//			ev = e || window.event;  
//		    if(ev.stopPropagation) { //W3C阻止冒泡方法  
//		    	ev.stopPropagation();  
//		    } else {  
//		    	ev.cancelBubble = true; //IE阻止冒泡方法  
//		    }  
//		});
		// 搜索输入框click
		$(".jt-search-in").bind("click",function(){
			var searchVal=$.trim($(this).val());
			if("" == searchVal ){ //当搜索框内容为空时，显示当前城市下最新10条搜索历史列表
				$(".jt-historySearchKey").show();
			}
		});
		//搜索输入框内容变化
		$(".jt-search-in").bind("input propertychange",function(){
			var searchVal=$.trim($(this).val());
			if(""== searchVal ){ //
				$(".jt-historySearchKey").show();
			}
		});
	},
	// 输入校验
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
//		window.location.href = basePath + "/portal/searchList.jsp?skey="+escape(searchKey);
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
	 * 获取搜索词到搜索历史记录
	 */
	getCookieSearchHistories : function(){
		var me = this;
		var search_histories = new Array();
		var shist =  $.cookie("search_histories",{raw:true})  || '';
		var shist = base64UTF8Decode( $.cookie("search_histories",{raw:true}) ) || '';
		if(""!=shist){
			search_histories =eval("("+shist+")");
		}
		
		//从cookie中还原数组
		if(null!=search_histories && search_histories!=""){
			var x ;
			var search_key;
			search_histories.reverse(); //将数组逆序,最新搜索的历史展示到前面
			//搜索词输入大于10，之取前面10个
			//wap端取5个
			for(x in search_histories){
				if(search_histories[x].search_key.length > 5){
					search_histories[x].search_key = search_histories[x].search_key.substr(0, 5)+"...";
				}else{
					search_histories[x].search_key =search_histories[x].search_key;
				}
			}
		}
		return search_histories;
	},
	
	
	/**
	 * 展示最近搜索词列表 
	 * @param search_histories
	 */
	showSearchHistories : function(){
		var me = this;
		var search_histories = me.getCookieSearchHistories();
//		$("#jt-historySearchKey a").each(function(index, e){
			$("#jt-historySearchKey").html("");
			
			if(null!=search_histories && search_histories.length == 0){
				$(".container .contain").eq(0).hide();
				return;
			}
			if( null!=search_histories ){
				var x ;
				for(x in search_histories){
					$("#jt-historySearchKey").append("<a href=\"javascript:void(0);\">"+search_histories[x].search_key+"</a>");
				}
			}
			//搜索下拉列表绑定单击事件
			$("#jt-historySearchKey a").each(function(index1, elem){
				$(elem).unbind("click").bind("click",function(){
					me.toSearch($.trim($(elem).text()));
				});
			});
			
			//删除历史搜索记录
			$("#delete").bind("click",function(){
				$.cookie("search_histories",  null, {expires: -1, path: '/', domain:document.domain});
				$("#delete").parent().hide();
//				me.showSearchHistories();
			});
			
//		});
		
	},
	/**
	 * 展示历史搜索词列表 old
	 * @param search_histories
	 */
	setSearchHistories : function(){
		var me = this;
		var search_histories = me.getCookieSearchHistories();
		$(".jt-historySearchKey").each(function(index, e){
			$(".jt-historySearchKey").html("<li class='jt-cg' >历史搜索:<span class='delSearchHistorys' style='font-size:12px;float:right;'>清除</span></li>");
			if( null!=search_histories ){
				var x ;
				for(x in search_histories){
					$(".jt-historySearchKey").append("<li>"+search_histories[x].search_key+"</li>");
				}
			}
			//搜索下拉列表绑定单击事件
			$(e).find("li").each(function(index1, elem){
				$(elem).unbind("click").bind("click",function(){
					if(index1 > 0){
						me.toSearch($.trim($(elem).text()));
					}
				});
			});
			
			//删除历史搜索记录
			$(".delSearchHistorys").bind("click",function(){
				$.cookie("search_histories",  null, {expires: -1, path: '/', domain:document.domain});
				me.setSearchHistories();
			});
			
		});
		
		//（由于web历史搜索无法错发搜索）web历史搜索额外增加绑定
		$("#jt-historySearchKey-web").find("li").each(function(index1, elem){
			$(elem).unbind("click").bind("click",function(){
				if(index1 > 0){
					me.toSearch($.trim($(elem).text()));
				}
			});
		});
		$(".jt-historySearchKey").hide(); //默认隐藏
	},
	
	
	
//	/**
//	 * 初始化搜索词到cookie
//	 */
//	initSearchHotWordsToCookie : function(inparams){
//		var me = this;
//		var hotck = base64UTF8Decode($.cookie("searchhotwords_ck",{raw:true}));
//		if(null==hotck || ""== hotck ){
////			var areaCode = $.cookie("areaCode"); 
//			var areaCode = "1"; 
//		    var oData = {
//		    	"areacode": areaCode
////		    	"isbusinesscircle": "1"
//		    };
//		    oData = JSON.stringify(oData);
//		    $.ajax({
//		        type: "post",
//		        url: '/search/hotwordsreq',
//		        data: oData,
//		        dataType: "json",
//		        contentType: "application/json",
//		        success: function(data){
//					if(null != data &&　data.returnCode == "001000"){
//						var result = data.data;
//						var searchhotwords_ck = new Array(); // 10个热搜索词
//						//var searchhotwords_ck_default; // 1个默认搜索词
//						if(result != null && result.length>0 ){
//							for(var i=0; i<result.length; i++){
//								//if(i==0 ){//
//									//searchhotwords_ck_default=result[i].word;
//								//}else{
//									searchhotwords_ck.push(result[i].word);
//								//}
//							}
//							
//							var jsonStr = "";
//							for(var i=0;i<searchhotwords_ck.length;i++){
//								jsonStr = jsonStr + searchhotwords_ck[i];
//								if(i != searchhotwords_ck.length-1){
//									jsonStr =jsonStr + ',';
//								}
//							}
//							$.cookie("searchhotwords_ck",base64UTF8Encode(jsonStr),{ expires: 1,path:"/",raw:true});
//							//$.cookie("searchhotwords_ck_default",base64UTF8Encode(searchhotwords_ck_default),{ expires: 1,path:"/",raw:true});
//							me.setSearchHotWords(); // 设置热搜索词列表
//						}
//					}
//					if(inparams!=null && inparams.gotoCityUrl){
//						window.location.href = inparams.cityUrl; 
//					}
//
//		        },
//		        error: function(e){
//		          console.log(e);
//		        }
//		    })
//		}else{
//			me.setSearchHotWords(); // 设置热搜索词列表
//			if(inparams!=null && inparams.gotoCityUrl){
//				window.location.href = basePath+"/portal/index.jsp"; // 后期替换成对于城市的url
//			}
//		}
//	},
	/**
	 * 展示热门搜索词列表
	 * 热门搜索：当搜索框填写任意搜索内容后，显示全网热门搜索列表,热门搜索词全网统一，由后台配置。热门搜索词展现8个，根据地市+门户类型获取对应的热搜词
	 * 在搜索框默认展示1个热搜词，在搜索框下面展示4个热搜词
	 */
	setSearchHotWords : function(){
		var me = this;
		var searchhotwords_cks = new Array();
		var hotck = base64UTF8Decode($.cookie("searchhotwords_ck",{raw:true}));
		if( hotck != null && hotck != "" ){
			searchhotwords_cks =  hotck.replace(new RegExp(/[\"|\[|\]]/g),'').split(",");//替换所以" [ ]
		}
		if( null!=searchhotwords_cks && searchhotwords_cks.length>0){
			$("#jt-hotwords").html("");
			for(var i = searchhotwords_cks.length-1; i>=0; i-- ){
				$("#jt-hotwords").append("<a href=\"javascript:void(0);\">"+searchhotwords_cks[i]+"</a>");
			}
			//搜索下拉列表绑定单击事件
			$("#jt-hotwords a").bind("click",function(){
				me.toSearch($.trim($(this).text()));
			});
		} else {
		
			$("#jt-hotwords").prev().hide();
		}
	}
	
};
//监听回车事件
function enterEvent(){
	Search.searchValid($("#search-input").val());
}
$(function() {
	Search.init();
	String.prototype.startWith=function(str){
    	var reg=new RegExp("^"+str);
    	return reg.test(this);
	};
	String.prototype.endWith=function(str){
    	var reg=new RegExp(str+"$");
    	return reg.test(this);
	};
});
