var params = {};


$(function(){
	params.portalType = $.cookie("portalType"); // 门户类型
	params.provID = $.cookie("provID"); // 省ID
	params.areaID = $.cookie("areaID"); // 地市ID

	
	showMmNews();
})



// 广告位广告轮播
function showMmNews(){

    $.ajax({
        type: "GET",
        url: '/mm/showNews',
        data:{},
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function(data){
        	console.log("获取mm头条成功")
        	var mmNewsList = data.data.mmNewsList;
        	var mmUrl = data.data.mmUrl;
        	console.log(mmNewsList);
        	//<div id="songnotice" time="3" style="">
//          <ul class="playList sId" pid="" positionid="">
//              <li class="name"><a class="hiden"><span class="news-span">要闻</span><p>1国庆广东各景点门票价格打八折</p></a></li>
//          </ul>
      //</div>
        	var mm_info = '';
			for(var i=0; i<mmNewsList.length; i++){
				var item = mmNewsList[i];
				mm_info += '<ul class="playList sId" pid="" positionid="" >'+
		          '<li class="name" onclick="jumpToMMUrl(this)">'+
			          	'<a  class="hiden" url="'+item.url +'">'+
		          		'<span class="news-span">'+item.columnName+'</span>'+
		          		'<p>'+' '+item.title+'</p>'+
						'</a>'+
		          '</li>'+
				  '</ul>';
			}
			$("#songnotice").html(mm_info);
//			$("#songnotice").append(mm_info);
//			$("#songnotice").listview("refresh");
	
        }
    })
}

function jumpToMMUrl(ele){
	var url = $(ele).find("a").attr("url");
	console.log(url);
//	url = encodeURIComponent(url);
//	window.location.href = "/mm/gotoMMNews?url="+url;
	var resName = "MM头条";
	var timestamp = Date.parse(new Date());
	
	var urlTmp = littleUrl.encode(url);
	window.location.href = "/appPage/url=" + base64encode(urlTmp) + "&resName=" + resName + "&timestamp="+timestamp;
	
}

