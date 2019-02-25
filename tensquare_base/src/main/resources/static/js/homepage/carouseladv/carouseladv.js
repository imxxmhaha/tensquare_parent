var params = {};
var www_page_index = 10; // 定义常量
var wap_page_index = 20; // 定义常量
var portal_type_www = 0; // 定义常量
var portal_type_wap = 1; // 定义常量
var needLogin_access_right = 1; // 定义常量

$(function(){
	params.portalType = $.cookie("portalType"); // 门户类型
	params.provID = $.cookie("provID")||"440000"; // 省ID    如果取不到 默认取广州的
	params.areaID = $.cookie("areaID")||"440100"; // 地市ID   如果取不到 默认取广州的
	if (params.portalType == portal_type_www) {
		params.column_page = www_page_index; // web首页
	} else if (portalType == portal_type_wap) {
		params.column_page = wap_page_index; // wap首页
	}
	
	showAdv();
})



// 广告位广告轮播
function showAdv(){
//	var me = this;
//	var prov_id=params.provID;
//	var region_id=params.areaID;
//	var portal_type=params.portalType;
//	var loc_page=params.column_page;
//	var user_id = $.cookie('he_life_user_id');
//	params.finger_id = new Fingerprint().get(); // 指纹id
//	var ip = $.cookie('ip');
	
	var data = {
			prov_id:params.provID,
			region_id:params.areaID,
			portal_type:params.portalType,
			loc_page:params.column_page,
			user_id:$.cookie('he_life_user_id')||"",
			ip:$.cookie('ip')
	}
    $.ajax({
        type: "get",
        url: '/ad/getADVinfo',
//        data: JSON.stringify(data),
        data: data,
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function(data){
        	console.log("获取广告成功")
        	var result = data.data;
        	console.log(result);
        	
        	var adv_info="";
//			var adv_nav="";
			//做数据排序，干预的排在2、4位置
			var isInterveneRet = new Array(); //干预数组
			var notInterveneRet = new Array();//非干预数组
			for(var i=0; i<result.length; i++){
				var ret = result[i];
				if(ret.is_intervene == 1){
					isInterveneRet.push(ret);
				}else{
					notInterveneRet.push(ret);
				}
			}
			if(isInterveneRet!=null && isInterveneRet.length>0 ){
				if(isInterveneRet.length==2){
					notInterveneRet.splice(1,0,isInterveneRet[0]);
					notInterveneRet.splice(3,0,isInterveneRet[1]);
				}else{
					notInterveneRet.splice(1,0,isInterveneRet[0]);
				}
			}
			
			
			console.log(notInterveneRet);
			//遍历广告数据
			for(var i=0; i<notInterveneRet.length; i++){
				var url = notInterveneRet[i].info_url==null?"#":notInterveneRet[i].info_url;
				var msg_type = notInterveneRet[i].msg_type || '';
				
				var ad_order_id=notInterveneRet[i].ad_order_id || '';
				var clickMonitorConfig=notInterveneRet[i].clickMonitorConfig || '';
				var showMonitorConfig=notInterveneRet[i].showMonitorConfig || '';
				var imp_medid_code_type = notInterveneRet[i].imp_medid_code_type || '';
				var logo_file = notInterveneRet[i].logo_file || '';
				
				if(!logo_file){
					continue;
				}
				
			
				adv_info += '<div class="swiper-slide">'+
								'<a href="javascript:void(0);" url="'+ url +'" restype=5 info_title="'+notInterveneRet[i].info_title+'" '+
									' msg_type="'+msg_type+'" need_login="'+notInterveneRet[i].need_login+'" info_id="'+notInterveneRet[i].info_id+'" ad_order_id="'+ad_order_id+'"  '
									+' imp_medid_code_type="'+imp_medid_code_type+'"'
									+'clickMonitorConfig="'+clickMonitorConfig+'"  showMonitorConfig="'+showMonitorConfig+'">'+
									'<img src="'+notInterveneRet[i].logo_file+'" />'+
								'</a>'+
							'</div>';
				
				//广告平台广告进行发起曝光请求
				if(msg_type=="2"){ //广告平台广告
					var redParm={};//记录参数 
					redParm.portal_type=portalType;
					redParm.eventType="1";//事件类型1表示曝光，2表示点击
					
					var udata_appid = "300011006908";
					var event="AdExposed";
					
					if(portalType == "1"){
						//集团曝光
						var ad_insert_code_wap = notInterveneRet[i].ad_insert_code_wap;
						if(!showMonitorConfig==""){
							ad_insert_code_wap=showMonitorConfig;
						}
						$("#advPlatShow").html("<script type='text/javascript' src='"+ad_insert_code_wap+"' />");
						redParm.compRedType="3";//集团插码
						
						//有数曝光
						var label= notInterveneRet[i].label_wap;
						label=ad_order_id+"@@"+label;
//						_udata.push(["AdExposed",label]);
						
						var lv=encodeURIComponent(label);
						var udata_wap="http://120.197.233.121/udata/u.gif?h=750&w=1440&ct="
							+new Date().getTime()+"&si="+udata_appid+"&cu="
							+ encodeURIComponent(window.location.host)
							+"&v=1.0&s=1500347894640218363&f=3&c=1428456744583&et="
							+event+"&lv="+lv+"&cp="+ encodeURIComponent(window.location.href);
						
						$("#udataUpload").html("<script type='text/javascript' src='"+udata_wap+"' />");
						
						redParm.udataRedType="4";
						redParm.label=label;
						
					}else{
						//集团曝光
						var ad_insert_code_www = notInterveneRet[i].ad_insert_code_www;
						if(!showMonitorConfig==""){
							ad_insert_code_www=showMonitorConfig;
						}
						$("#advPlatShow").html("<script type='text/javascript' src='"+ad_insert_code_www+"' />");
						redParm.compRedType="3";//集团插码
						//有数曝光
						var label= notInterveneRet[i].label_www;
						label=ad_order_id+"@@"+label;
//						_udata.push(["AdExposed",label]);
						
						var lv=encodeURIComponent(label);
						var udata_www="http://120.197.233.121/udata/u.gif?h=750&w=1440&ct="
							+new Date().getTime()+"&si="+udata_appid+"&cu="
							+ encodeURIComponent(window.location.host)
							+"&v=1.0&s=1500347894640218363&f=3&c=1428456744583&et="
							+event+"&lv="+lv+"&cp="+ encodeURIComponent(window.location.href);
						
						$("#udataUpload").html("<script type='text/javascript' src='"+udata_www+"' />");
						
						redParm.udataRedType="4";
						redParm.label=label;
					}
					
					
					
				    $.ajax({
				        type: 'post',
				        url: '/ad/recodeAdInfo',
				        data: JSON.stringify(redParm),
				        dataType: "json",
				        contentType: "application/json;charset=UTF-8",
				        success: function(data){
				        	console.log("曝光成功");
				        }
				    })
				    
				}
				
			}
			
			$("#ad-swiper-wrapper").append(adv_info);
			// 广告上报
			advRecord();
			
        },
        error: function(e){
          console.log(e);
        }
    })
}



// 广告上报
function advRecord(){
	$("#ad-swiper-wrapper div").each(function(index, ele){
		$(this).unbind("click").click(function(){
			var msg_type = $(ele).find("a").attr("msg_type")||'';
			var info_id = $(ele).find("a").attr("info_id")||'';
			var url = $(ele).find("a").attr("url")||'';
			var ad_order_id=$(ele).find("a").attr("ad_order_id")||'';
			var info_title=$(ele).find("a").attr("info_title")||'';
			
			var clickMonitorConfig=$(ele).find("a").attr("clickMonitorConfig")||'';
			var showMonitorConfig=$(ele).find("a").attr("showMonitorConfig")||'';
			
			var imp_medid_code_type=$(ele).find("a").attr("imp_medid_code_type")||'';
			
			if(msg_type!='' && msg_type=="2"){
				var params = {};
				params.portal_type = portalType;
				params.info_id = info_id;
				params.user_id = $.cookie('he_life_user_id');
				params.finger_id = new Fingerprint().get(); //指纹id
				params.ip = $.cookie('ip');
				
				params.imp_medid_code_type = imp_medid_code_type;
				
				
				
				 $.ajax({
				        type: 'post',
				        url: '/ad/reportAdvertisement',
				        data: JSON.stringify(params),
				        dataType: "json",
				        contentType: "application/json;charset=UTF-8",
				        success: function(data){
				        	var result = data.data;
				        	if(result.status=='success'){
//				        		console.log("广告上报成功  result:"+result);
								var redParm={};//记录参数
								redParm.portal_type=portalType;
								redParm.eventType="2";//点击事件
								
								var medid=result.medid;
								var tagid=result.tagid;
								var sspid=result.sspid;
								
								var udata_appid = "300011006908";
								var event="ADClick";
								var udata_w='';
								var realurl='';
								var defaultClickMonitorConfig='';
								
								//有数广告点击事件采集
								var lable=ad_order_id+"@@"+tagid+"@@"+medid+"@@"+sspid;
								var lv=encodeURIComponent(lable);
								
								//广告相关信息
								redParm.label=lable;
								redParm.udataRedType="4"    //3表示集团插码，4表示有数插码
									//集团点击采集
								if(portalType=='0'){
									redParm.compRedType="3";
									defaultClickMonitorConfig='http://track.cm-analysis.com/sc/79/319/2463/5?v=1';
								}else{
									redParm.compRedType="3";
									defaultClickMonitorConfig='http://track.cm-analysis.com/sc/79/319/2464/5?v=1';
								}
								if(clickMonitorConfig==''){
									clickMonitorConfig=defaultClickMonitorConfig;
								}
								redParm.trackUrl=clickMonitorConfig;
								
							    $.ajax({
							        type: 'post',
							        url: '/ad/recodeAdInfo',
							        data: JSON.stringify(redParm),
							        dataType: "json",
							        contentType: "application/json;charset=UTF-8",
							        success: function(data){
							        	if(data.returnMessage=="001000"){
							        		console.log("曝光成功");
							        	}
							        }
							    })
//								Service.asExcute("IIndexService", "recodeAdInfo", [redParm], function(result){});
								
								udata_w="http://120.197.233.121/udata/u.gif?h=750&w=1440&ct="
									+new Date().getTime()+"&si="+udata_appid+"&cu="
									+ encodeURIComponent(window.location.host)
									+"&v=1.0&s=1500347894640218363&f=4&c=1428456744583&et="
									+event+"&lv="+lable+"&cp="+ encodeURIComponent(window.location.href)+"&ru="+encodeURIComponent(base64decode(url));
							    
							    var wxcsurl =  "/ad/adv?infoTitle="+info_title+"&resourceid="+info_id+"&info_url="+base64encode(udata_w);
							    console.log("上报广告请求url:"+wxcsurl);
							    window.location.href = wxcsurl;
							}
				        }
				    });
				return;   //阻止执行后面的页面跳转代码
			}
			
			var wxcsurl =  "/ad/adv?infoTitle="+info_title+"&resourceid="+info_id+"&info_url="+url;
			window.location.href = wxcsurl;
		});
	});
}