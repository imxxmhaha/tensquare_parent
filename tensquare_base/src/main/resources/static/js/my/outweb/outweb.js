$(	//获取金币兑换、和家相册、流量特惠、MM推荐的url地址
	$.ajax({
		type : 'GET',
		url : '/outWeb/getOutWebUrl',
		data : {},
		dataType : 'json',
		success : function(data) {
			console.info(data);
			if(data.returnCode=="001000"){
				var paramList=data.data.paramList;
				if(paramList){
					for(var i=0 ; i< paramList.length ; i++){
						//金币兑换
						if(paramList[i].pl_code=='EQUITY_BUSINESS'){
							$('#goldExchange').attr('onclick', 
									'javascript:splicingGoldExchange(\''+paramList[i].pl_val+'\')');
						}else if(paramList[i].pl_code=='FLYING_HALL'){
							//流量特惠
							$('#flyying_hall').attr('href','javascript:splicingOutWeb(\''+paramList[i].pl_val+'\',\''+'流量特惠'+'\')');
						}else if(paramList[i].pl_code=='AND_PHOTO'){
							//和家相册
							$('#and_photo').attr('href','javascript:splicingOutWeb(\''+paramList[i].pl_val+'\',\''+'和家相册'+'\')');
						}else if(paramList[i].pl_code=='RECOMMEND'){
							//MM推荐
							$('#recommend').attr('href','javascript:splicingOutWeb(\''+paramList[i].pl_val+'\',\''+'精品应用'+'\')');
						}
					}
				}
			}
		},
		error : function(xhr, type) {
			console.error(xhr);
			console.error(type);
		}
	}),
	//获取139邮箱url地址
	$.ajax({
		type : 'GET',
		url : '/outWeb/getEmailUrl',
		data : {},
		dataType : 'json',
		success : function(data) {
			console.info(data);
			if(data.returnCode=="001000"){
				if(data.data){
					$('#email').attr('href','javascript:splicingOutWeb(\''+data.data+'\',\''+'139邮箱'+'\')');
				}
			}
		},
		error : function(xhr, type) {
			console.error(xhr);
			console.error(type);
		}
	})
);

//点击金币兑换后，后台组装请求参数
function splicingGoldExchange(url){
	url = encodeURIComponent(url);
	window.location.href="/outWeb/splicingGoldExchangeParams?url="+url+"&resName="+"金币兑换";
}
//点击和家相册、流量特惠、MM推荐、139邮箱,组装参数
function splicingOutWeb(url,resName){
	url = encodeURIComponent(url);
	window.location.href="/outWeb/splicingOutWeb?url="+url+"&resName="+resName;
}

//金币兑换、和家相册、流量特惠、MM推荐、139邮箱，调用后台接口，完成跳转
//function entryOutWeb(url){
//	window.location='/appPage?url='+url+'&resName='+'金币兑换';
//}





