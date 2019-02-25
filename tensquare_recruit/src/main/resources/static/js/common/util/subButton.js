Package("terminal.common.util.subButton");

terminal.common.util.subButton = {
	// 重置，清空所有 （需要清空的ID，多个以逗号分隔）
	clearAll: function(ids)
    {
    	if (ids=="")
    	{
    		return;
    	}
    	var idArray = ids.split(",");
    	for (var i=0; i<idArray.length; i++)
    	{
    		if (idArray[i]=="")
    		{
    			continue;
    		}
    		document.getElementById(idArray[i]).value="";
    	}
    },
    // 全选 （点击的选中框ID，被操作的ID）
    selectAll: function(myChenckId,ids)
    {
    	var selectAll = document.getElementById(myChenckId).checked;
    	$("input:checkbox").each(function(i){
    		if (this.id==ids)
	    	{
	    		$(this).attr("checked",selectAll);
	    	}
    	});
    },
    // 审批操作 （表单form名称,链接url,提交时提示信息,操作信息,选中信息ID名称）
    auditOperate: function(formName, url, submitMsg, operateMsg, idName)
    {
    	$("#"+formName).attr("action",url);
    	$("#"+formName).attr("method","post");
    	var ids = 0;
    	$("input:checked").each(function(i){
    		if (this.id==idName)
    		{
    			ids++;
    		}
    	});
    	// 是否选中
    	if (ids == 0)
    	{
    		alert("请选择"+operateMsg+"！");
    		return false;
    	}
    	else
    	{
    		if (submitMsg != null &&　submitMsg.length>0)
    		{
    			if (confirm(submitMsg))
	    		{
	    			$("#"+formName).submit();
	    		}
    		}
    		else
    		{
    			$("#"+formName).submit();
    		}
    	}
    },
    // 操作 （表单form名称,链接url,提交时提示信息,操作信息,选中信息ID名称）链接
    linkOperate: function(url, submitMsg, operateMsg, linkName,idName)
    {
    	var ids = 0;
    	$("input:checked").each(function(i){
    		if (this.id==idName)
    		{
    			ids++;
    		}
    	});
    	// 是否选中
    	if (ids == 0)
    	{
    		alert("请选择"+operateMsg+"！");
    		return false;
    	}
    	else
    	{
    		var idsArray = pas2.common.util.subButton.getIds(idName);
    		url = url + "&" + linkName +"="+idsArray;
    		if (submitMsg != null &&　submitMsg.length>0)
    		{
    			if (confirm(submitMsg))
	    		{
	    			location.href= url;
	    			return;
	    		}
    		}
    		else
    		{
    			location.href= url;
    			return;
    		}
    	}
    },
    getIds: function(idsName)
    {
    	var ids = "";
    	$("input").each(function(i){
	    	if (this.id==idsName && this.checked)
	    	{
	    		if (ids.length==0)
	    		{
	    			ids = this.value;
	    		}
	    		else
	    		{
	    			ids += "," + this.value;
	    		}  
	    	}
    	});
    	return ids;
    },
    getBatchCommitStrings: function() {
    	var checkItems = "";
    	var i = 0;
    	$("[name='checkItem']").each(function(){
    		if ($(this).attr("checked")=="checked"){
    			if (i==0) {
    				checkItems = $(this).attr("value");
    			} else {    				
    				checkItems += ","+$(this).attr("value");
    			}
    			++i;
    		}
    	});
    	return checkItems;
    },
    checkAll: function() {
	    	if ($("#checkAll").attr("checked") != undefined) {
	        	$("[name='checkItem']").each(function(){
	        		$(this).attr("checked", "checked");
	        	});
	    	} else {
	        	$("[name='checkItem']").each(function(){
	        		$(this).removeAttr("checked");
	        	});
	    	}
    },
    download: function(id, type) {
    	window.location.href = "download.do?id="+id+"&type="+type;
    },
    downloadByName: function(name) {
    	alert(name);
    	window.location.href = "download.do?fileName="+name;
    },
    notAllowEnter: function(event) {
    	if(event.keyCode!=9 && (event.keyCode<35 || event.keyCode>40)) return false;
    	return true;
    }
};