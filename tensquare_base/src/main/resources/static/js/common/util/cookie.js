/**
 * 操作cookie
 * 使用方法：
 * 		mm.common.util.cookie.setCookie(name, value, options); //设置cookie，如果name为null或''，则删除cookie
 * 		mm.common.util.cookie.getCookie(name);					//读取cookie
 *
 * 其中： options = {
 * 			expires:有效期
 * 			path:路径
 * 			domain:域名
 * 			secure:true/false 只有在https下有效，为true向服务器提交cookie
 * 		}
 *
 * @author lishuangquan
 */
Package("mm.common.util.cookie");
mm.common.util.cookie = {
	setCookie: function(name, value, options){
		var settings = {
			expires: 24 * 60 * 60 * 1000,
			path: '/',
			domain: '',
			secure: false
		};
		for (i in settings) {
			if (typeof(options[i]) === 'undefined') 
				options[i] = settings[i];
		}
		if (typeof value === 'undefined' || value === null) {//value不存在或为null则删除cookie
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires!=0 && typeof options.expires === 'number'  ) {
			var date = new Date();
			date.setTime(date.getTime() + (options.expires * 1000));
			expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		}
		var path = options.path ? '; path=' + options.path : '';
		var domain = options.domain ? '; domain=' + options.domain : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	},
	getCookie: function(name){
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i].replace(/^\s*|\s*$/g, '');
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};
