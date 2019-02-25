	$(function() {
		$("#jt-cityAdress").click(function(){
			// 获取生日
			var birthday=$('#birthday').text();
			if(birthday.indexOf('年')>=0){
				birthday=birthday.replace('年','').replace('月','').replace('日','');
			}
			
			// 获取性别
			var sex = $('#sex-span').text();
			if("男" == sex){
				sex = 0;
			}else if("女" == sex){
				sex = 1;
			}
			
			// 跳转至选择城市页面
    		window.location.href = "../city.html?is_update=1&birthday=" + birthday + "&sex=" + sex;
//    		window.location.href = "/my/cityPage";
		});
	});