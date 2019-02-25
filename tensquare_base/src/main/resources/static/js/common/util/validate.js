/**
 * 检验类
 * @author lishuangquan
 */
Package("mm.common.util.validate");
mm.common.util.validate = {
	/**
	 * 判断是否为数字
	 * @param {Object} val
	 * 是则返回true,否则返回false
	 */
	isNumber: function(val){
		return this.checkReg(val, /^\d+$/);
	},
	/**
	 * 判断是否为自然数(0，1，2，3，4，……)
	 * @param {Object} val
	 * 是则返回true,否则返回false
	 */
	isNaturalNumber: function(val){
		return this.checkReg(val, /^[0-9]+$/);
	},
	/**
	 * 判断是否为整数
	 * @param {Object} val
	 * 是则返回true,否则返回false
	 */
	isInteger: function(val){
		return this.checkReg(val, /^(\+|-)?\d+$/);
	},
	/** 
	 * 判断是否为实数
	 * @param {Object} val
	 * 是则返回true,否则返回false
	 */
	isFloat: function(val){
		return this.checkReg(val, /^(\+|-)?\d+($|\.\d+$)/);
	},
	/**
	 * 检查输入字符串是否只由汉字组成
	 * @param {Object} val
	 * 通过验证返回true,否则返回false
	 */
	isZH: function(val){
		return this.checkReg(val, /^[\u4e00-\u9fa5]+$/);
	},
	/** 
	 * 判断是否为小写英文字母
	 * @param {Object} val
	 * 是则返回true,否则返回false
	 */
	isLowercase: function(val){
		return this.checkReg(val, /^[a-z]+$/);
	},
	/**
	 * 判断是否为大写英文字母
	 * @param {Object} val
	 * 是则返回true,否则返回false
	 */
	isUppercase: function(val){
		return this.checkReg(val, /^[A-Z]+$/);
	},
	/**
	 * 判断是否为英文字母
	 * @param {Object} val
	 * 是则返回true,否则返回false
	 */
	isLetter: function(val){
		return this.checkReg(val, /^[A-Za-z]+$/);
	},
	/**
	 * 检查输入对象的值是否符合E-Mail格式
	 * @param {Object} val
	 * 通过验证返回true,否则返回false
	 */
	isEmail: function(val){
		return this.checkReg(val, /^([-_A-Za-z0-9\.]+)@([-_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/);
	},
	/**
	 * 正则检查
	 * @param {Object} val
	 * @param {Object} reg
	 */
	checkReg: function(val, reg){
		if (reg.test(val)) {
			return true;
		} else {
			return false;
		}
	},
	checkMsisdn: function(mobileId){
		if (mobileId.length == 0) {
			return { ret: 1, message: "请输入手机号码！" };
		} else if (/^\d+$/.test(mobileId) == false) {
			return { ret: 2, message: "手机号码是由０－９的数字组成！" };
		} else if (mobileId.length != 11) {
			return { ret: 3, message: "手机号码是11位数字！" };
		}		
		var reg_format = /^1[3458]\d{9}$/;
		var reg_1 = /^13[456789]\d{8}$/;
		var reg_2 = /^\+?15\d{9}$/;
		var reg_3 = /^134[012345678]\d{7}$/;
		var reg_4 = /^\+?18[278]\d{8}$/;
		var reg_5 = /^\+?147\d{8}$/;
		if (!reg_format.test(mobileId)) {
			return { ret: 4, message: "您输入的手机号码不正确!" };
		}
		if (reg_1.test(mobileId) || reg_2.test(mobileId) || reg_3.test(mobileId) || reg_4.test(mobileId) || reg_5.test(mobileId)) {
			return { ret: 0, message: "手机号码正确！" };
		} else {
			return { ret: 5, message: "对不起，我们的服务暂不对非中国移动用户开放!" };
		}
	},
	compareDate: function(a, b) {
	    var arr = a.split("-");
	    var starttime = new Date(arr[0], arr[1], arr[2]);
	    var starttimes = starttime.getTime();
	    var arrs = b.split("-");
	    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
	    var lktimes = lktime.getTime();
	    if (starttimes >= lktimes) {
	    	alert("开始时间必须小于终止时间，请重新设置");
	        return false;
	    } else{	    	
	    	return true;
	    }
	},
	compareDateTime: function(a, b) {
		    var beginTimes = a.substring(0, 10).split('-');
		    var endTimes = b.substring(0, 10).split('-');
		    a = beginTimes[1] + '/' + beginTimes[2] + '/' + beginTimes[0] + ' ' + a.substring(10, 19);
		    b = endTimes[1] + '/' + endTimes[2] + '/' + endTimes[0] + ' ' + b.substring(10, 19);
		    var a = (Date.parse(b) - Date.parse(a)) / 3600 / 1000;
		    if (a>0) {
		    	return true;
		    } else {
		    	alert("开始时间必须小于终止时间，请重新设置");
		        return false;
		    }
	},
	compareDateTime2: function() {
		var a = $("#startTime").val();
		var b = $("#endTime").val();
		if (a != "" && b != "") {
		    var beginTimes = a.substring(0, 10).split('-');
		    var endTimes = b.substring(0, 10).split('-');
		    a = beginTimes[1] + '/' + beginTimes[2] + '/' + beginTimes[0] + ' ' + a.substring(10, 19);
		    b = endTimes[1] + '/' + endTimes[2] + '/' + endTimes[0] + ' ' + b.substring(10, 19);
		    var a = (Date.parse(b) - Date.parse(a)) / 3600 / 1000;
		    if (a>0) {
		    	return true;
		    } else {
		    	alert("开始时间必须小于终止时间，请重新设置");
		        return false;
		    }
		}
		return true;
	},
	//判断ip地址的合法性
	checkIP: function(value){
	    var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	    var reg = value.match(exp);
	    if(reg==null)
	    {
	    	alert("IP地址不合法！");
	    	return false;
	    }
	}
};

