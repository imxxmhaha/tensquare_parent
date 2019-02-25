// 保存选择的城市到cookie(点击调用)
function saveDataCookie(params){
	$.cookie('searchhotwords_ck_default', null, {path:"/"});
	$.cookie('searchhotwords_ck', null, {path:"/"});
	$.cookie('areaID', params.areaID,{ expires: 3560});
	$.cookie('areaCode', params.areaCode,{ expires: 3560});
	$.cookie('provID', params.provID,{ expires: 3560});
	$.cookie('areaName', base64UTF8Encode(params.areaName),{ expires: 3560});
	$.cookie('areaFullSpell', params.areaFullSpell,{ expires: 3560});
	
	
// 			alert(params.areaID);
// 			alert(params.areaCode);
// 			alert(params.provID);
// 			alert(base64UTF8Encode(params.areaName));
// 			alert(params.areaFullSpell);
// 			alert(params.cityUrl);

	if(params.gotoCityUrl==true){
		//window.location.href = params.cityUrl; // 生产放开此行
		window.location.href = "index.html";
	}

}
	
// 更新到最近访问cookie
function saveRecentVisitCookie(params){
	if($.cookie('recent_visit')!= null && $.cookie('recent_visit') !='') { // 有数据
		// 1、push点击的城市
		var recent_visit_arr = [];
		
		var recent_visit_json = {};
		
		recent_visit_json.areaID=params.areaID;
		recent_visit_json.areaCode=params.areaCode;
		recent_visit_json.provID=params.provID;
		recent_visit_json.areaName=params.areaName;
		recent_visit_json.areaFullSpell=params.areaFullSpell;
			
		recent_visit_arr.push(recent_visit_json);
		
		// 2、遍历cookie数据, push其他的数据(去重)
		var recent_visit_val = $.parseJSON(base64UTF8Decode($.cookie('recent_visit'))); //json字符串转json对象
		for(var i=0;i<recent_visit_val.length;i++){
			if(params.areaCode != recent_visit_val[i].areaCode) { // 去重
				recent_visit_json = {};
				
				recent_visit_json.areaID=recent_visit_val[i].areaID;
				recent_visit_json.areaCode=recent_visit_val[i].areaCode;
				recent_visit_json.provID=recent_visit_val[i].provID;
				recent_visit_json.areaName=recent_visit_val[i].areaName;
				recent_visit_json.areaFullSpell=recent_visit_val[i].areaFullSpell;
					
				recent_visit_arr.push(recent_visit_json);
			}
			
			if(3 == recent_visit_arr.length) { // 只保留3个城市
				break;
			}

		}
		
		// 保存最近访问cookie
		$.cookie('recent_visit', base64UTF8Encode(JSON.stringify(recent_visit_arr)),{ expires: 3560});
	} else { // 空cookie
		var recent_visit_arr = [];
	
		var recent_visit_json = {};
		
		recent_visit_json.areaID=params.areaID;
		recent_visit_json.areaCode=params.areaCode;
		recent_visit_json.provID=params.provID;
		recent_visit_json.areaName=params.areaName;
		recent_visit_json.areaFullSpell=params.areaFullSpell;
			
		recent_visit_arr.push(recent_visit_json);
		
		// 保存最近访问cookie
		$.cookie('recent_visit', base64UTF8Encode(JSON.stringify(recent_visit_arr)),{ expires: 3560});
	}
	
	


}


	
