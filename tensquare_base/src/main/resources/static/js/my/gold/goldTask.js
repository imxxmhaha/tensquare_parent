$(
	//获取金币任务列表
	$.ajax({
		type : 'GET',
		url : '/my/getGoldTaskList/1',
		timeout : 3000, //超时时间设置，单位毫秒
//		data : {regionId:'1'},
		dataType : 'json',
		success : function(data) {
			console.info(data);
			if(data.returnCode=="001000"){
				var taskList=data.data.data;
				if(taskList){
					var taskIndex=0;
					for(var i=0;i<taskList.length;i++){
						var task_list=taskList[i].task_list;
						for(var j=0;j<task_list.length;j++){
							var html='';
							var task=task_list[j];
							html=html+'<div class="task">'+
											'<p>'+task.task_name+'</p>'+
											'<div>'+
												'<span class="star-span"><img src="../images/icon-star.png"/>'+task.exp+'</span>'+
												'<span class="gold-span"><img src="../images/icon-gold.png"/>'+task.points+'</span>'+
											'</div>';
							//任务状态 1:领取   0:参与 2:不显示按钮（默认参加） 3:已领取
							if(task.task_status==0){
								html=html+'<a href="javaScript:void(0);" onclick="doTask();" class="doTask">做任务</a>';
							}else if(task.task_status==1){
								html=html+'<a href="javaScript:void(0);" id=\'task'+taskIndex+
								'\' onclick="clickGoldTask(\''+task.task_id+
								'\',\'task'+taskIndex+'\',\''+task.points+'\')" class="receive">领取</a>';
							}else if(task.task_status==2){
								if(task.task_name=='注册邀请'){
									html=html+'<a href="javaScript:void(0);" onclick="invite();" class="doTask">做任务</a>';
								}else if(task.task_name=='收藏应用'){
									html=html+'<a href="javaScript:window.location.href=\'/\';" class="doTask">做任务</a>';
								}else if(task.task_name=='分享应用'){
									html=html+'<a href="javaScript:window.location.href=\'/\';" class="doTask">做任务</a>';
								}
							}else if(task.task_status==3){
								html=html+'<a href="#" class="toReceive">已领取</a>';
							}
							html=html+'</div>';
							$('.contain').append(html);
							taskIndex++;
						}
					}
				}
			}else{
				alert(data.errorMessage);
			}
		},
		error : function(xhr, type) {
//			alert('Ajax error!');
			window.location.href = window.location.href; //超时之后重新加载
			console.error(xhr);
			console.error(type);
		}
	}),
	
	//获取用户金币数量
	$.ajax({
		type : 'GET',
		url : '/my/getMemInfo',
		data : {},
		dataType : 'json',
		success : function(data) {
			console.info(data);
			if(data.returnCode=="001000"){
				var point=data.data.point;
				$('#point').html(point);
			}
		},
		error : function(xhr, type) {
//			alert('Ajax error!');
			console.error(xhr);
			console.error(type);
		}
	})
);

//完善个人信息任务，跳转到个人信息页面
function doTask(){
	window.location='/my/personalData?type=0';
}

function returnMyIndex(){
	window.location.href='/my';
}
//领取金币
function clickGoldTask(taskId,divId,points){
	$('#'+divId).html('已领取');
	$('#'+divId).attr('onclick','');
	$('#'+divId).attr('class','toReceive');
	var oldPoints=new Number($('#point').html());
	var getPoints=new Number(points);
	$('#point').html(oldPoints+getPoints);
	$.ajax({
		type : 'POST',
		url : '/my/clickReceiveGold',
		data : {taskid:taskId,type:'1'},
		dataType : 'json',
		success : function(data) {
			if(data.returnCode=="001000"){
				console.log("领取成功！");
			}else{
				alert(data.errorMessage);
			}
		},
		error : function(xhr, type) {
			alert('Ajax error!');
			console.error(type);
		}
	})
};


var url = location.origin + '/register.html';
var img = location.origin + '/images/about-logo.png'
var paramShare = {
  title: '注册邀请',
  description: '和生活注册邀请',
  img: img,
  url: url,
  code: 'register_invite',
}
new Share(paramShare);

function invite() {
  $(".share-pop").fadeIn();
  $(".lincoapp-sharely-mask").removeClass("hide").addClass("show");
  $(".lincoapp-sharely-fixed").removeClass("hide").addClass("show");
}

$(".lincoapp-sharely-mask").click(function() {
  $(".lincoapp-sharely-mask").removeClass("show").addClass("hide");
  $(".lincoapp-sharely-fixed").removeClass("show").addClass("hide");
  $(".share-pop").fadeOut();
})

$("#btnCancel").click(function() {
  $(".lincoapp-sharely-mask").removeClass("show").addClass("hide");
  $(".lincoapp-sharely-fixed").removeClass("show").addClass("hide");
  $(".share-pop").fadeOut();
})