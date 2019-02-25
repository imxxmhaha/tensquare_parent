/**
 * 全局变量
 */
// 页面加载获取全局信息
var appType="1"; // 应用类型
var goodsType="2"; // 商品类型
var merchantType="3"; // 商户类型
//采集资源类型   res_type    0:新闻 1:应用 2:视频 3:栏目 5:广告 6:公告 7:商品 8:商户 

var areaID = "";
var areaCode = "";
var provID = "";
var areaFullSpell = "";
var areaName = "";
var ip = "";

var basePath = "";
var globalUSessionId = "";
var loginUserId = "";	// 登录用户ID
var isUpgradeType = ""; // 关联通行证情况
var isSysn = ""; 		// 通行证、手机号、邮箱绑定情况(前提是有通行证)
var showName = "";		// 显示名字

/**
 * JS 闭包实现
 */
(function(scope){
	var topUtil = Base.extend({
		// 初始化
		init: function(){
			var me = this;
			me.initBackBtn();
			basePath = "http://www.wxcs.cn";
			portalType = $.cookie("portalType");
			// 根据驶入地址判断是否查询地区还是直接定位
			var url = window.location.href; //现在的URL zengxianlian
			if("1"==portalType&&url.indexOf("http://www.wxcs")>-1){
				var newUrl = url.replace("http://www","http://wap");
				window.location.href = newUrl;
			}
			var startIndex = url.indexOf(".wxcs");
			var def = null;//deferred
			
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
					
					def = $.Deferred();
					
					//首先通过cookie定位，再走自动定位  
					var params = {};
					params.spec = spec;
					Service.excute("ITopService", "getIpAndCityBySpec", [params], function(result){
						if(result == null || result.message=="error" ){
							def.reject();
							me.toNavCity();
						}else{
							// 保存到cookie
							$.cookie('ip', result.ip,{ expires: 3560});
							$.cookie('areaID', result.areaid,{ expires: 3560});
							$.cookie('areaCode', result.areacode,{ expires: 3560});
							$.cookie('provID', result.provid,{ expires: 3560});
							$.cookie('areaName', base64UTF8Encode(result.areaname),{ expires: 3560});
							$.cookie('areaFullSpell', result.areafullspell,{ expires: 3560});
							
							def.resolve();
						}
					});
				}
				if(spec == 'ac'){
					$('#jt-header-sm').hide();
				}
			}
			/*else{
				var params = {};
				params.areaID = $.cookie('areaID')||$.cookie('areaCode')||'';
				params.provID = $.cookie('provID');
				params.areaName = base64UTF8Decode($.cookie('areaName'));
				params.areaFullSpell = $.cookie('areaFullSpell');
				Service.excute("ITopService", "getIpAndCityBySpec", [params], function(result){
					if(result == null || result.message=="error" ){
						me.toNavCity();
					}else{
						// 保存到cookie
						$.cookie('ip', result.ip,{ expires: 3560});
						$.cookie('areaID', result.areaid,{ expires: 3560});
						$.cookie('areaCode', result.areacode,{ expires: 3560});
						$.cookie('provID', result.provid,{ expires: 3560});
						$.cookie('areaName', base64UTF8Encode(result.areaname),{ expires: 3560});
						$.cookie('areaFullSpell', result.areafullspell,{ expires: 3560});
					}
				});
			}*/
			
			//第一次初始化全局变量
			me.initGlobalParams();
			
			if(def){
				$.when(def).done(function(){
					me.afterInit();
				}).fail(function(){
					
				});
			}
			else {
				me.afterInit();
			}
		},
		//全局变量
		initGlobalParams: function(){
			// 获取需要的cookie值
			areaID = $.cookie('areaID');
			areaCode = $.cookie('areaCode');
			provID = $.cookie('provID');
			areaName = base64UTF8Decode($.cookie('areaName'));
			areaFullSpell = $.cookie('areaFullSpell');
			ip = $.cookie("ip")==null?"":$.cookie("ip");
			// 
			globalUSessionId = $.cookie("usessionId")==null?"":$.cookie("usessionId");
			loginUserId = $.cookie("he_life_user_id")==null?"":$.cookie("he_life_user_id");
			isUpgradeType = $.cookie("isUpgradeType")==null?"":$.cookie("isUpgradeType");
			isSysn = $.cookie("isSysn")==null?"":$.cookie("isSysn");
		},
		afterInit: function(){
			var me = this;
			if(typeof(afterTopUtilInit) == 'function'){
				afterTopUtilInit.apply(me, []);
			}
			//取最新的全局变量
			me.initGlobalParams();
			this.initWapHeader();//wap 头部处理
			LoginUserInfo.init();
			this.getIPAndCity();
			this.someBtnUrl(); //按钮跳转
			this.searchInfo();// 搜索
			//me.dasHeadImg();
			// 收藏
			$("#favor_www").unbind("click").click(function(){
				me.favoriteRes();
			});
			// 缩小后的导航
			me.clickShowNav();
			me.autoRecordLogin();
		},
		autoRecordLogin: function(){
			var last_login_info = $.cookie('last_login_info');//记录上一次登录
			var last_login_info_time = $.cookie('last_login_info_time');
			var he_life_user_id = $.cookie("he_life_user_id");
			if(!he_life_user_id && last_login_info && last_login_info_time){
				try {
					if(typeof(cl) != 'undefined'){
						cl.autoRecordLogin(last_login_info, last_login_info_time);
					}
				} catch (e) {
					
				}
			}
		},
		/**
		 * 初始化返回按钮
		 */
		initBackBtn: function(){
			//回顶部
			(function(){
				var $totop = $("#jt-totop");
				var $body = $('body,html');
				$(window).scroll(function () {
					if ($(this).scrollTop() > 100) {
						$totop.show();
					} else {
						$totop.hide();
					}
				});
				
				$totop.click(function () {
					if($.browser.msie){
						//mobile ie不支持动画滚动
						$body.scrollTop(0);
						window.scrollTo && window.scrollTo(0,0);
					}else{
						$body.animate({
							scrollTop: 0
						}, 500);
					}
					return false;
					$totop.css("bottom",20);
				});
				
				if(history.length > 0){
					$("#jt-toback").click(function(){
					       window.history.go(-1);
				    });
				}
			})();
			//回顶部 结束
		},
		//wap应用头部是否需要显示
		initWapHeader: function(){
			//这里取最新的门户类型(有可能在afterTopUtilInit改动过)
			portalType = $.cookie('portalType');
			if('1' == portalType){
				$('#jt-header-sm').show();
				$('#login_btn_div_wrap').show();
			}
			else {
				$('#jt-header-sm').hide();
				$('#login_btn_div_wrap').hide();
				//www显示简介
				if('0' == portalType){
					$("#jt-appxqmore").show();
				}
				//app不需要显示底部
				if('2' == portalType){
					$(".jt-footer").hide();
				}
			}
			
			var url = window.location.href;
			if(url.indexOf('http://ac') == 0){
				$('#jt-header-sm').hide();
			}
		},
		// 获取IP、城市代码、名称(初始化调用)
		getIPAndCity: function(){
			var me = this;
			if(me.areaCodeIsNull()){
				// 1. 后台取
				Service.excute("ITopService", "getIpAndCity", [{"portalType":portalType, "areacode":getUrlParam("areacode")}], function(result){
					if(result == null  || result.message=="error"){
						me.toNavCity();
					}else{
						ip = result.ip;
						$.cookie('ip', result.ip,{ expires: 3560});
						if(result.message == "error"){
							// 3. 跳转去选择地市页面
							me.toNavCity();
						}else if(result.message == "success"){
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
							$("#jt-cityAdress").find("span").text(areaName);
							$("#jt-cityAdress").show();
							// 天气
							me.getWeatherInfo();
							me.initSearchHotWordsToCookie(null); //初始化热门搜索词到cookie
						}
					}
					
					//事件回调
					me.callGetIpAndCityEvent();
				}, function(){
					me.toNavCity();
				});
			}else{
				//事件回调
				me.callGetIpAndCityEvent();
				// 取cookie展现城市名称
				$("#jt-cityAdress").find("span").text(areaName);
				$("#jt-cityAdress").show();
				// 天气
				me.getWeatherInfo();
				me.initSearchHotWordsToCookie(null); //初始化热门搜索词到cookie
			}
		},
		//此事件用于依赖ip和城市信息的方法
		callGetIpAndCityEvent: function(){
			if(typeof(afterGetIpAndCity) == 'function'){
				afterGetIpAndCity.apply(this, []);
			}
		},
		// 获取天气(初始化调用，在获取地市之后)
		getWeatherInfo: function(){
			var me = this;
			// 后台取
			areaFullSpell = $.cookie('areaFullSpell');
			var params = {"areaFullSpell":areaFullSpell, "areaid":areaID };
			Service.asExcute("ITopService", "getWeather", [params], function(result){
				if(result != null){
					if(result.message == "success"){
						var weather_logo = result.img_name;
						var weather_tmp = result.weather_tmp;
						// 展现天气
						var weather_img = basePath + "/static/images/weather/"+weather_logo;
						$("#jt-cityAdress").parents(".jt-city").find(".jt-cityWeather img").attr("src", weather_img);
						$("#jt-cityAdress").parents(".jt-city").find(".jt-cityTemp").text(weather_tmp);
					}
				}
			});
		},
		// 跳转至选择城市页面(在该页面则不再跳转)
		toNavCity: function(){
			var urlname = window.location.pathname;
			var page = "navcity.jsp";
			if( !(urlname.indexOf(page) > 0) ){ //不在切换城市页面，跳转
				window.location.href = basePath + "/portal/navcity.jsp";
			}
		},
		// 判断地区是否为空
		areaCodeIsNull: function(){
			if(areaCode=="" || areaCode== null || areaCode== 'undefined' || areaName== "" || areaName== null || areaName== 'undefined'){
				return true;
			}
			return false;
		},
		// 动态给top标题赋值
		setTitleInfo: function(title){
			$("#jt-header-sm .jt-navTitile").find("span").eq(0).text(title);
		},
		// 初始化右侧小导航赋值
		setTopNavInfo: function(paramsArr){
			var me = this;
			var info = "";
			for(var i=0; i<paramsArr.length; i++){
				info += '<li class="jt-appxq-introd">'+
							'<a href="javascript:;">'+paramsArr[i]+'</a>'+
						'</li>';
			}
			$("#jt-appxq-collect ul li").remove();
			$("#jt-appxq-collect ul").append(info);
		},
		// 小top时候点击显示右侧导航
		clickShowNav: function(){
			var me = this;
			//左侧点击，回退一个页面
			$(".jt-navtit-return").unbind("click").click(function(){
				history.go(-1);
			});
			$("#jt-next-tit").unbind("click").click(function(){
				if($("#jt-appxq-collect").is(":hidden")){
					$("#jt-appxq-collect").show();
				}else{
					$("#jt-appxq-collect").hide();
				}
			});
			// wap下，右侧导航--点击跳转
			$("#jt-appxq-collect ul li").each(function(index, elem){
				$(this).unbind("click").click(function(){
					var text = $(elem).find("a").text();
					if(text=="首页"){
						window.location.href = basePath + "/portal/index.jsp";
					}else if(text=="注册"){
						window.location.href = basePath + "/portal/regist.jsp";
					}else if(text=="登录"){
						window.location.href = basePath + "/portal/login.jsp?" + me.getBackUrl();
					}else if(text=="搜索"){
						window.location.href = basePath + "/portal/searchList.jsp";
					}else if(text=="收藏"){
						me.favoriteRes();
					}else if(text=="简介"){
						if($("#jt-appxqmore").is(":hidden")){
							$("#jt-appxqmore").show();
						}else{
							$("#jt-appxqmore").hide();
						}
					}else if(text=="个人中心"){
						window.location.href = basePath + "/portal/user/userCenter.jsp";
					}
				});
			});
			
			
		},
		// 资源收藏
		favoriteRes: function(){
			var me = this;
			var params = {};
			params.resType = appType;// me.getUrlParam("clickType");
			params.resourceid = me.getUrlParam("resourceid");
			params.user_id = loginUserId;
			params.portalType = portalType;
			Service.asExcute("IUserInfoService","setFavoriteRes",[params],function(result){
				
				if(result != null){
					if(result.result == "need_login"){
						window.location.href = basePath + "/portal/login.jsp?" + me.getBackUrl();
					}else if(result.result == "success"){
						art.dialog({ lock : true,title : '温馨提示',content : '收藏成功!',ok : function(){} });
					}else 
						if(result.result == "fail"){
						if(result.isHave == true){
							art.dialog({ lock : true,title : '温馨提示',content : '你已收藏过该应用，无需重复收藏!',ok : function() {} });
						}else{
							art.dialog({ lock : true,title : '温馨提示',content : '收藏失败',ok : function() {} });
						}
					}
				}
			});
		},
		// 获取backURL
		getBackUrl: function(){
			var me = this;
			var url = window.location.href; //现在的URL
			//防止用户直接修改backUrl参数，加上“无线城市”几个字
			var backUrl = "backUrl="+ base64encode(encodeURI(url));
//			var backUrl = "backUrl="+ base64encode(url);
			var urlname = window.location.pathname;
			// 在以下页面点击登录，不记录backurl
			var pages = ["regist.jsp", "login.jsp", "registPhoneSuc.jsp", "registerProtocol.jsp", "registEmailSuc.jsp", "registEmail.jsp"];
			for(var i=0; i<pages.length; i++){
				var page = pages[i];
				if( urlname.indexOf(page) > 0 ){ // 某些页面，不返回backUrl
					return "";
				}
			}
			return backUrl;
		},
		//获取url中的参数
		getUrlParam: function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        },
		// 登录注册等按钮控制
		someBtnUrl: function(){
			var me = this;
			$(".jt-navBoxUser-login").unbind("click").click(function(){ //登录
				window.location.href = basePath + "/portal/login.jsp?" + me.getBackUrl();
			});
			$(".jt-footer-login,.jt-footer-link").unbind("click").click(function(){ // 尾部登录
				if($(this).text()=="个人中心"){
					window.location.href=basePath+"/portal/user/userCenter.jsp";
				}else if($(this).text()=="登录"){
					window.location.href = basePath + "/portal/login.jsp?" + me.getBackUrl();
				}
			});
			$(".jt-navBoxUser-reg").unbind("click").click(function(){ //注册
				window.location.href = basePath + "/portal/regist.jsp";
			});
			$(".jt-footer-reg").unbind("click").click(function(){ // 尾部注册
				if($(this).text()=="退出"){
					LoginUserInfo.logout();
				}else if($(this).text()=="注册"){
					window.location.href = basePath + "/portal/regist.jsp";
				}
			});
			$(".jt-navBox-ulTitle").unbind("click").click(function(){ //首页
				window.location.href = basePath + "/portal/index.jsp";
			});
			$(".jt-logo").find("a").unbind("click").click(function(){ //首页
				window.location.href = basePath + "/portal/index.jsp";
			});
			$(".jt-city-choise").unbind("click").click(function(){ //城市选择
				window.location.href = basePath + "/portal/navcity.jsp";
			});
			$(".jt-footer a").each(function(index, ele){	//尾部跳转
				$(this).unbind("click").click(function(){
					window.location.href= basePath + "/portal/common/commonCenter_tab.jsp?tab="+index;
				});
			});
			//网络举报
			$(".network_report").unbind("click").click(function(){ 
				window.open("http://www.12377.cn/");
			});
			
		},
		// 搜索功能
		searchInfo: function(){
			var me = this;
			//wap/小页面  点击搜索，弹窗
			$(".jt-mod-searchLink img").unbind("click").click(function(){
				window.location.href = basePath + "/portal/searchList.jsp";
			});
			//me.initSearchHotWordsToCookie(null); //在定位的时候已经初始化热搜词了，这里可以取消了
			me.setSearchHistories(); //设置历史搜索词列表
			//搜索按钮单击
			$(".jt-search-btn").each(function(){
				$(this).bind("click",function(){
					var textVal = $(this).parent().find("input[name='b_searchKey_1']").attr("value");
					me.searchValid(textVal);
				});
			});
			//点击隐藏历史搜索记录
			$("body").bind("click",function(){
				$(".jt-historySearchKey").hide();
			});
			// form点击冒泡
			$('.jt-search-btn').parent().click(function(index, e) {  
				var ev;
				ev = e || window.event;  
			    if(ev.stopPropagation) { //W3C阻止冒泡方法  
			    	ev.stopPropagation();  
			    } else {  
			    	ev.cancelBubble = true; //IE阻止冒泡方法  
			    }  
			});
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
			//热搜词采集
			try {
				if(typeof(WssNet.Client) != 'undefined'){
					var eventMap = {"url":basePath+"/portal/searchList.jsp?skey=hotword"};
					WssNet.Client.recordOnHotSearch(eventMap);
				}
			} catch (e) {}
		},
		// 输入校验
		searchValid: function(searchKey){
			var me = this;
			var str = /[\n\r\'\"\\|;$+`~%!#^=''?~！#￥ 　……&——‘”“'？*()（），,。、《》<>：；|/\\{}｛｝【】\[\]]/;
			if(searchKey==null || searchKey==""){
				art.dialog({
		    		lock : true,
		    		title : '温馨提示',
		    		content : '请输入关键词进行查询!',
		    		ok : function() {
		    		}
		    	})
		    	return;
			}
		    if(str.test(searchKey)){
		    	art.dialog({
		    		lock : true,
		    		title : '温馨提示',
		    		content : '您输入的内容含有特殊字符，请重新输入!',
		    		ok : function() {
		    		}
		    	})
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
			window.location.href = basePath + "/portal/searchList.jsp?skey="+escape(searchKey);
		    
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
			if(view_length > 5){
				search_histories_new.shift(); //把数组的第一个元素从其中删除，并返回第一个元素的值
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
				for(x in search_histories){
					if(search_histories[x].search_key.length > 5){
						search_histories[x].search_key = search_histories[x].search_key.substr(0,10)+"...";
					}else{
						search_histories[x].search_key =search_histories[x].search_key;
					}
				}
			}
			return search_histories;
		},
		/**
		 * 展示历史搜索词列表
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
		/**
		 * 初始化搜索词到cookie
		 */
		initSearchHotWordsToCookie : function(inparams){
			var me = this;
			var hotck = base64UTF8Decode($.cookie("searchhotwords_ck",{raw:true}));
			if(null==hotck || ""== hotck ){
				var areaCode = $.cookie("areaCode");  
				var portalType = $.cookie("portalType");  // "0"- www  "1"-wap
				var request = {};
				request.region_id =  areaCode;
				request.portal_type =  portalType;
				request.max_num =  "5"; //门最大取5条
				Service.asExcute('ISearchService','searchHotWords' ,[request], function (result){
					var searchhotwords_ck = new Array(); //4个热搜索词
					var searchhotwords_ck_default; //1个默认搜索词
					if(result != null && result.length>0 ){
						for(var i=0; i<result.length; i++){
							if(i==0 ){//
								searchhotwords_ck_default=result[i].word;
							}else{
								searchhotwords_ck.push(result[i].word);
							}
						}
						
						var jsonStr = "";
						for(var i=0;i<searchhotwords_ck.length;i++){
							jsonStr = jsonStr + searchhotwords_ck[i];
							if(i != searchhotwords_ck.length-1){
								jsonStr =jsonStr + ',';
							}
						}
						$.cookie("searchhotwords_ck",base64UTF8Encode(jsonStr),{ expires: 1,path:"/",raw:true});
						$.cookie("searchhotwords_ck_default",base64UTF8Encode(searchhotwords_ck_default),{ expires: 1,path:"/",raw:true});
						me.setSearchHotWords(); //设置热搜索词列表
						if(me.getUrlParam("skey")==null ){//首页加载设置默认 
							me.setDefaultSearchHotWords();
						}
					}
					if(inparams!=null && inparams.gotoCityUrl){
						window.location.href = inparams.cityUrl; 
					}
				});
			}else{
				me.setSearchHotWords(); //设置热搜索词列表
				if(me.getUrlParam("skey")==null ){//首页加载设置默认 
					me.setDefaultSearchHotWords();
				}
				if(inparams!=null && inparams.gotoCityUrl){
					window.location.href = basePath+"/portal/index.jsp"; // 后期替换成对于城市的url
				}
			}
		},
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
			if( null!=searchhotwords_cks ){
				$(".jt-hotwords").html("");
				for(var i = searchhotwords_cks.length-1; i>=0; i-- ){
					$(".jt-hotwords").append("<span>"+searchhotwords_cks[i]+"</span>");
				}
				//搜索下拉列表绑定单击事件
				$(".jt-hotwords span").bind("click",function(){
					me.toSearch($.trim($(this).text()));
				});
			}
		},
		/**
		 * 设置默认热搜索词
		 */
		setDefaultSearchHotWords : function(){
			$(".jt-search-in").val(base64UTF8Decode($.cookie("searchhotwords_ck_default",{raw:true})));  
		}
		/*,
		dasHeadImg : function(){
			var img = $("#jt-appxq-tit-img-dd")||'';
			if(img!=""){
				var src = img.attr("src");
				var eventMap = {"url":src};
				try {
					if(typeof(cl) != 'undefined'){
						cl.recordHeadImg(eventMap);
					}
				} catch (e) {}
			}
		}*/
	});
	window.topUtil = new topUtil();
}(window));


/**用户信息*/
var LoginUserInfo = {
		params: {},
		
		showUserInfo:function(){
			var me=this;
			var nickName=$.cookie('nickName');
			if(nickName.length>12){
				nickName =nickName.substr(0,11)+"..";
			}
			$("#user_info_div").show();
			$("#login_btn_div").hide();
			var html = "<a id='user_info_center_btn_wrap' href='javascript:;' class='jt-footer-link jt-footer-login'>个人中心</a><span>|</span>";
			html += "<a id='logout_btn_wrap' href='javascript:;' class='jt-footer-link jt-footer-reg'>退出</a>";
			$("#login_btn_div_wrap").html(html);
			var user_html = [];
			user_html.push('<a href="javascript:void(0);" id="to139mail" onclick="javascript:;" class="jt-mod-navBoxUser-139mailTag">');
			user_html.push('<span id="mailNum" class="mailNum" >0</span>');
			user_html.push('</a>');
			user_html.push('<a id="welcome_words" href="javascript:void(0);" class="jt-navBoxUser-myHeLife">欢迎来到和生活!</a>');
			user_html.push('<a id="loginOutBtn" href="javascript:void(0);" class="jt-navBoxUser-logout">退出</a>');
			
			$('#user_info_div').html(user_html.join(''));
			$("#welcome_words").html(nickName+"，欢迎来到和生活!");
			
			$("#welcome_words").unbind("click").bind("click",function(){
				window.location.href=basePath+"/portal/user/userCenter.jsp";
			});
			$("#user_info_center_btn_wrap").unbind("click").bind("click",function(){
				window.location.href=basePath+"/portal/user/userCenter.jsp";
			});
			$("#loginOutBtn").unbind("click").bind("click",function(){
				me.logout();
			});
			$("#logout_btn_wrap").unbind("click").bind("click",function(){
				me.logout();
			});
			
		},
		
		init: function(){
			var me = this;
			me.getCurrUserInfo();
		},
		// 获取页头用户信息(邮件数量、昵称）
		getCurrUserInfo: function(){
			var me = this;
			/*if(loginUserId == null || loginUserId==""){
				$("#login_btn_div").show();
				$("#user_info_div").hide();
				me.delCookie();
				clearInterval(he_life_heart_beat_time_id);
				return;
			}*/
			if($.cookie('nickName')){
				me.showUserInfo();
			}
			var request = {};
			request.user_id = loginUserId;
			request.req_usession_id = globalUSessionId;
			Service.excute('IUserLoginService','getCurrUserInfo' ,[request], function (reply){
				if(reply) {
					var result = reply || {};
					LoginUserInfo.params = result;
					if(result.isLogin=='1'){
						var user_info = result;
						if(!loginUserId && user_info.user_id){
							loginUserId = user_info.user_id;
							$.cookie('he_life_user_id', loginUserId);
						}
						showName = user_info.show_name;
						
						if(showName.length>12){
							showName = showName.substr(0,11)+"..";
						}
						$("#user_info_div").show();
						$("#login_btn_div").hide();
						var html = "<a id='user_info_center_btn_wrap' href='javascript:;' class='jt-footer-link jt-footer-login'>个人中心</a><span>|</span>";
						html += "<a id='logout_btn_wrap' href='javascript:;' class='jt-footer-link jt-footer-reg'>退出</a>";
						$("#login_btn_div_wrap").html(html);
						if(user_info.mailNum==""||user_info.mailNum==null|user_info.mailNum=="null"||user_info.mailNum=='undefined'){
							user_info.mailNum = "0";
						}
						
//						个别省份会覆盖user_info_div的html,这里统一设置回去
						var user_html = [];
						user_html.push('<a href="javascript:void(0);" onclick="javascript:;" class="jt-mod-navBoxUser-139mailTag">');
						user_html.push('<span id="mailNum" class="mailNum" >'+user_info.mailNum+'</span>');
						user_html.push('</a>');
						user_html.push('<a id="welcome_words" href="javascript:void(0);" class="jt-navBoxUser-myHeLife">欢迎来到和生活!</a>');
						user_html.push('<a id="loginOutBtn" href="javascript:void(0);" class="jt-navBoxUser-logout">退出</a>');
						
						$('#user_info_div').html(user_html.join(''));
						
						$("#mailNum,#mailNumWap").html(user_info.mailNum);
						$("#mailNum,#mailNumWap").attr("state", user_info.resultMail);
						$("#mailNum,#mailNumWap").attr("desc", user_info.desc);
						$("#welcome_words").html(showName+"，欢迎来到和生活!");
						
						me.initEvent();
						setInterval(checkHeartBeatTime, 6000);
					}else{
						$("#login_btn_div").show();
						$("#user_info_div").hide();
						me.delCookie();
						clearInterval(he_life_heart_beat_time_id);
					}
				}
			});
		},
		// 页头点击操作事件
		initEvent: function(){
			var me = this;
			// 139邮箱
			$("#user_info_div").find("a").eq(0).bind("click",function(){
				var mailState = $(this).find("span").attr("state");
				var desc = $(this).find("span").attr("desc");
				if(mailState == "fail"){
					art.dialog({ lock : true,title : '温馨提示',content : desc, ok : function() {} });
				}else{
					var params = {};
					params.user_id = loginUserId;
					params.portal_type = 0;
					params.usessionId = LoginUserInfo.getUrlParam("usessionID")?LoginUserInfo.getUrlParam("usessionID"):(LoginUserInfo.getUrlParam("usessionid")?LoginUserInfo.getUrlParam("usessionid"):$.cookie("usessionId"));
					Service.asExcute('ISSOService','to139Mail' ,[params], function (reply){
						if(reply != null && reply.result == "success") {
							window.open(reply.url);
						}
					});
				}
			});
			$("#welcome_words").unbind("click").bind("click",function(){
				window.location.href=basePath+"/portal/user/userCenter.jsp";
			});
			$("#user_info_center_btn_wrap").unbind("click").bind("click",function(){
				window.location.href=basePath+"/portal/user/userCenter.jsp";
			});
			$("#loginOutBtn").unbind("click").bind("click",function(){
				me.logout();
			});
			$("#logout_btn_wrap").unbind("click").bind("click",function(){
				me.logout();
			});
			// 查看通行证情况
			/*if(isUpgradeType!=null&&isUpgradeType!=''){ // 0-已升级通行证 ; 1-有通行证但是未关联; 2-用管中心没有对应的的通行证
				if(isUpgradeType=="0"){ // 已关联用户通行证，查看手机号、邮箱、通行证是否一致
					sysnFromUMC(isSysn); // 0 手机号、邮箱已和通行证同步 ; 1：手机号未同步; 2：邮箱未同步 3：手机号、邮箱未同步
				}else{
					upgrade(); // 关联/升级通行证
				}
			}*/
		},
		// 登出
		logout: function(){
			var me = this;
			var request = {};
			request.user_id = loginUserId;
			request.provID=provID;
			request.region_id=areaID;
			request.login_region_id= $.cookie('login_region_id');
			request.TGC_Ticket= $.cookie('TGC-Ticket');
			$("#user_info_div").hide();
			$("#login_btn_div").show();
			//me.delCookie();
			clearInterval(he_life_heart_beat_time_id);
			Service.asExcute('IUserLoginService','logoutPost' ,[request], function (reply){
				//往cookie写入登出需要采集的信息，后续会删除
				$.cookie('logout_flag', true);
				me.delCookie();
				window.location.href = basePath + "/portal/index.jsp";
			});
		},
		delCookie: function(){
			$.cookie('nickName',null);
			$.cookie('he_life_user_id', null);
			$.cookie('he_life_account', null);	//  当前登录用户名
			$.cookie('he_life_heart_beat_time', null);
			$.cookie('isUpgradeType', null);
			$.cookie('isSysn', null);
		},
		getCookie: function(objName) {
		    var arrStr = document.cookie.split("; ");
		    for (var i = 0; i < arrStr.length; i++) {
		        var temp = arrStr[i].split("=");
		        if (temp[0] == objName) {
		            return unescape(temp[1]).replace('"', '').replace('"', '');
		        }
		    }
		    return "";
		},
		getUrlParam: function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }
};

/*************************关联、升级用户通行证：start*******************************************/
/*function upgrade(){
	if(isUpgradeType=='1'){
		linkPassID('byclick');//关联用户通行证
	}else if(isUpgradeType=='2'){
		upPassID('byclick');//升级通行证
	}
}
function checkLINK(linkcheck){
	if(linkcheck.checked){
		addCookie("WXCS_LINKPASSID_DIALOG","OFF",{expires:365});
  	}else{
  		addCookie("WXCS_LINKPASSID_DIALOG","ON",{expires:365});
  	}
}
function checkUP(upcheck){
	if(upcheck.checked){
		addCookie("WXCS_UPPASSID_DIALOG","OFF",{expires:365});
  	}else{
  		addCookie("WXCS_UPPASSID_DIALOG","ON",{expires:365});
  	}
}

function checkSYSN(upcheck){
	if(upcheck.checked){
		addCookie("WXCS_SYSNUMC_DIALOG","OFF",{expires:365});
  	}else{
  		addCookie("WXCS_SYSNUMC_DIALOG","ON",{expires:365});
  	}
  	
}
*/

// 升级通行证
/*function linkPassID(byclick){
	var alertStr = "";
	if('byclick'!=byclick){
		var WXCS_LINKPASSID_DIALOG = getCookie('WXCS_LINKPASSID_DIALOG');
		if(WXCS_LINKPASSID_DIALOG=='OFF'){
			return;
		}
		alertStr = "<p align='left'><input type='checkbox' name='linkcheckbox' id='linkcheckbox' onclick='checkLINK(this)' />下次不再提醒</p>";
	} 
	var msg = "您已有中国移动互联网通行证，关联和生活账号之后，即可使用通行证账号登录和生活。";
	art.dialog({
		id: 'LINKPASSIDDIALOG',
		width:'auto',
		lock: true,
		title: "关联互联网通行证",
		content: "<p align='left'>"+msg+"</p>"+alertStr,
		button: [
	        {
	            name: '马上关联',
	            callback: function () {
	        		//关联互联网通行证 
	        		var request = {};
	        		request.isUpgradeType = "1";
	        		request.user_id = loginUserId;
	        		request.ip = ip;
	            	Service.asExcute('IUserLoginService','upgradeParmitNum' ,[request], function (reply){
	    				if(reply) {
	    					if(reply.msg=='success'){
	    						if('byclick'==byclick){
	    							$("#upgradeLi").css('display','none');
	    						}
	    						var content = "<p align='left'>通行证关联成功！请使用通行证号</p><p align='left'><u style='color:#3399dd'>"+reply.parmit_num+"</u>";
	    						if(reply.phone!=''&&reply.phone!=null&&reply.phone!='null'){
	    							content += "或<u style='color:#3399dd'>"+reply.phone+" </u>";
	    						}
	    						if(reply.email!=''&&reply.email!=null&&reply.email!='null'){
	    							content += "或<u style='color:#3399dd'>"+reply.email+" </u>，";
	    						}
	    						content += "及<strong style='color:#3399dd'>通行证密码</strong>登录和生活。</p><p align='left'>温馨提示：如您已有和生活账号，则该和生活账号的原密码失效。</p>";
	    						$.cookie('isUpgradeType', reply.isUpgradeType); // 更新cookie数据
	    						art.dialog({
				            		width:'auto',
				            		title:"关联互联网通行证",
				            		lock: true,
								    content: content,
								    okVal:"确定",
								    ok: function () {
								    }
								});
	    					}else{
	    						showArtDialog("关联互联网通行证失败",'关联失败');
	    					}
	    				}else{
	    					showArtDialog("关联互联网通行证失败",'关联失败');
	    				}
	    			});
	            	
	            },
	            focus: true
	        },
	        {
	            name: '跳过',
	            className:'aui_state_show',
	            callback: function () {
	            	if("byclick"!=byclick){
	            		art.dialog({
		            		width:'auto',
		            		title:"关联互联网通行证",
						    content: "<p align='left'>您也可以进入【个人中心】—【关联通行证】进行帐号关联。</p>",
						    okVal:"确定",
						    ok: function () {
						    }
						});
	            	}
	            }
	        }
		]
		});
}
*//**升级通行证，原来没有*//*
function upPassID(byclick){
	if('byclick'!=byclick){
		var WXCS_UPPASSID_DIALOG = getCookie('WXCS_UPPASSID_DIALOG');
		if(WXCS_UPPASSID_DIALOG=='OFF'){
			return;
		}
	}
	var alertStr = "";
	if("byclick"==byclick){
		
	}else{
		alertStr = "</br><p align='left'><input type='checkbox' name='upcheckbox' id='upcheckbox' onclick='checkUP(this)' />下次不再提醒</p>"
	}
		art.dialog({
			width:'auto',
			lock: true,
			title: "升级互联网通行证",
			content: "<p align='left'>请升级中国移动互联网通行证，升级后即可一证通行和生活、飞信、彩云、139邮箱等移动业务。</p>"
			+alertStr,
			button: [
		        {
		            name: '马上升级',
		            callback: function () {
		            	// 升级互联网通行证
		        		var request = {};
		        		request.isUpgradeType = "2";
		        		request.user_id = loginUserId;
		        		request.ip = ip;
		            	Service.asExcute('IUserLoginService','upgradeParmitNum' ,[request], function (reply){
		    				if(reply) {
		    					if(reply.msg=='success'){
		    						$("#upgradeLi").css('display','none');
		    						
		    						var content = "<p align='left'>通行证升级成功！请使用通行证号</p><p align='left'><u style='color:#3399dd'>"+reply.parmit_num+"</u>";
		    						if(reply.phone!=''&&reply.phone!=null&&reply.phone!='null'){
		    							content += "或<u style='color:#3399dd'>"+reply.phone+" </u>";
		    						}
		    						if(reply.email!=''&&reply.email!=null&&reply.email!='null'){
		    							content += "或<u style='color:#3399dd'>"+reply.email+" </u>，";
		    						}
		    						content += "及<strong style='color:#3399dd'>通行证密码</strong>登录和生活。</p><p align='left'>温馨提示：如您已有和生活账号，则该和生活账号的原密码失效。</p>";
		    						$.cookie('isUpgradeType', reply.isUpgradeType); // 更新cookie数据
		    						art.dialog({
					            		width:'auto',
					            		title:"升级互联网通行证",
					            		lock: true,
									    content: content,
									    okVal:"确定",
									    ok: function () {
									    }
									});
		    						
		    					}else{
		    						if(reply.regist_flag=='8005'){
		    							showArtDialog("升级互联网通行证失败",'用户已创建通行证');
		    						}else if(reply.regist_flag=='8006'){
		    							showArtDialog("升级互联网通行证失败",'密码太过简单');
		    						}else if(reply.regist_flag=='8007'){
		    							showArtDialog("升级互联网通行证失败",'手机号码非法');
		    						}else if(reply.regist_flag=='8008'){
		    							showArtDialog("升级互联网通行证失败",'邮箱地址非法');
		    						}else if(reply.regist_flag=='8009'){
		    							showArtDialog("升级互联网通行证失败",'相应通行证号的账号已存在');
		    						}else if(reply.regist_flag=='8010'){
		    							showArtDialog("升级互联网通行证失败",'系统繁忙，请稍后重试');
		    						}
		    					}
		    				}else{
		    					showArtDialog("关联互联网通行证失败",'关联失败');
		    				}
		            	});
		            },
		            focus: true
		        },
		        {
		            name: '跳过',
		            className:'aui_state_show',
		            callback: function () {
			        	if('byclick'!=byclick){
			            	art.dialog({
			            		width:'auto',
			            		title:"升级互联网通行证",
							    content: "<p align='left'>您也可以进入【个人中心】—【升级通行证】进行帐号关联。</p>",
							    okVal:"确定",
							    ok: function () {
							    }
							});
			        	}
		            }
		        }
	    	]
		});

	
}*/

/**已关联通行证，查询通行证号码、手机号、邮箱是否一致*/
/*function sysnFromUMC(sysnType){
	if(sysnType=='0'){
		return;
	}
	var alertStr = "";	
	var WXCS_SYSNUMC_DIALOG = getCookie('WXCS_SYSNUMC_DIALOG');
	if(WXCS_SYSNUMC_DIALOG=='OFF'){
		return;
	}
	alertStr = "<p align='left'><input type='checkbox' name='sysncheckbox' id='sysncheckbox' onclick='checkSYSN(this)' />下次不再提醒</p>"; 
	var msg = "";
	var warmTips = "";
	if(sysnType=='1'){//手机号未同步
		msg = "您的手机号与互联网通行证关联的手机号不一致，请同步互联网通行证。";
		warmTips = "您之前登录所用手机号码失效";
	}else if(sysnType=='2'){//邮箱未同步
		msg = "您的邮箱与互联网通行证关联的邮箱不一致，请同步互联网通行证。";
		warmTips = "您之前登录所用手机号码失效";
	}else if(sysnType=='3'){//手机号、邮箱未同步
		msg = "您的手机号、邮箱与互联网通行证关联的手机号、邮箱不一致，请同步互联网通行证。";
		warmTips = "您之前登录所用手机号码、邮箱失效";
	}
	art.dialog({
		id: 'WXCSSYSNUMCDIALOG',
		width:'auto',
		lock: true,
		title: "同步互联网通行证",
		content: "<p align='left'>"+msg+"</p>"+alertStr,
		button: [
	        {
	            name: '马上同步',
	            callback: function () {
	        		//关联互联网通行证 
	        		var request = {};
	        		request.sysnType = sysnType;
	        		request.user_id = loginUserId;
	            	Service.asExcute('IUserLoginService','sysnFromUMC' ,[request], function (reply){
	    				if(reply) {
	    					if(reply.msg=='success'){    						
	    						var content = "<p align='left'>通行证同步成功！请使用通行证号</p><p align='left'><u style='color:#3399dd'>"+reply.parmit_num+"</u>";
	    						if(reply.phone!=''&&reply.phone!=null&&reply.phone!='null'){
	    							content += "或<u style='color:#3399dd'>"+reply.phone+" </u>";
	    						}
	    						if(reply.email!=''&&reply.email!=null&&reply.email!='null'){
	    							content += "或<u style='color:#3399dd'>"+reply.email+" </u>，";
	    						}
	    						content += "及<strong style='color:#3399dd'>通行证密码</strong>登录和生活。</p><p align='left'>温馨提示："+warmTips+"。</p>";
	    						$.cookie('isSysn', reply.isSysn);
	    						art.dialog({
				            		width:'auto',
				            		title:"同步互联网通行证",
				            		lock: true,
								    content: content,
								    okVal:"确定",
								    ok: function () {
								    }
								});
	    						
	    					}else{
	    						showArtDialog("同步互联网通行证失败",'同步失败');
	    					}
	    				}else{
	    					showArtDialog("同步互联网通行证失败",'同步失败');
	    				}
	    			});
	            	
	            },
	            focus: true
	        },
	        {
	            name: '跳过',
	            className:'aui_state_show',
	            callback: function () {
	            	
	            }
	        }
		]
		});
}*/

function addCookie(name,value){
	$.cookie(name, value);
}
function getCookie(objName) {
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) {
            return unescape(temp[1]).replace('"', '').replace('"', '');
        }
    }
    return "";
}

function showArtDialog(title,msg){
	art.dialog({
		width:'auto',
		lock: true,
		title:title,
		content:msg,
		ok:function(){}
	})
}
/**********************关联、升级用户通行证：end**********************************************/
/****************************报活:start***********************************/
var count = 0;
var he_life_heart_beat_time_id;
function showTime(){
	var today = new Date();
	count = count+1;
	if(count==2){
		clearInterval(he_life_heart_beat_time_id);
	}
}
//每隔6秒，检查cookie的he_life_heart_beat_time值
function checkHeartBeatTime(){
	var he_life_heart_beat_time = getCookie('he_life_heart_beat_time');
	if(he_life_heart_beat_time==null||he_life_heart_beat_time==''){
		he_life_heart_beat_time = 0;
	}
	he_life_heart_beat_time = parseInt(he_life_heart_beat_time) + 1;
	if(he_life_heart_beat_time>250){//大于25分钟则报活一次  配置250
		addCookie("he_life_heart_beat_time",0);
		var request = {};
		request.user_id = loginUserId;
		Service.asExcute('IUserLoginService','keepAliveRequest' ,[request], function (reply){
			if(reply) {
				//报活是否成功
				if(reply.flag=='error'){
					clearInterval(he_life_heart_beat_time_id);
				}else{
					//alert("报活成功！");
					if(reply.ResultCode=='0'){//成功
						$.cookie('he_life_heart_beat_time', 0);
					}else{
						clearInterval(he_life_heart_beat_time_id);
						$.cookie('he_life_heart_beat_time', null);
					}
				}
			}
		});
	}else{
		addCookie("he_life_heart_beat_time",he_life_heart_beat_time);
	}
}

/****************************报活:end***********************************/

function getIEVersion(){
	try{
		var agent = navigator.userAgent.toLowerCase();
		var index = agent.indexOf("msie");
		if(index != -1){
			var msie = agent.substr(index+5, 3);
			return msie;
		}
	} catch(e) {
		
	}
	return null;
};

function domainUrlFilter(url){
	var href = window.location.href;
	var domain = 'wxcs.cn';
	if(href.indexOf(domain) > -1){
		if(url.indexOf(domain) == -1){
			//throw new Error('禁止访问: '+url);
			//return 'www.wxcs.cn';
			return url;
		}
	}
	return url;
}

$(function () {
	topUtil.init();
});

//跳转到应用
function goToWxcsApp(param){
	var url = param.url;
	//展示模式   0：url跳转 1：iframe内嵌  	2：其他
	var display_mode = param.display_mode;
	if(display_mode==0){  
		if(url.indexOf("?")>0){
			url = url + '&';
		}else{
			url = url + '?';
		}
		
		var sticket = param.sticket;
		var ticket = param.ticket;
		
		//四川不需要ticket
		if('/510000/'.indexOf(provID) > -1){
			ticket = '';
		}
		
		url += "areacode="+param.areacode;
		url += "&portaltype="+param.portaltype;
		if(param.columnid){
			url += "&columnid="+param.columnid;
		}
		url += "&resourceid="+param.resourceid;
		url += "&restype="+param.restype;
		url += "&"+topUtil.getBackUrl();
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
		if(loginUserId !="" && loginUserId !=null && loginUserId !="undefined"){//登录
			url = url + "&isLogin=1&user_id="+loginUserId
		}
	}else if(display_mode==1){
		url = basePath + "/portal/pullpage/resiframe.jsp?resourceid="+param.resourceid+"&portaltype="+param.portaltype+"&restype="+param.restype;
	}
	url = url+ "&display_mode="+display_mode+"&redirectType=1"; //1本站跳转 0-外站
	window.location.href = url;
}

/**适配老系统**/
function jt_toLogin(){
	window.location.href = basePath + "/portal/login.jsp?" + topUtil.getBackUrl();
}

function toRegister(){
	window.location.href = basePath + "/portal/regist.jsp";
}

function jt_loginOut(){
	topUtil.logout();
}

function jt_loginOut_win8(){
	jt_loginOut();
}
/**适配老系统**/