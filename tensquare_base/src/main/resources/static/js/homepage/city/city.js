	function changeCity(areacode){
		// 获取生日
		/*var birthday=$('#birthday').text();
		if(birthday.indexOf('年')>=0){
			birthday=birthday.replace('年','').replace('月','').replace('日','');
		}*/
		
		
		// 获取性别
		/*var sex = $('#sex-span').text();
		if("男" == sex){
			sex = 0;
		}else if("女" == sex){
			sex = 1;
		}*/
		
		var birthday = getUrlParam("birthday");
		var sex = getUrlParam("sex");
		
		var userInfo=new Object();
		userInfo.userinfo = {
				"birthday":birthday,
				"sex":sex,
				'areacode':areacode
		}
		
		oData = JSON.stringify(userInfo);
		updateUserInfo(oData);
	}
	
	function updateUserInfo(data){
		$.ajax({
			type : 'post',
			url : '/my/setUserInfo',
			data : data,
			dataType : 'json',
	        contentType: "application/json",
			success : function(data) {
				if(data.returnCode == "001000"){
					 window.location.href=document.referrer; // 返回上一级页面并刷新
//					alert("修改个人信息成功！");
				}else{
					console.error(data.errorMsg);
				}
			},
	        error: function(){
				console.log("set user info sys error");
	        }
		})
	};

	$(function() {
		// 是否来自个人资料-城市
		var is_update = getUrlParam("is_update"); 

		/**
			1、定位城市
		*/
		//areaCode = $.cookie('areaCode');
		//var areacode = '440300';
		//var cityJson = {'portalType':portalType,'areacode':areaCode};
		var cityJson = {'portalType':$.cookie('portalType'),'areacode':''};
		$.ajax({
			    type: "POST",
			    url:"/getIpAndCity",
			    data:JSON.stringify(cityJson),
				contentType: "application/json",
			    dataType:"json",         
			    success: function(result){
			    	if(result == null  || result.message==null  || result.message=="error"){
						$("#jt-cityAdress").text('定位失败');
					}else{
						if(result.message == "error"){
							$("#jt-cityAdress").text('定位失败');
						}else if(result.message == "success"){
							// 展现城市名称
							$("#jt-cityAdress").text(result.areaname);
							
							
							$("#jt-cityAdress").click(function(){
								
								if(is_update != null && is_update==1) { // 来自个人资料-城市
									// 修改用户信息
									changeCity(result.areacode);
									
								} else { // 来自城市列表
									var params = {};
	    							// 获取需要保持到cookie的数据
	    							params.areaID = result.areaid;
	    							params.areaCode = result.areacode;
	    							params.areaName = result.areaname;
	    							params.areaFullSpell = result.areafullspell;
	    							params.provID = result.provid;
	    							params.gotoCityUrl = true; //是否跳转对应城市首页(此参数为了实现热门搜索词同步设置到cooki，热门搜索词需要优先设置否则会刷新页面设置热搜词失败)
	    							
	    							//.wap的域名需要跳转对应的 zengxianlian
	    							var url = window.location.href;
	    							if(url.indexOf(".wap")>0){
	    								params.cityUrl = "http://"+params.areaFullSpell+".wap.wxcs.cn";
	    							}else{
	    								params.cityUrl = "http://"+params.areaFullSpell+".wxcs.cn";
	    							}
	    							
	    							// 更新到最近访问cookie
	    							saveRecentVisitCookie(params);
	    							
	    							// 更新到cookie
	    							saveDataCookie(params);
								}
    							
    						});
						}
					}
			    	
			    	
			    },
		        error: function(){
					console.log("get ip and city sys error");
		        }
		});
		
		
		/**
			2、最近访问列表查询
		*/
		if($.cookie('recent_visit')==undefined || $.cookie('recent_visit')==null || $.cookie('recent_visit')==''){
			$("#recent-visit-container").hide();
		} else {
			var recent_visit_val = $.parseJSON(base64UTF8Decode($.cookie('recent_visit'))); //json字符串转json对象
			for(var i=0;i<recent_visit_val.length;i++){
				var li_recent = $("<li code='"+recent_visit_val[i].areaCode+"' areaid='"+recent_visit_val[i].areaID+"' spell='"+recent_visit_val[i].areaFullSpell+"' provid='"+recent_visit_val[i].provID+"'>"+recent_visit_val[i].areaName+"</li>");
				if(i==0) { // 第一个有选中效果
					li_recent = $("<li class='selected' code='"+recent_visit_val[i].areaCode+"' areaid='"+recent_visit_val[i].areaID+"' spell='"+recent_visit_val[i].areaFullSpell+"' provid='"+recent_visit_val[i].provID+"'>"+recent_visit_val[i].areaName+"</li>");
				}

				$("#recent-visit").append(li_recent);
				
				// 点击选择市
				$(li_recent).click(function(){
					if(is_update != null && is_update==1) { // 来自个人资料-城市
						// 修改用户信息
						changeCity($(this).attr("code"));
					} else { // 来自城市列表
						var params = {};
						// 获取需要保持到cookie的数据
						params.areaID = $(this).attr("areaid");
						params.areaCode = $(this).attr("code");
						params.areaName = $(this).text();
						params.areaFullSpell = $(this).attr("spell");
						params.provID = $(this).attr("provid");
						params.gotoCityUrl = true; //是否跳转对应城市首页(此参数为了实现热门搜索词同步设置到cooki，热门搜索词需要优先设置否则会刷新页面设置热搜词失败)
						
						//.wap的域名需要跳转对应的 zengxianlian
						var url = window.location.href;
						if(url.indexOf(".wap")>0){
							params.cityUrl = "http://"+params.areaFullSpell+".wap.wxcs.cn";
						}else{
							params.cityUrl = "http://"+params.areaFullSpell+".wxcs.cn";
						}
						
						// 更新到最近访问cookie
						saveRecentVisitCookie(params);
						
						// 更新到cookie
						saveDataCookie(params);
					}
					
				});
			}
		}


		
		/**
			3、本省城市、字母城市列表查询
		*/
		var getCityListJson = {"version":"1", "provID": $.cookie('provID'), "areaID": $.cookie('areaID')};
		$.ajax({
		    type: "POST",
		    url:"/getCityList",
		    data:JSON.stringify(getCityListJson),
			contentType: "application/json",
		    dataType:"json",         
		    success: function(result){
		    	if(result == null  || result.returnCode==null  || result.returnCode!="001000"){ // 失败
					
		    	}else{ // 成功
					// 3.1本省城市
					if(result.data.localProvinceCity == null || result.data.localProvinceCity == false){ // 本省为空，隐藏
						$("#local-province-city-container").hide();
					} else {
						$(result.data.localProvinceCity).each(function(index){
    						var li_ele = $("<li code='"+this.citycode+"' areaid='"+this.cityid+"' spell='"+this.allletter+"'>"+this.cityname+"</li>")
    						$("#local-province-city").append(li_ele);
    						
    						
    						// 点击选择市
    						$(li_ele).click(function(){
    							if(is_update != null && is_update==1) { // 来自个人资料-城市
    								// 修改用户信息
    								changeCity($(this).attr("code"));
    							} else { // 来自城市列表
    								// 获取需要保持到cookie的数据
        							getCityListJson.areaID =  $(this).attr("areaid");
        							getCityListJson.areaCode = $(this).attr("code");
        							getCityListJson.areaName = $(this).text();
        							getCityListJson.areaFullSpell = $(this).attr("spell");
        							getCityListJson.gotoCityUrl = true; //是否跳转对应城市首页(此参数为了实现热门搜索词同步设置到cooki，热门搜索词需要优先设置否则会刷新页面设置热搜词失败)
        							
        							//.wap的域名需要跳转对应的 zengxianlian
        							var url = window.location.href;
        							if(url.indexOf(".wap")>0){
        								getCityListJson.cityUrl = "http://"+getCityListJson.areaFullSpell+".wap.wxcs.cn";
        							}else{
        								getCityListJson.cityUrl = "http://"+getCityListJson.areaFullSpell+".wxcs.cn";
        							}
        							
        							// 更新到最近访问cookie
        							saveRecentVisitCookie(getCityListJson);
        							
        							// 更新到cookie
        							saveDataCookie(getCityListJson);
    							}
    							
    						});
    					});
					}
					
					 
					
					
					
					

					// 3.2字母城市列表
					$(result.data.allCity).each(function(index){
						var first_letter = this.letter.toUpperCase(); // 首字母转大写
						var li_letter = $("<li li-code='"+first_letter+"-letter-code' code='"+this.citycode+"' areaid='"+this.cityid+"' spell='"+this.allletter+"' provid='"+this.provincecode+"' data-value='"+this.allletter+"' data-tags='"+this.allletter+"' class='mui-table-view-cell mui-indexed-list-item'>"+this.cityname+"</li>");

						if($('li[li-code="'+first_letter+'-letter-code"]').size() == 0) {
        					$("#"+first_letter+"-index").after(li_letter);
    					} else {
        					$('li[li-code="'+first_letter+'-letter-code"]:last').after(li_letter);
    					}
    					
						// 点击选择市
						$(li_letter).click(function(){
							if(is_update != null && is_update==1) { // 来自个人资料-城市
								// 修改用户信息
								changeCity($(this).attr("code"));
							} else { // 来自城市列表
								var params = {};
								// 获取需要保持到cookie的数据
								params.areaID = $(this).attr("areaid");
								params.areaCode = $(this).attr("code");
								params.areaName = $(this).text();
								params.areaFullSpell = $(this).attr("spell");
								params.provID = $(this).attr("provid");
								params.gotoCityUrl = true; //是否跳转对应城市首页(此参数为了实现热门搜索词同步设置到cooki，热门搜索词需要优先设置否则会刷新页面设置热搜词失败)
								
								//.wap的域名需要跳转对应的 zengxianlian
								var url = window.location.href;
								if(url.indexOf(".wap")>0){
									params.cityUrl = "http://"+params.areaFullSpell+".wap.wxcs.cn";
								}else{
									params.cityUrl = "http://"+params.areaFullSpell+".wxcs.cn";
								}
								
								// 更新到最近访问cookie
								saveRecentVisitCookie(params);
								
								// 更新到cookie
								saveDataCookie(params);
							}
							
						});
						
					});
					
					
					/**
					 * 动态生成完字母城市列表后再执行这段JS
					 */
					// 字母索引
			        mui.init();
			        mui.ready(function() {
			            // var header = document.querySelector('header.mui-bar');
			            var list = document.getElementById('list');
			            //calc hieght
			            list.style.height = (document.body.offsetHeight/* - header.offsetHeight*/) + 'px';
			            //create
			            window.indexedList = new mui.IndexedList(list);

			        });
		    	}
		    },
	        error: function(){
				console.log("get city list sys error");
	        }
		});
		
	});