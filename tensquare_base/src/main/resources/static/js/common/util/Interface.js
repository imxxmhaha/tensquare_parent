/**
 * 接口
 * @author lishuangquan
 */
Package("mm.common.util.Interface");
mm.common.util.Interface = function(name, methods){
	if (arguments.length != 2) {
		throw new Error("Interface arguments length is " + arguments.length + ", but expected exactly 2.");
	}
	this.name = name;
	this.methods = [];
	for (var i = 0, len = methods.length; i < len; i++) {
		if (typeof methods[i] !== 'string') {
			throw new Error("Interface method names must as a string.");
		}
		this.methods.push(methods[i]);
	}
};
Package("mm.common.util.Interface.ensureImplements");
mm.common.util.Interface.ensureImplements = function(object){
	if (arguments.length < 2) {
		throw new Error("EnsureImplements arguments length is " + arguments.length + ", but expected at least 2.");
	}
	for (var i = 1, len = arguments.length; i < len; i++) {
		var _interface = arguments[i];
		if (_interface.constructor !== mm.common.util.Interface) {
			throw new Error("EnsureImplements expects arguments two and above to be instances of Interface.");
		}
		for (var j = 0, methodsLen = _interface.methods.length; j < methodsLen; j++) {
			var method = _interface.methods[j];
			if (!object[method] || typeof object[method] !== 'function') {
				throw new Error("EnsureImplements: object does not implement the " +
				_interface.name +
				". interface. Method " +
				method +
				" was not found.");
			}
		}
	}
};

