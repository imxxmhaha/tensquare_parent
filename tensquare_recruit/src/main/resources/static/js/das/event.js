
/**
 * 事件工具
 */
var WssNet = {
	defFlag : true,
	EventUtil : {
		/**
		 * 添加监听器的方法 ，参数element是对象，type是事件，handler是绑定方法
		 */
		addHandler : function(element, type, handler) {  
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if (element.attachEvent) {
				element.attachEvent("on" + type, handler);
			} else {
				element["on" + type] = handler;
			}
		},
		/**
		 * 获取事件
		 */
		getEvent : function(event) {
			return event ? event : window.event;
		},
		/**
		 * 获取事件源
		 */
		getTarget : function(event) {
			return event.target ? event.target : event.srcElement;
		}
	},
	CookieUtil : {
		c : "WSSNETID",
		s : "JSESSIONID",
		e : navigator.cookieEnabled,
		/**
		 * 获取cookie值
		 */
		get : function(name) { 
			if (!this.e)
				return "";
			var ck = document.cookie;
			var cookieName = encodeURIComponent(name) + "=";
			var cookieStart = ck.indexOf(cookieName);
			var cookieValue = "";
			if (cookieStart > -1) {
				var cookieEnd = ck.indexOf(";", cookieStart);
				if (cookieEnd == -1) {
					cookieEnd = ck.length;
				}
				cookieValue = decodeURIComponent(ck.substring(cookieStart + cookieName.length, cookieEnd))
			}
			return cookieValue;
		},
		/**
		 * cookie写值
		 */
		set : function(name, value, expires) { 
			if (!this.e)
				return;
			var cookieText = encodeURIComponent(name) + "="
					+ encodeURIComponent(value);
			if (expires instanceof Date) {
				cookieText += ";expires=" + expires.toGMTString();
			}
			document.cookie = cookieText;
		},
		/**
		 * 移除cookie值
		 */
		unset : function(name) { 
			if (!this.e)
				return;
			this.set(name, "", new Date(0));
		},
		getSessId : function() { //获取sessionId
			return this.get(this.s) || this.get(this.s.toLowerCase());
		},
		getCookId : function() { //获取cookieId 独立访客标识
			var cookId = '';
			try {
				var d = new Date();
				cookId = "" + d.getFullYear() + d.getMonth() + d.getDate()+ "-" + Math.floor(Math.random() * 1000000);
			} catch (e) {
			}
			return cookId;
		},
		getRandomString : function(len) {
			len = len || 32;
			var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
			var maxPos = chars.length;
			var pwd = '';
			for (i = 0; i < len; i++) {
				pwd += chars.charAt(Math.floor(Math.random() * maxPos));
			}
			return pwd;
		}
	},
	/**
	 * 封装dom获取页面元素的工具
	 */
	DomUtil : {   
		/**
		 * 通过id获取对象
		 */
		gi : function(id) {
			return document.getElementById(id);
		},
		/**
		 * 通过标签类名查找某个节点中所匹配标签的节点数组。
		 *  node是父对象，为空的话为document,tag为name属性值，searchClass为class值
		 */
		gc : function(searchClass, node, tag) {  
			var classElements = new Array();
			if (node == null)
				node = document;
			if (tag == null)
				tag = '*';
			var els = node.getElementsByTagName(tag);
			var elsLen = els.length;
			var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
			for (i = 0, j = 0; i < elsLen; i++) {
				if (pattern.test(els[i].className)) {
					classElements[j] = els[i];
					j++;
				}
			}
			return classElements;
		},
		/**
		 * 根据标签名称获取某个节点的元素
		 */
		gt : function(node, tag) {         
			if (node == null)
				node = document;
			if (tag == null)
				tag = '*';
			var els = node.getElementsByTagName(tag);
			return els;
		},
		/**
		 * 在检验首页用的，如果最后是/结尾，加上index.jsp
		 */
		fix : function(u) {               
			if (/\/$/.test(u))
				return u += "index.jsp";
			return u;
		}
	},
	/**
	 * 客户端相关操作
	 */
	Client : {
		params : new Array(),              //传输的客户端数据放在这里
		urlArgs : new Array(),				//当前url的参数（？号后面）
		seriesActionUrl : new Array(),     //系列他动作
		getParams : function() {
			return this.params.slice(0);
		},
		/**
		 * 客户端常量配置
		 */
		Const : {
			track_web_url : "http://caiji.wxcs.cn"
//			track_web_url : "http://120.197.235.51:9012" 
//			track_web_url : "http://10.45.54.44:12008"
		},
		getDefPara : function() {  //num参数0进入页面，1是离开页面，3是点击事件
			var para = this.params.slice(0);
			var flag = false;
			var ret = {
				para : para,
				flag : flag
			};
			return ret;
		},
		getClkPara : function(event, def) { //获取点击类数据，点击坐标，点击元素等
			var el = WssNet.EventUtil.getTarget(event);
			var de = document.documentElement;
			var clickParam = this.getParams();
			var x = event.clientX, y = event.clientY;
			var scrollx = window.pageXOffset || de.scrollLeft;
			var scrolly = window.pageYOffset || de.scrollTop;
			x += scrollx, y += scrolly;
			return clickParam;
		},
		getEleName : function(o) {
			var t = o.tagName.toUpperCase();
			var i = 0;
			try {
				i = $(this).index();
				i = i > -1 ? i : 0;
			} catch (e) {
			}
			if (t != 'HTML') {
				t = t + '(' + i + ')';
				var p = o.parentElement || o.parentNode;
				t += '>' + arguments.callee(p);
			}
			return t;
		},
		/**
		 * 初始化url信息、cookie信息、客户端信息、加载
		 */
		Init : function() {
			this.initUrlArgs(); //获取当前url的参数
			this.initCookie();
			this.initClient();
			this.onload();
		},
		/**
		 * 初始化URL参数，对url参数提前赋值给urlArgs数组
		 */
		initUrlArgs : function() {
			var search = location.search;
			if (search && search.length > 1) {
				var search = search.substring(1);
				var items = search.split('&');
				for (var index = 0; index < items.length; index++) {
					if (!items[index]) {
						continue;
					}
					var kv = items[index].split('=');
					this.urlArgs[kv[0]] = typeof kv[1] === "undefined" ? ""	: kv[1];
				}
			}
		},
		initCookie : function() {
			 var cu = WssNet.CookieUtil;
			 var ct = this.Const;
		},
		/**
		 * 初始化扩展点击事件。比如对checkbox、radio的单击
		 */
		initExtClk : function() {
			var it = WssNet.DomUtil.gc("wss_click");
			if (it && it.length > 0) {
				var vl = "";
				for (var i = 0, j = it.length; i < j; i++) {
					vl = it[i];
					WssNet.EventUtil.addHandler(vl, "click", function(event) {
						var param = WssNet.Client.getClkPara(event);
						var flag = false;
						var clitems = WssNet.DomUtil.gc("wss_trick");
						var val = "";
						for (var m = 0, n = clitems.length; m < n; m++) {
							var item = clitems[m];
							var nm = item.type;
							var nd = item.id;
							var key = "ww_" + item.id + "^" + item.type;
							switch (nm) {
								case "checkbox" :
									if (item.checked) {
										val = val ? val + "," + item.value : item.value;
									}
									break;
								case "radio" :
									if (item.checked) {
										val = item.value;
									}
									break;
								default :
									val = item.value;
							}
							param.push(key + "=" + val);
							flag = true;
						}
						if (flag) {
							WssNet.Sender("x", param);
						}
					});
				}
			}
		},
		/**
		 * 初始化客户信息。比如获取浏览器引擎、版本、操作系统等信息
		 */
		initClient : function() {
			var _engine = {
				ie : 0,
				webkit : 0,
				gecko : 0,
				opera : 0,
				khtml : 0
			}, _browser = {  //定义一些navigator.userAgent里可能会出现的浏览器类型，下面进行匹配
				se360 : 0,
				se : 0,
				maxthon : 0,
				qq : 0,
				tt : 0,
				theworld : 0,
				cometbrowser : 0,
				greenbrowser : 0,
				ie : 0,
				chrome : 0,
				netscape : 0,
				firefox : 0,
				opera : 0,
				safari : 0,
				konq : 0,
				uc : 0
			}, _platform = { //操作系统
				sys_name : navigator.platform.toLowerCase()
			}, _system = {
				win : false,
				mac : false,
				x11 : false,
				android : false
			}, _screen = screen.width + 'x' + screen.height, ua = navigator.userAgent.toLowerCase(), up = _platform.sys_name, term_name = 'pc', // 默认为pc
			mob = ["ipad", "iphone", "android", "midp", "opera mobi",
					"opera mini", "blackberry", "hp ipaq", "iemobile",
					"msiemobile", "windows phone", "symbian", "windows ce",
					"windowsce", "smartphone", "webos", "palm", "ucweb"];
			for (term in mob) {
				if (ua.indexOf(mob[term]) > -1) { //属于移动终端的，置0
					mob = "0";
					break;
				}
			}
			mob = (mob == '0' ? '0' : '1');
			if (mob == '0') {// 获取手机类型   按照移动终端的navigator.userAgent的特有格式去获取终端名称
				var agents = ua.split(";");
				if (agents != null && agents.length > 4) {
					var tn = agents[4].trim();
					if (tn.indexOf("build") != -1) {
						tn = tn.substring(0, tn.indexOf("build")).trim();
					} else {
						tn = "u";
					}
					term_name = tn;
				}
			}

			_system.win = up.indexOf("win") == 0;
			_system.mac = (up.indexOf("mac") == 0 || ua.indexOf("mac") > 0)
					? "mac"
					: false;
			_system.x11 = (up.indexOf("linux") == 0 || up == "x11")
					? "linux"
					: false;
			_system.android = ua.indexOf("android") > -1 ? "android" : false;
			if (_system.win) {
				var prefix = "windows ";
				if (/win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
					if (RegExp["$1"] == "nt") {
						switch (RegExp["$2"]) {
							case "5.0" :
								_system.win = prefix + "2000";
								break;
							case "5.1" :
								_system.win = prefix + "xp";
								break;
							case "6.0" :
								_system.win = prefix + "vista";
								break;
							case "6.1" :
								_system.win = prefix + "7";
								break;
							default :
								_system.win = prefix + "nt";
								break;
						}
					} else if (RegExp["$1"] == "9x") {
						_system.win = prefix + "me";
					} else {
						_system.win = prefix + RegExp["$1"];
					}
				}
			}
			for (var type in _engine) {
				if (typeof type === 'string') {
					var regexp = 'gecko' === type ? /rv:([\w.]+)/ : RegExp(type
							+ '[ \\/]([\\w.]+)');
					if (regexp.test(ua)) {
						_engine.version = window.opera
								? window.opera.version()
								: RegExp.$1;
						_engine[type] = parseFloat(_engine.version);
						_engine.type = type;
						break;
					}
				}
			}
			for (var type in _browser) {
				if (typeof type === 'string') {
					var regexp = null;
					switch (type) {
						case "se360" :
							regexp = /360se(?:[ \/]([\w.]+))?/;
							break;
						case "se" :
							regexp = /se ([\w.]+)/;
							break;
						case "qq" :
							regexp = /qqbrowser\/([\w.]+)/;
							break;
						case "tt" :
							regexp = /tencenttraveler ([\w.]+)/;
							break;
						case "safari" :
							regexp = /version\/([\w.]+)/;
							break;
						case "konq" :
							regexp = /konqueror\/([\w.]+)/;
							break;
						case "netscape" :
							regexp = /navigator\/([\w.]+)/;
							break;
						default :
							regexp = RegExp(type + '(?:[ \\/]([\\w.]+))?');
					}
					if (regexp.test(ua)) {
						_browser.version = window.opera ? window.opera
								.version() : RegExp.$1 ? RegExp.$1 : '';
						_browser[type] = parseFloat(_browser.version);
						_browser.type = type;
						break;
					}
				}
			}
			var pa = this.params;
			var cu = WssNet.CookieUtil;
			var du = WssNet.DomUtil;
			var urlArgsArray = this.urlArgs;
			
			var s_id = cu.get("DWRSESSIONID"); //cu.getRandomString(32)||''; 
			$.cookie("sc_id",s_id); //每次进来覆盖原来cookie里面的sc_id
			if(s_id==""){ //如果dwr中取到的为空，则去cookie里面取sc_id
				s_id = cu.get("sc_id")||'';
				if(s_id==""){ //如果cookie中取到的还是为空，则自动生成并添加一个
					s_id = cu.getRandomString(32);
					$.cookie("sc_id",s_id);
				}
			}
			
			var ck_id = urlArgsArray['ck_id']||'';
			var ctime = new Date().getTime();
			if(ck_id==""){
				ck_id = cu.get("ck_id");
			}
			if(ck_id==""){
				ck_id = s_id+ctime ||'';
				$.cookie("ck_id",ck_id,{ expires: 3560});
			}
			var zmonky = cu.get("zmonky")||'';
			if(zmonky==""){ //ck_id 拆分保存的方式，增强ck_id
				$.cookie("zmonky",s_id,{ expires: 3560});
				$.cookie("zmonkyt",ctime,{ expires: 3560});
			}
			
			
			if(window.localStorage){  //增加localStorage  设置ls_id
				var ls_id = window.localStorage.getItem("ls_id")||'';
				if(!ls_id  ||  ls_id==""){
					window.localStorage.setItem("ls_id",ck_id); //
				}
			}
			if(window.localStorage){
				pa.push("ls_id=" + window.localStorage.getItem("ls_id")||'');
			}
			pa.push("c_id=" + ck_id);
			pa.push("s_id=" +  s_id );//cu.get("DWRSESSIONID")    cu.getSessId()
			var he_life_account = cu.get("he_life_account")||'';
			if(!he_life_account || he_life_account==""){
				if(window.localStorage){  //增加localStorage  设置ls_id
					he_life_account = window.localStorage.getItem("he_life_account")||'';
				}
			}
			pa.push("account=" + he_life_account);
			var area_id = cu.get("areaID")||'';
			if(area_id==""){
				area_id = cu.get("areaCode")||'';
				if(area_id==""){
					area_id=urlArgsArray['areacode'];
				}
			}
			pa.push("area_id=" +area_id );
			var he_life_mobile_num = cu.get("he_life_mobile_num")||'';
			if(!he_life_mobile_num || he_life_mobile_num==""){
				if(window.localStorage){  //增加localStorage  设置ls_id
					he_life_mobile_num = window.localStorage.getItem("he_life_mobile_num")||'';
				}
			}
			$.cookie("he_life_mobile_num",he_life_mobile_num,{ expires: 3560});
			
			pa.push("mobile=" + he_life_mobile_num);
			pa.push("ip_addr=" + cu.get("ip"));
			//增加区域code到后台
			var spec =  cu.get("areaFullSpell")||'';  
			if(spec==""){
				var lochref = location.href;
				var spec = lochref.substring(0,lochref.indexOf(".wxcs"));
				if(spec.indexOf('http://') == 0){
					spec = spec.substr(7, spec.length); // 去除http://
				}
				if(spec.indexOf('https://') == 0){
					spec = spec.substr(8, spec.length); // 去除https://
				}
			}
			pa.push("area_full_spell=" +spec );
			pa.push("visit_url=" + du.fix(escape(escape(location.href))));
			pa.push("source_url=" + du.fix(escape(escape(document.referrer)))); //上一跳转地址
			pa.push("user_id=" + cu.get("he_life_user_id"));
			pa.push("user_code=" + cu.get("user_code"));
			pa.push("portal_type=" + cu.get("portalType")); 
			pa.push("screen_size=" + _screen); //分辨率
			pa.push("os="+ (_system.win || _system.mac || _system.x11 || _system.android));
			pa.push("terminal_type=" + mob);
			pa.push("terminal_name=" + term_name);
			pa.push("browser=" + _browser.type + " " + _browser.version);
			pa.push("attributarea=" + cu.get("he_life_region_id"));
			pa.push("account_type_tag=" + cu.get("account_type_tag"));
			pa.push("tc_account=" + cu.get("tc_account"));
			
			//初始化参数到cookie
			$.cookie("os",(_system.win || _system.mac || _system.x11 || _system.android));
			$.cookie("screen_size",_screen);
			$.cookie("terminal_type",term_name);
			$.cookie("browser", _browser.type + " " + _browser.version);
			
		},
		initSwb : function() {
			var _s = "", _l = document.embeds.length;
			for (var i = 0; i < _l; i++) {
				var em = document.embeds[i];
				var _id = em.id;
				_s += "function "
						+ _id
						+ "_DoFSCommand(command, args) {if(command==\"callJavascript\") {arg = args.split(\"#\");saveswf.save('"
						+ _id + "',arg[0],'','c');}} ";
				if (navigator.appName
						&& navigator.appName.indexOf("Microsoft") != -1
						&& navigator.userAgent.indexOf("Windows") != -1
						&& navigator.userAgent.indexOf("Windows 3.1") == -1) {
					var h = new Array();
					h.push('<script language=\"VBScript\"\>\n');
					h.push('On Error Resume Next\n');
					h.push('Sub ' + _id
							+ '_FSCommand(ByVal command, ByVal args)\n');
					h.push('	Call ' + _id + '_DoFSCommand(command, args)\n');
					h.push('End Sub\n');
					h.push('</script\>\n');
					document.write(h.join(""));
				}
			}
			if (_l > 0) {
				var script = document.createElement('script');
				script.innerHTML = _s;
				document.getElementsByTagName('head')[0].appendChild(script);
			}
		},
		/**
		 * 初始化外部链接单击参数
		 */
		initOutClk : function() {
			for (var i = 0, j = document.links.length; i < j; i++) {
				var link = document.links[i];
				if (link.host != location.host) {// 外链
					var u = link.href.toLowerCase();
					if (u.indexOf('script') >= 0)
						return;
						WssNet.EventUtil.addHandler(link, "click", function(event) {
							var curURL = location.href;
							var goURL = link.href;
							var param = WssNet.Client.getClkPara(event);
							param.push("source_url=" + escape(escape(curURL)));
							param.push("visit_url=" + escape(escape(goURL)));
							WssNet.Sender("1", param);
						});
				}
			}
		},
		/**
		 * 刷新参数
		 */
		onload : function(inParams) {
			if (/hotmap|heatmap/.test(document.referrer))
				return;
			var urlArgsArray = this.urlArgs;
			var pars = this.getParams();
			if(typeof(inParams) != 'undefined'){
				pars = inParams;
			}
			var cu = WssNet.CookieUtil;
			//应用图片
			var img = $("#jt-appxq-tit-img-dd")||'';
			if(img!=""){
				var src = img.attr("src")||'';
				if(src!=""){
					var eventMap = {"url":src};
					try {
						if(typeof(cl) != 'undefined'){
							cl.recordHeadImg(eventMap);
						}
					} catch (e) {}
				}
			}
			pars.push("columnid="+urlArgsArray['columnid']);
			var resourceid = urlArgsArray['resourceid'] || urlArgsArray['resid'] ; 
			if(typeof(resourceid)=="undefined" || ""==resourceid ){
				resourceid = urlArgsArray['rescode'] || urlArgsArray['resCode'] ; 
				if(typeof(resourceid)=="undefined" || ""==resourceid ){
					resourceid = cu.get("resourceid") || cu.get("resourceId") ; 
				}
			}
			pars.push("resourceid="+resourceid);
			pars.push("res_type="+urlArgsArray['restype']);
			WssNet.Sender("0", pars);
		},
		recordOnHotSearch: function(inParam){
			var url = inParam.url;
			var params = this.getParams();
			var newParams = [];
			var du = WssNet.DomUtil;
			for (var i = 0; i < params.length; i++) {
				var value = params[i];
				if(value.indexOf('visit_url=') == 0){
					value = 'visit_url=' + du.fix(escape(escape(url)));
				}
				else if(value.indexOf('source_url=') == 0){
					value = 'source_url=' + du.fix(escape(escape(window.location.href)));
				}
				newParams.push(value);
			};
			WssNet.Sender("hotSearch", newParams );
		},
		recordHeadImg: function(inParam){
			var url = inParam.url;
			var params = this.getParams();
			var newParams = [];
			var du = WssNet.DomUtil;
			for (var i = 0; i < params.length; i++) {
				var value = params[i];
				if(value.indexOf('visit_url=') == 0){
					value = 'visit_url=' + du.fix(escape(escape(url)));
				}
				else if(value.indexOf('source_url=') == 0){
					value = 'source_url=' + du.fix(escape(escape(window.location.href)));
				}
				newParams.push(value);
			};
			WssNet.Sender("getImg", newParams);
		}
	},
	/**
	 * 页面单击事件
	 */
	PageClk : function(event) {
		var el = this.EventUtil.getTarget(event);
		if (event && event.clientX) {// 用户点击
			if (/wss_click|wss_trick|trk_tab|track/.test(el.className))
				return;
			if (el.tagName.toUpperCase() == 'INPUT')
				return;
			var clickParam = this.Client.getClkPara(event);
			
			this.Sender("c", clickParam);
		}
	},
	/**
	 * 请求发送
	 */
	Sender : function(f, param, imgOnErrorEvent) {
		//发送请求到采集服务器
		var q = encodeURI(param.join("&"));
		q = q.replace(new RegExp("undefined|null", "gm"), "");
		var url = WssNet.Client.Const.track_web_url + "/das/tr.js?f=" + f
				+ "&" + q + "&random=" + WssNet.CookieUtil.getRandomString(32) + "&"; //&random=" + Date() + "&"
		var iswxcs = location.href.indexOf(".wxcs");
		if( iswxcs >= 0 ){ //和生活门户
			if( f == 'hotSearch' || f == '0'){
				this.SenderTo(f, url,imgOnErrorEvent);
			}
		}else{//应用
			if( f == '0' || f == 'hotSearch' || f == 'getImg'  ){
				this.SenderTo(f, url,imgOnErrorEvent);
			}
		}
		
	},
	SenderTo : function(f, url, imgOnErrorEvent) {
		var img = new Image();
		try {
			//这里虽然是on error,但是采集系统没返回正确的图片 contentType,就算正确的也是error的
			img.onerror = function(a){
				if(typeof(imgOnErrorEvent) == 'function'){
					imgOnErrorEvent.call(this, [a]);
				}
			}
		} catch (e) {
			
		}
		img.src=url;
	}
};


// 绑定window error事件，即使有错误也返回正常
/*window.onerror = function() {
	return true;
};*/
var eu = WssNet.EventUtil;
var cl = WssNet.Client;

/**
 * 定时初始化某些事件、参数
 */
setTimeout(function() {
	cl.initOutClk();
	cl.initExtClk();
	cl.initSwb();
	// 绑定page click事件
	eu.addHandler(window.document, "click", function(event) {
		WssNet.PageClk(eu.getEvent(event));
	});
}, 500);

// 页面初始化
cl.Init();
