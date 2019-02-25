/**
 * 观察者设计模式
 * @author lishuangquan
 */
Package("mm.common.design.Observer");
mm.common.design.Observer = {
	name: '',
	update: function(){
		//没有实现
	}
};
Package("mm.common.design.Subject");
mm.common.design.Subject = {
	name: '',
	observers: [],//观察者对象集合
	add: function(obj){//添加观察者对象
		this.observers.push(obj);
	},
	del: function(obj){//删除观察者对象
		var name = '';
		if (typeof(obj) === 'string') {
			name = obj;
		} else {
			name = obj.name;
		}
		if (name) {
			return;
		}
		for (var key in this.observers) {
			if (this.observers[key] && this.observers[key].name === obj.name) {
				return this.observers.splice(key, 1);
			}
		}
	},
	getLength: function(){//获取观察者集合个数
		return this.observers.length;
	},
	notify: function(){//执行观察者方法
		for (var key in this.observers) {
			if (this.observers[key]) {
				this.observers[key].update();
			}
		}
	}
};

