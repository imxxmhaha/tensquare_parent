/**
 * 本组件提供将 json 格式的数据转换成 html 的功能
 * @param nodeName : 带解析的节点名称 ； json  用法参看 TestJsonConverter.html
 * @author  x_liuyunhui
 */
Package("mm.common.util.JsonConverter");
mm.common.util.JsonConverter = {
	//解析入口
    parse: function(nodeName, json){
        var obj = document.getElementById(nodeName);
        if (!obj) {
            return;
        }
		var node = $(obj);
		var cacheData = node.data(nodeName);
		if(!cacheData)
		{
			cacheData = node.html();
		    node.data(nodeName , cacheData);
		}
		else
		{
			node.html(cacheData);
		}
		mm.common.util.JsonConverter.parseJson(obj, json);
    },
    //解析json数据
    parseJson: function(node, json){
		
		if (node.nodeType == 3) { //文本
            var text = node.data;
            text = mm.common.util.JsonConverter.repalceText(text, json);
            node.replaceData(0, node.data.length, text);
        }
        else if (node.nodeType == 1) { //元素
			
            mm.common.util.JsonConverter.repalceAttr(node, json); // 替换node属性中的值
            mm.common.util.JsonConverter.bindEvent(node,json);//绑定事件 
            var objNodeList = node.childNodes;
            if (objNodeList.length > 0) //需要递归
            {
				for (var a = 0; a < objNodeList.length; a++) {
					mm.common.util.JsonConverter.parseJson(objNodeList[a], json);
		        }
            }
			mm.common.util.JsonConverter.iterativeList(node, json); //判断是否有 list 属性 有则迭代 
			
        }
    },
    /**
     * 替换文本值
     * @param {Object} text
     * @param {Object} json
     */
    repalceText: function(text, json){
        var op = text.match(/\{.*?\}/g);
        if (op) {
            for (var i = 0; i < op.length; i++) {
                var str = op[i].substring(1, op[i].length - 1); //去掉 {}
                var index = -1;
                if (str.indexOf(',') > -1) { //判断是否需要截字
                    var agr = str.split(",");
                    str = agr[0];
                    index = agr[1];
                }
                var dv = " "; 
			    if (str.indexOf(':') > -1) { // 含有默认值
                    var agr = str.split(":");
                    str = agr[0];
                    dv = agr[1];
                }
				var v = "";
                try {
                    v = eval("json." + str)
                } 
                catch (e) {
                }
				if(!v) //值不存在 赋默认值
				{
					v = dv;
				}
				
                if (index > -1 && v.blength() > index) {
                    v = v.bSubString(index) + "...";
                }
                text = text.replace(op[i], v);
            }
        }
        return text;
    },
     /**
     * 替换属性值
     * @param {Object} node
     */
    repalceAttr: function(node, json){
        var attr = node.attributes;
        for (var i = 0; i < attr.length; i++) { //属性替换
            var attrValue = attr[i].value;
            if (attr[i].name == "href" || attr[i].name == "src") {
                attrValue = attrValue.substring(attrValue.lastIndexOf('/') + 1, attrValue.length);
				attrValue = attrValue.replace('%7B','{');
				attrValue = attrValue.replace('%7D','}');
            }
			if(attrValue && attrValue.indexOf("{") > -1)
			{
				var text = mm.common.util.JsonConverter.repalceText(attrValue, json);
	            if (attrValue != text) {
	                if (attr[i].name == "href" || attr[i].name == "src") {
	                    text = encodeURI(text);
	                }
					if('class' == attr[i].name )
					{
						$(node).removeClass();
						$(node).addClass($.trim(text));
					}else
					{
						 node.setAttribute(attr[i].name, $.trim(text));
					}
	            }
				
			}
          
        }
    },
    /**
     * 绑定事件
     * @param {Object} node
     */
    bindEvent: function(node,json){
        try {
            var func = node.getAttribute("function"); //获取元素绑定的事件
            if (func) {
                var index = func.indexOf('|');
                var event = index > -1 ? func.substr(0, index) : "auto";
                var method = index > -1 ? func.substr(index + 1, func.length) : func;
                if (event == 'auto') {
                    eval(method);
                }
                else {
                    $(node).unbind().bind(event, function(){
                        eval(method);
                    });
                }
            }
        } 
        catch (e) {
			//alert(e);
        }
    },
    /**
     * 迭代集合
     * @param {Object} node
     */
    iterativeList: function(node, json){
        var listName = node.getAttribute("list");
        if (listName) {
            try {
                var nodeObj = $(node);
                var list = eval(listName); // 要迭代的集合
                if (typeof list != 'object' || typeof list.length != 'number') {
                    return;
                }
                var name = node.getAttribute("name");
                if (!name || name == null) {
                    throw new Error("node " + node.tagName + " is undefined (name) attribute ");
                }
				//支持多模板适配
				var flagV = -1;
				if(name.indexOf(":") != -1)
				{
					var tmpInfo = name.split(":");
					name = tmpInfo[0];
					flagV = tmpInfo[1] * 1;
				}
                var templateName = name + "_template";
                var template = nodeObj.data(templateName);
                if (!template) {
                    template = document.getElementById(templateName);
                    nodeObj.data(templateName, template);
                }
                if (!template) {
                    throw new Error(" template (" + templateName + ") is not exist ");
                }
				var template2 = null;
				if(flagV > 0)
				{
					var template2Name = name + "2_template";
	                template2 = nodeObj.data(template2Name);
	                if (!template2) {
	                    template2 = document.getElementById(template2Name);
	                    nodeObj.data(template2Name, template2);
	                }
	                if (!template2) {
	                    throw new Error(" template (" + template2Name + ") is not exist ");
	                }
				}
                
                nodeObj.empty();
                
                var size = node.getAttribute("size");
                size = size ? size : list.length;
                
                for (var i = 0; i < size; i++) {
                    if (i < list.length) {
						var cloneTemp = null;
						if(i < flagV)
						{
							cloneTemp = template2.cloneNode(true);
						}else{
							cloneTemp = template.cloneNode(true);
						}
						$(cloneTemp).removeAttr("id").show().appendTo(nodeObj);
                        mm.common.util.JsonConverter.parseJson(cloneTemp, list[i]);
                        
                    }
                    else {
                        var defaultKey = name + "_default";
                        var defaultRow = nodeObj.data(defaultKey);
                        if (!defaultRow) {
                            defaultRow = document.getElementById(defaultKey);
                            nodeObj.data(defaultKey, defaultRow);
                        }
                        if (defaultRow) {
                            var cloneRow = defaultRow.cloneNode(true);
                            $(cloneRow).removeAttr("id").show().appendTo(nodeObj);
                        }
                    }
                }
            } 
            catch (e) {
                alert(e.description);
                throw e;
            }
        }
    }
};
(String.prototype.blength = function(){

    var length = 0;
    for (var i = 0; i < this.length; i++) {
        length++;
        if (this.charCodeAt(i) > 127) {
            length++;
        }
    }
    return length;
    
});
(String.prototype.bSubString = function(len){

    var length = 0;
    var subStr = "";
    for (var i = 0; i < this.length; i++) {
        length++;
        if (length > len) {
            break;
        }
        if (this.charCodeAt(i) > 127) {
            length++;
            if (length <= len) {
                subStr += this.charAt(i);
            }
        }
        else {
            subStr += this.charAt(i);
        }
    }
    return subStr;
    
});

