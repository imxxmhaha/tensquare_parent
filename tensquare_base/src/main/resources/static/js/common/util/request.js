/**
 * 取URL请求参数，支持参数数组
 * @author lishuangquan
 */
Package("mm.common.util.request");
mm.common.util.request = {
	parameters: null,
	parameterArrs: null,
	getParameters: function(){
		if (this.parameters != null) {
			return this.parameters;
		}
		var query = (location.search).replace("?", "");
		var parameters = {};
		if (!query) {
			return parameters;
		}
		var Pairs = query.split(/[;&]/);
		for (var i = 0; i < Pairs.length; i++) {
			var KeyVal = Pairs[i].split('=');
			var key = '';
			var val = '';
			if (!KeyVal) {
				continue;
			} else if (KeyVal.length != 2) {
				var p = Pairs[i];
				key = decodeURIComponent(decodeURIComponent(p.substring(0, p.indexOf("="))));
				val = decodeURIComponent(decodeURIComponent(p.substring(p.indexOf("=") + 1, p.length)));
			} else {
				key = decodeURIComponent(decodeURIComponent(KeyVal[0]));
				try{
					val = decodeURIComponent(decodeURIComponent(KeyVal[1]));
				}catch(e){
					if (gb2312decode) {
						val = gb2312decode(KeyVal[1]);
					}
				}
			}
			//parameters[key] = val.replace(/\+/g, ' ');
			parameters[key] = val;
		}
		this.parameters = parameters;
		return parameters;
	},
	getParameter: function(parameterName){
		if (!parameterName) {
			return null;
		}
		var parameterValue = this.getParameters()[parameterName];
		if (parameterValue == '' || parameterValue) {
			return parameterValue;
		} else {
			return null;
		}
	},
	getParameterArrs: function(){
		if (this.parameterArrs != null) {
			return this.parameterArrs;
		}
		var query = decodeURIComponent(location.search).replace("?", "");
		query = decodeURIComponent(query);
		var parameterArrs = {};
		if (!query) {
			return parameterArrs;
		}
		var Pairs = query.split(/[;&]/);
		for (var i = 0; i < Pairs.length; i++) {
			var KeyVal = Pairs[i].split('=');
			var key = '';
			var val = '';
			if (!KeyVal) {
				continue;
			} else if (KeyVal.length != 2) {
				var p = Pairs[i];
				key = p.substring(0, p.indexOf("="));
				val = p.substring(p.indexOf("=") + 1, p.length);
			} else {
				key = KeyVal[0];
				val = KeyVal[1];
			}
			val = val.replace(/\+/g, ' ');
			if (typeof parameterArrs[key] == 'undefined') {
				parameterArrs[key] = new Array(val);
			} else {
				parameterArrs[key].push(val);
			}
		}
		this.parameterArrs = parameterArrs
		return parameterArrs;
	},
	getParameterArr: function(parameterName){
		if (!parameterName) {
			return null;
		}
		var parameterValue = this.parameterArrs()[parameterName];
		if (parameterValue == '' || parameterValue) {
			return parameterValue;
		} else {
			return null;
		}
	},
	encodeURIComponent:function(url){
		var urlPairs= url.split("?");
		var urladder=urlPairs[0]; 
		var query = urlPairs[1];
		var urlparams="";
		var Pairs = query.split(/[;&]/);
		for (var i = 0; i < Pairs.length; i++) {
			var KeyVal = Pairs[i].split('=');
			var key = '';
			var val = '';
			if (!KeyVal) {
				continue;
			} else if (KeyVal.length != 2) {
				var p = Pairs[i];
				key = encodeURIComponent(p.substring(0, p.indexOf("=")));
				val = encodeURIComponent(p.substring(p.indexOf("=") + 1, p.length));
			} else {
				key = encodeURIComponent(KeyVal[0]);
				try{
					val = encodeURIComponent(KeyVal[1]);
				}catch(e){
					if (gb2312decode) {
						val = gb2312decode(KeyVal[1]);
					}
				}
			}
			if (i == 0) {
				urlparams += "?"+key + "=" + val;
			}else{
				urlparams += "&"+key + "=" + val;
			}
		}
		return urladder+urlparams;
	}
};

