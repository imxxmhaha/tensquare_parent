Package("mm.common.util.TableSwitch");
//构造函数
mm.common.util.TableSwitch =function(){
	this.items = [];
	this.currentlyIndex = -1;
}
//实例方法
mm.common.util.TableSwitch.prototype = {
	addItem: function(head, body){
		var self = this;
		this.items.push({
			"head": head,
			"body": body
		});
		var i= self.items.length-1;
		head.bind("click", function(){
			self.pitchOn(i);
		});
	},
	pitchOn: function(i){
		if (this.currentlyIndex != i) {
			if (this.currentlyIndex >= 0) {
				this.blur(this.currentlyIndex);
			}else{
				this.blur(0);
			}
			this.select(i);
			this.currentlyIndex = i;
		}
	},
	select: function(i){
		this.items[i].head.addClass("selected");
		this.items[i].body.show();
	},
	blur: function(i){
		this.items[i].head.removeClass("selected");
		this.items[i].body.hide();
	}
}

mm.common.util.createTableSwitch = function(){
	return new mm.common.util.TableSwitch();
}
