var pageSize=5;
var pageNumber=1;
var tag = true;
var loadtag = false;
var activityId;
$(function(){
	//alert("aa");
	activityId=getqueryString("activityId");
	//alert("activityId:"+activityId);
	
	loadAllComment();
	
	//返回
	back();
	
	//光标聚焦
	$('#say').bind("click", function(){
		$("#text_comment").focus();
	});
});


function back(){
	$('#backSpan').bind("click", function(){
		window.location.href=getRootPath_web()+"/html/activity/activity-info.html?activityId="+activityId+'&type=comment';
	});
}


//加载评论
function loadAllComment(){
	layui.use('flow', function(){
		var flow = layui.flow;
		flow.load({
			elem: '#activityCommentList' //流加载容器
				,isLazyimg: true
				,done: function(page, next){ //加载下一页
					setTimeout(function(){
						var list = [];
						if (!tag) {
							return;
						}
						var rows =selectAllActivityComment();
						//console.log(data);
						for (var i = 0; i < rows.length; i++) {
							list.push("<li>" +
		        					"<div class='pic'>" +
		        					"<img src='"+rows[i].headUrl+"' alt=''/>"+
		        					"</div>" +
		        					"<div class='txt'>" +
		        					"<h3><span>" +moment(new Date(rows[i].commentTime)).format("YYYY-MM-DD HH:mm:ss") +"</span>"+
		        					rows[i].nickName +"</h3>" +
		        					"<p>" +rows[i].commentText +"</p>" +
		        					"</div>"+
		        					"</li>");
						}
						next(list.join(''), !loadtag);
					}, 500);
				}
		});
	});
	
}


//加载所有评论
function selectAllActivityComment(){
	
	var data;
	ShowShade();
	$.ajax({
      type: "post",
      dataType: "json",
      async: false,
      url:  getRootPath_web()+"/activityDetail/selectAllActivityComment",
      data : {
			pageNum : pageNumber,
			pageSize : pageSize,
			activityId:activityId
	  },
	  success : function(resultMap) {
		if (resultMap.resultCode == 'Success') {
			if (pageNumber * pageSize < resultMap.total) {
				pageNumber = pageNumber + 1;

			} else {
				tag= false;
				loadtag = true;
			}
			data = resultMap.rows;

		} else {

			layer.msg("亲您的网络不太好")
		}

	  },
      error: function(XMLHttpRequest, textStatus, errorThrown){ 
      }, 
      complete : function () {
    	  	//最后消除阻塞提示
    	  closeShade();
      }
  });
	return data;
}



function comment() {
	
	var text_comment = $('#text_comment').val();
	if (!text_comment) {
		return;
	}
	ShowShade();
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web()+ "/activityDetail/saveActivityComment",
		//url : getRootPath_web()+ "/usercomment/saveInformationComment",
		beforeSend : function() {
			LoginCheck();
		},
		data : {
			objId : activityId,
			objType : 'ACTI',
			commentText : text_comment
		},
		success : function(resultMap) {
			layer.msg(resultMap.resultReason);
			cancleComment();
			if(resultMap.resultReason=='Success'){
				window.parent.location.reload(); //刷新父页面
			}
			
			
		},error : function() {
	        	layer.msg('加载失败');
	
		},complete : function () {
				closeShade();
				//最后消除阻塞提示
	    }
	});

}

function cancleComment() {
	//alert("aaa");
	$('#say').val("");
	$('#text_comment').val("");
}





