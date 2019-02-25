/**
 * 工具类
 *
 *
 * @author lishuangquan
 */
Package("mm.common.util.tool");
mm.common.util.tool = {

	/**
	 * 取得字符串的字节长度
	 * @param {Object} str
	 * return number
	 */
	blength: function(str){
		var len = 0;
		if (typeof(str) === 'string') {
			for (var i = str.length - 1; i >= 0; i--) {
				if (str.charCodeAt(i) > 255) {
					len += 2;
				} else {
					len++;
				}
			}
		} else if (typeof(str) === 'number') {
			str = new String(str);
			len = str.length;
		}
		return len;
	},
	
	/**
	 * 去首尾空格
	 * @param {Object} str
	 * return str;
	 */
	trim: function(str){
		if (typeof(str) === 'string') {
			return str.replace(/^\s*|\s*$/g, "");
		} else {
			return str;
		}
	},
	
	/**
	 * 去左空格
	 * @param {Object} str
	 * return str;
	 */
	triml: function(str){
		if (typeof(str) === 'string') {
			return str.replace(/^\s*/g, "");
		} else {
			return str;
		}
	},
	
	/**
	 * 去右空格
	 * @param {Object} str
	 * return str;
	 */
	trimr: function(str){
		if (typeof(str) === 'string') {
			return str.replace(/\s*$/g, "");
		} else {
			return str;
		}
	},
	
	/**
	 * 去全部空格
	 * @param {Object} str
	 * return str;
	 */
	trima: function(str){
		if (typeof(str) === 'string') {
			return str.replace(/\s/g, "");
		} else {
			return str;
		}
	}
}

