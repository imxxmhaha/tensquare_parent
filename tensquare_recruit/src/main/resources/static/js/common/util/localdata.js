/**
 * 存储本地数据
 * @author lishuangquan
 */
Package("mm.common.util.localdata");
mm.common.util.localdata = {

	/**
	 * 浏览器类型
	 * IE：0、火狐：1
	 */
	browserType: null,
	
	/**
	 * 初始化
	 */
	init: function(){
		this.browserType = this.getBrowserType();
		if (this.browserType == 0) {
			document.documentElement.addBehavior("#default#userdata");
		}
	},
	
	/**
	 * 判断是那款浏览器
	 * IE：0、火狐：1
	 */
	getBrowserType: function(){
		var browserName = navigator.appName;
		if (browserName == "Microsoft Internet Explorer") {
			return 0;//判读是否为ie浏览器
		} else if (browserName == "Netscape") {
			return 1;//判断是否为netscape浏览器
		} else if (browserName == "Opera") {
			return 2;//判断是否为Opera浏览器
		} else {
			return -1;
		}
	},
	
	/**
	 * 保存数据
	 * @param {Object} key
	 * @param {Object} value
	 */
	set: function(key, value){
		var options = {
				expires: 60 * 60 * 24 * 360,
				path: "/"
		};
		if (this.browserType == 0) {
			//document.documentElement.load(location.hostname);
			//document.documentElement.setAttribute(key, value);
			//document.documentElement.save(location.hostname);
			mm.common.util.cookie.setCookie(key, value, options);
		} else if (this.browserType == 1) {
			try {
				globalStorage[location.hostname][key] = value;
			} 
			catch (e) {
				mm.common.util.cookie.setCookie(key, value, options);
			}
		} else {
			mm.common.util.cookie.setCookie(key, value, options);
		}
	},
	
	/**
	 * 获取数据
	 * @param {Object} key
	 */
	get: function(key){
		if (this.browserType == 0) {
			//document.documentElement.load(location.hostname);
			//var value = document.documentElement.getAttribute(key);
			var value = mm.common.util.cookie.getCookie(key);
			return value ? value : '';
		} else if (this.browserType == 1) {
			try {
				var value = globalStorage[location.hostname][key];
				if (value) {
					value += "";
				}
				return value;
			} 
			catch (e) {
				var value = mm.common.util.cookie.getCookie(key);
				return value ? value : '';
			}
		} else {//后续扩展
			var value = mm.common.util.cookie.getCookie(key);
			return value ? value : '';
		}
	},
	
	/**
	 * 删除数据
	 * @param {Object} key
	 */
	del: function(key){
		var options = {
				expires: -1,
				path: "/"
		};
		if (this.browserType == 0) {
			//document.documentElement.load(location.hostname);
			//document.documentElement.removeAttribute(key);
			mm.common.util.cookie.setCookie(key, null, options);
		} else if (this.browserType == 1) {
			try {
				globalStorage[location.hostname].removeItem(key);
			} 
			catch (e) {
				mm.common.util.cookie.setCookie(key, null, options);
			}
		} else {
			mm.common.util.cookie.setCookie(key, null, options);
			//后续扩展
		}
	}
}
mm.common.util.localdata.init();

