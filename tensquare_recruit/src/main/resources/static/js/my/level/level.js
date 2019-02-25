$(function(){
    //测试json，后期通过cookie中获取
	var user_id = $.cookie('he_life_user_id');
    var oData = {
    		"userid": user_id,
    		"regionid": 1
    	  };
    oData = JSON.stringify(oData);
    $.ajax({
        type: "post",
        url: '/user/level/getlevelformatreq',
        data: oData,
        dataType: "json",
        contentType: "application/json",
        success: function(data){
			if(null != data &&　data.returnCode == "001000"){
				data = data.data;
				console.log(data);
				if(null != data && data.length == 20 ){
					var arr = "";
					
					for(var i=1; i<=data.length/2; i++){

						var head = $(data).filter(function(){
							return this.seq==i;
						}); 
		        		
		        		arr += "<tr><td>"+ head[0].name +"</td><td>"+ head[0].exp +"</td>";
		        		
		        		var end = $(data).filter(function(){
		        			return this.seq == i+10;
		        		}); 
		        		arr += "<td>"+ end[0].name +"</td><td>"+ end[0].exp +"</td></tr>";
					}
					$("#code").after(arr);
				}
			}
        },
        error: function(e){
          console.log(e);
        }
    
    })
    
	
});
