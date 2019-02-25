jQuery(document).ready(function(){
	if(typeof(jQuery.cookie) != 'function'){
		jQuery.cookie = initCookie;
	}
});

var initCookie = function(key, value, options) {
	if (arguments.length > 1 && (value === null || typeof value !== "object")) {
		var opts = computeCookieOpts();
		options = jQuery.extend(opts, options);
		if (value === null) {
			options.expires = -1
		}
		if (typeof options.expires === "number") {
			var days = options.expires, t = options.expires = new Date();
			t.setDate(t.getDate() + days)
		}
		return (document.cookie = [
				encodeURIComponent(key),
				"=",
				options.raw ? String(value) : encodeURIComponent(String(value)),
				options.expires ? "; expires=" + options.expires.toUTCString()
						: "", options.path ? "; path=" + options.path : "",
				options.domain ? "; domain=" + options.domain : "",
				options.secure ? "; secure" : "" ].join(""))
	}
	options = value || {};
	var result, decode = options.raw ? function(s) {
		return s
	} : decodeURIComponent;
	return (result = new RegExp("(?:^|; )" + encodeURIComponent(key)
			+ "=([^;]*)").exec(document.cookie)) ? decode(result[1]) : null
}

jQuery.cookie = initCookie;

function computeCookieOpts(){
	var href = window.location.href;
	var url = href;
	var prefix = 'http://';
	if(href.indexOf(prefix) > -1){
		url = href.substr(prefix.length, url.length);
	}
	var domain = '.wxcs.cn';
	if(url.indexOf(domain) == -1){
		//domain = url.substr(0, url.indexOf(':'));
		domain = window.location.host;
	}
	if(domain.indexOf(':') > -1){
		domain = url.substr(0, url.indexOf(':'));
	}
	var options = {domain: domain, path:'/'};
	return options;
}