Package("mm.common.util.Ajax");
mm.common.util.Ajax = function(){
	this.state    = "new";//状态有 new,wait,error,success,complete
	this.isSuccess = false;//ajax是否通过正确流程
	this.errorDiv = null;
	this.waitDiv  = null;
	this.type     = "POST";
	this.url      = "";
	this.page     = null;
	this.perPage  = 10;
	this.pageNumber=1;
	this.frugal   = true;//节约型，ajax未完成时，不会再次发送ajax请求
	this.sendOne  = false;//实现ajax只发送一次ajax.send(data)
	this.parameter=null;
	this.async    =true;//异步请求
};
mm.common.util.Ajax.prototype = {
	getIsSuccess: function(){
		return this.isSuccess;
	},
	success: function(json){},
	beforeSend: function(){},
	complete: function(){},
	error: function(){},
	beforeSuccess: function(json){},
	selfSuccess: function(json){
		this.state = "success";
		this.isSuccess = true;
		if(this.errorDiv && this.errorDiv.length>0){
			this.errorDiv.hide();
		}
		this.json = json;
	},
	afterSuccess: function(json){},
	selfBeforeSend: function(){
		this.state = "wait";
		this.isSuccess = false;
		if (this.waitDiv && this.waitDiv.length>0) {
			this.waitDiv.show();
		}
		if (this.errorDiv && this.errorDiv.length>0) {
			this.errorDiv.hide();
		}
	},
	selfComplete: function(){
		this.state = "complete";
		if (this.waitDiv && this.waitDiv.length>0) {
			this.waitDiv.hide();
		}
	},
	selfError: function(parameter, backFunction){
		this.state = "error";
        this.isSuccess = false;
		if (this.waitDiv) {
			this.waitDiv.hide();
		}
		if(this.errorDiv){
			this.errorDiv.show();
			var self = this;
			$("[key='retry']",this.errorDiv).unbind().click(function(){
				self.send(parameter, backFunction);
				return false;
			});
		}
	},
	send: function(parameter, backFunction){
		if (this.frugal == true) {//节约型，ajax未完成时，不会发送ajax请求
			if (this.state != "complete" && this.state != "new") {//不发送js
				return false;
			}
		}
		if (this.sendOne == true) {//实现当 parameter不改变时，ajax只发送一次ajax.send(data)
			if (this.state == "new" || (this.state == "complete" && !this.isSuccess)) {
				
			} else {
				if ($.toJSON(this.parameter) == $.toJSON(parameter)) {
					return false;
				}
			}
		}
		this.parameter = $.evalJSON($.toJSON(parameter));
		if (this.page) {
			this.sendPage(parameter, backFunction);
		} else {
			this.sendSimple(parameter, backFunction);
		}
		
	},
	sendPage: function(parameter, backFunction){
		var self = this;
		var options = {
			parameters: parameter,
			success: function(json){
				self.selfSuccess(json);
				self.beforeSuccess(json);
				self.success(json);
				if (backFunction) {
					backFunction(json)
				}
				if(json&&(json.totalRecord==null||json.totalRecord<=0||json.totalRecord<=self.perPage)){
					self.page.hide();
				}else{
					self.page.show();
				}
				self.afterSuccess(json);
			},
			error: function(){
				self.selfError(parameter, backFunction);
			    self.error();
			},
			startLoad: function(){
				self.selfBeforeSend();
				self.beforeSend();
			},
			overLoad: function(){
				self.selfComplete();
				self.complete();
			},
			type: this.type,
			proxyUrl: this.url,
			perPage: this.perPage,
			pageNumber:this.pageNumber||1
		};
		if(this.state=="new" && this.istatic && this.istatic()){
			this.pagination = mm.ui.pagination.create(this.page, options,this.totalRecord);
			this.isSuccess = true;
			this.selfComplete();
			return;
		}else{
			this.pagination = mm.ui.pagination.create(this.page, options);
		}
		this.state = "wait";
		this.isSuccess = false;
	},
	sendSimple: function(parameter, backFunction){
		var self = this;
		var options = {
			data: parameter,
			success: function(json){
				self.selfSuccess(json);
				self.beforeSuccess(json);
				self.success(json);
				if (backFunction) {
					backFunction(json)
				}
				self.afterSuccess(json);
			},
			error: function(){
				self.selfError(parameter, backFunction);
			    self.error();
			},
			beforeSend: function(){
				self.selfBeforeSend();
				self.beforeSend();
			},
			complete: function(){
				self.selfComplete();
				self.complete();
			},
			type: this.type,
			async:this.async
		};
		mm.common.business.service.send(this.url, options);
		this.state = "wait";
		this.isSuccess = false;
	}
};
mm.common.util.createAjax = function(){
	return new mm.common.util.Ajax();
};

mm.common.util.createBraceAjax = function(body,event,beforeSuccess){
	var ajax = mm.common.util.createAjax();	
	ajax.contentDiv = $("[key='content']", body);
	ajax.templateDiv = $("[key='template']", body);//获取展示模板
	ajax.fillDiv = $("[key='fillTemplate']", body);//
	ajax.noneDiv = $("[key='noneTemplate']", body);
	ajax.waitDiv = $("[key='waitDiv']", body);
	ajax.errorDiv = $("[key='errorDiv']", body);
	ajax.beforeSend=function(){
		this.contentDiv.empty();
		this.noneDiv.hide();
	};
    ajax.error=function(){
		this.contentDiv.empty();
		this.noneDiv.hide();
	};
	ajax.success = function(json){
		if (json.ret != 0) {
			if (json.ret == -100) {
				var message = json.message ? json.message : "";
				this.contentDiv.html(message);
			} else {
				var message = json.message ? json.message : "对不起，系统繁忙，请稍候再试！";
				this.contentDiv.html(message);
			}
		} else {
			this.contentDiv.empty();
			if(beforeSuccess){
				beforeSuccess(json);
			}
			if(json.data.length ==0){
				if(this.noneDiv.length>0){
					this.noneDiv.show();
				}else{
					if (this.fillDiv.length > 0) {
						fillContent(this.contentDiv, this.fillDiv, this.parameter.num);
					}else{
						body.hide();
					}
				}
				return ;
			}
			if (json.data.length > 0) {
				
				//避免使用Clone(),在IE6中jqery会将src和href中的值改为绝对路径或者全部变成小写
				var template = this.templateDiv.braceClone().show().removeAttr("key").removeAttr("id");
				this.contentDiv.brace(template, json.data,event);
				if(this.parameter&& this.parameter.num && json.data && json.data.length<this.parameter.num){
					if (this.fillDiv.length > 0) {
						fillContent(this.contentDiv, this.fillDiv, this.parameter.num-json.data.length);
					}
				}
			}
		}
	};
	ajax.reLoad=function(){
		this.success(this.json);
	}
	function fillContent(content, fillTemplate, noneLength){
		for (var i = 0; i < noneLength; i++) {
			content.append(fillTemplate.clone().removeAttr("key").removeAttr("id").show());
		}
	}
	return ajax;
};

mm.common.util.shelfCreateBraceAjax = function(body){
	var ajax = mm.common.util.createBraceAjax(body,mm.module.goods,function(json){
		mm.module.goods.expandData(json.data,json);
	});
	ajax.url=mm.common.business.url.fresh.goodsAdapter;
	return ajax;
};


mm.common.util.shelfCreateBraceAjaxTwo =function(body,firstNumber){
	var dynamicAjax = mm.common.util.createAjax();
	dynamicAjax.firstContent = $("[key='firstContent']", body);
	dynamicAjax.firstTemplate = $("[key='firstTemplate']", body);//获取展示模板
	dynamicAjax.secondContent  = $("[key='secondContent']", body);
	dynamicAjax.secondTemplate = $("[key='secondTemplate']", body);//获取展示模板
	dynamicAjax.firstFillTemplate = $("[key='firstFillTemplate']", body);//获取展示模板
	dynamicAjax.secondFillTemplate = $("[key='secondFillTemplate']", body);//获取展示模板
	dynamicAjax.noneDiv = $("[key='noneTemplate']", body);//获取展示模板
	dynamicAjax.waitDiv = $("[key='waitDiv']", body);
	dynamicAjax.errorDiv = $("[key='errorDiv']", body);
	dynamicAjax.url = mm.common.business.url.fresh.goodsAdapter;
	dynamicAjax.success = function(json){
		dynamicAjax.totalRecord = json.totalRecord;
		if (json.ret != 0) {
			var message = json.message ? json.message : "对不起，系统繁忙，请稍候再试！";
			alert(message);
		} else {
			mm.module.goods.expandData(json.data,json);
			this.firstContent.empty();
			this.secondContent.empty();
			this.noneDiv.hide();
			mm.common.util.appendContentBraceTwo(dynamicAjax,firstNumber,dynamicAjax.parameter.num, json.data,mm.module.goods);
		}
	};
	dynamicAjax.beforeSend = function(){
		this.firstContent.empty();
		this.secondContent.empty();
		this.noneDiv.hide();
	};
	dynamicAjax.error = function(){
		this.firstContent.empty();
		this.secondContent.empty();
		this.noneDiv.hide();
	};
	return dynamicAjax;
};


mm.common.util.appendContentBraceTwo = function(dynamicAjax, firstNumber,num, data,event){
	if(data.length==0 && dynamicAjax.noneDiv && dynamicAjax.noneDiv.length>0){
		 dynamicAjax.noneDiv.show();
		 return;
	}
	if (data.length <= firstNumber) {
		braceContent(dynamicAjax.firstContent, data, dynamicAjax.firstTemplate, mm.module.goods, 0, firstNumber);
		fillContent(dynamicAjax.firstContent, dynamicAjax.firstFillTemplate, firstNumber - data.length);
		var secondNumber = num - firstNumber;
		fillContent(dynamicAjax.secondContent, dynamicAjax.secondFillTemplate, secondNumber);
	} else {
		if (data.length > firstNumber) {
			braceContent(dynamicAjax.firstContent, data, dynamicAjax.firstTemplate, mm.module.goods, 0, firstNumber);
			braceContent(dynamicAjax.secondContent, data, dynamicAjax.secondTemplate, mm.module.goods, firstNumber);
			var secondNumber = num - data.length;
			fillContent(dynamicAjax.secondContent, dynamicAjax.secondFillTemplate, secondNumber);
		}
	}
	function braceContent(content, data, template, event, startNumber, endNumber){
		if (!startNumber) {
			startNumber = 0;
		}
		if (!endNumber) {
			endNumber = data.length;
		}
		//避免使用Clone(),在IE6中jqery会将src和href中的值改为绝对路径或者全部变成小写
		var template = template.braceClone().show().removeAttr("key").removeAttr("id");
		content.brace(template, data.slice(startNumber, endNumber), event);
	};
	function fillContent(content, fillTemplate, noneLength){
		
		if (fillTemplate && fillTemplate.length > 0) {
			for (var i = 0; i < noneLength; i++) {
				content.append(fillTemplate.clone().removeAttr("key").removeAttr("id").show());
			}
		}
	}
};










