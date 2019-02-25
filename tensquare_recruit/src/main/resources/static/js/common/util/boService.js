/**
 * option        : 请求参数  用法参看 TestJsonConverter.html
 * @author x_liuyunhui
 */
Package("mm.common.util.boService");
mm.common.util.boService = {

    //发送请求
    sendRequest: function(options){
    
        var containerName = options.nodeName;
        if (!containerName) {
            return;
        }
        var setting = {
            type: "POST",
            success: function(json){
                if (jQuery.isFunction(options.success)) {
                    options.success(json);
                }
                else {
                    mm.common.util.boService.success(containerName,json,options);
                }
            },
            beforeSend: function(json){
                if (jQuery.isFunction(options.beforeSend)) {
                    options.beforeSend(json);
                }
                else {
                    mm.common.util.boService.show(containerName, "loading");
                }
            },
			startLoad: function(json){
                if (jQuery.isFunction(options.beforeSend)) {
                    options.beforeSend(json);
                }
                else {
                    mm.common.util.boService.show(containerName, "loading");
                }
            },
            error: function(json){
                if (jQuery.isFunction(options.error)) {
                    options.error(json);
                }
                else {
                    mm.common.util.boService.error(containerName, options);
                }
            }
        }
        if (!options.url) {
            options.url = "/portal/web/search";
        }
		if(options.async != undefined)
		{
			setting.async = options.async;
		}
        if (options.pagePanel) { //分页请求
            setting.proxyUrl = options.url;
            setting.parameters = options.parameters;
            var perPage = 10;
            if (options.perPage) {
                perPage = options.perPage;
            }
            setting.perPage = perPage;
            mm.ui.pagination.create(options.pagePanel, setting);
        }
        else { //非分页请求
            setting.data = options.parameters;
            mm.common.business.service.send(options.url,setting);
        }
        
    },
    /**
     * 成功处理方法
     * @param {Object} containerName
     * @param {Object} json
     * @param {Object} pagePanel
     */
    success: function(containerName,json,options){
        var pagePanel = options.pagePanel;
        if (pagePanel) { //如果有 分页对象 先隐藏
            pagePanel.hide();
        }
        if (!mm.common.util.boService.parseRetCode(containerName, json.ret, options)) {
            return;
        }
        //判断响应是否有数据
        if (mm.common.util.boService.isEmpty(json)) {
            mm.common.util.boService.show(containerName, "none");
            return;
        }
        mm.common.util.JsonConverter.parse(containerName, json); //遍历解析返回的json数据 并替换页面元素
        mm.common.util.boService.show(containerName, "success");
        if (pagePanel) {
            pagePanel.show();
        }
    },
    /**
     * 异常处理方法
     * @param {Object} containerName
     * @param {Object} json
     * @param {Object} pagePanel
     */
    error: function(containerName,options){
		
        var retry = $("[key='retry']", $("#" + containerName + "_error"));
        if (retry) {
			retry.unbind().click(function(){
				mm.common.util.boService.sendRequest(options);
			});
        }
        mm.common.util.boService.show(containerName, "error");
    },
	
	 /**
     * 返回码解析方法
     * @param {Object} containerName
     * @param {Object} ret
     * @param {Object} options
     */
    parseRetCode: function(containerName, ret, options){
    
        var isSuccess = false;
        if (ret == 0) {
            isSuccess = true;
        }
		//通用返回码解析
        if (jQuery.isFunction(options.parseRetCode)) {
            try {
                isSuccess = options.parseRetCode(ret);
            } 
            catch (e) {
            
            }
        }else{
			 mm.common.util.boService.error(containerName, options);
		}
        return isSuccess;
        
    },
    show: function(containerName, show){
		var showObj = $("#" + containerName + "_" + show);
		if(!showObj)
		{
			return;
		}
        var loading = $("#" + containerName + "_loading");
        var none = $("#" + containerName + "_none");
        var success = $("#" + containerName + "_success");
        var error = $("#" + containerName + "_error");
        if(none)
		{
			 none.hide();
		}
        if(success)
		{
			 success.hide();
		}
        if(error)
		{
			 error.hide();
		}
        if(loading)
		{
			 loading.hide();
		}
        showObj.show();
        return;
    },
    //判断返回的数据是否为空
    isEmpty: function(json){
        if (json.totalRecord == 0 || !json.data) {
            return true;
        }
        
        if (typeof json.data == 'object' && typeof json.data.length != 'number') {
            var a = 0;
            for (var o in json.data) {
                a++;
                break;
            }
            if (a == 0) //返回的数据为 {} 比如 ： {"data":{},"ret":0}
            {
                return true;
            }
        }
        if (typeof json.data.length == 'number' && json.data.length <= 0) { // 数据对象 没有数据 返回格式 为 {"data":[],"ret":0}
            return true;
        }
        return false;
    }
    
}


