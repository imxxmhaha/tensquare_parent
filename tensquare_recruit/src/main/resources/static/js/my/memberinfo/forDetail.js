//
//$(
//	getExpDetail()
//)
//
////获取经验值获取明细
//function getExpDetail(){
//	//分页页数
//	var page=1;
//	//分页行数
//	var rows=10;
//	$.ajax({
//		type : 'POST',
//		url : '/my/getExpDetail',
//		data : {page:page,rows:rows},
//		dataType : 'json',
//		success : function(data) {
//			console.info(data);
//			if(data.returnCode=="001000"){
//				var detailList=data.data.detailList;
//				if(detailList){
//					var html='';
//					for(var i=0 ; i<detailList.length ; i++){
//						var per=detailList[i];
//						html+='<p class="year-title"><i></i>'+per.yearAndMonth+'</p>';
//						html+='<div class="contain">';
//						var list=per.list;
//						for(var j=0;j<list.length;j++){
//							html+=	'<div class="content">'+
//									  	'<div class="date">'+
//									  		'<span>'+list[j].dateOrWeek+'</span>'+
//									  		'<span>'+list[j].dateOrTime+'</span>'+
//									  	'</div>'+
//									  	'<p>'+list[j].name+'</p>'+
//									  	'<div class="detail-div">'+
//										  	'<span class="star-span"><img src="../images/icon-star.png"/>'+list[j].expVal+'</span>'+
//										  	'<span class="gold-span"><img src="../images/icon-gold.png"/>'+list[j].goldVal+'</span>'+
//										'</div>'+
//									'</div>' ;
//						}
//						html+='</div>';
//					}
//					$('.container').append(html);
//				}
//			}else{
//				console.error(data.errorMessage);
//			}
//		},
//		error : function(xhr, type) {
//			console.error(xhr);
//			console.error(type);
//		}
//	})
//}
//
//function backMy(){
//	window.location="/my"
//}



mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		up: {
			contentrefresh: '正在加载...',
			callback: pullupRefresh //滚动到底部
		}
    }
});

//分页页数
var page = 1;
getExpDetail(page);
	
function pullupRefresh() {
	page++;
	getExpDetail(page);
}

//获取经验值获取明细
function getExpDetail(page) {
  	//分页行数
 	var rows = 10;
    $.ajax({
    	type: 'POST',
    	url: '/my/getExpDetail',
    	data: {
    		page: page,
    		rows: rows
    	},
    	dataType: 'json',
    	success: function(data) {
    		console.info(data);
    		if(data.returnCode == "001000") {
    			var detailList = data.data.detailList;
    			if(detailList) {
    				var html = '';
    				for(var i = 0; i < detailList.length; i++) {
    					var per = detailList[i];
    					//判断当前月份是否已经显示出来
    					var isContain=false;
    					var arr = $('.year-title');
    					for(var z=0 ;arr!=null&&arr.length>z;z++ ){
    						if(arr[z].innerText==per.yearAndMonth){
    							isContain=true;
    							break;
    						}
    					}
    					if(!isContain){
        					html += '<p class="year-title"><i></i>' + per.yearAndMonth + '</p>';
    					}
    					html += '<div class="contain">';
    					var list = per.list;
    					for(var j = 0; j < list.length; j++) {
    						html += '<div class="content">' +
    						'<div class="date">' +
    						'<span>' + list[j].dateOrWeek + '</span>' +
    						'<span>' + list[j].dateOrTime + '</span>' +
    						'</div>' +
    						'<p>' + list[j].name + '</p>' +
    						'<div class="detail-div">' +
    						'<span class="star-span"><img src="../images/icon-star.png"/>' + list[j].expVal + '</span>' +
			                '<span class="gold-span"><img src="../images/icon-gold.png"/>' + list[j].goldVal + '</span>' +
			                '</div>' +
			                '</div>';
    					}
    					html += '</div>';
    				}
    				$('.container').append(html);
    				mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
    			}else{
    				mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
    			}
    		} else {
    			console.error(data.errorMessage);
    		}
    	},
    	error: function(xhr, type) {
    		console.error(xhr);
    		console.error(type);
    	}
    })
}

function backMy() {
	window.location = "/my"
}