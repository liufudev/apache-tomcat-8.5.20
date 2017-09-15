var pageNum = 1;
var pageSize = 5;
var tag = true;
var loadtag = false;

$(function(){
	$.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/info/getInfoDetail",
	        data:{
	        	infoId:$('#infoId').val()
	        },
	        success: function (resultMap) { 
	        	$('#infoTitle').html("&nbsp;&nbsp;&nbsp;&nbsp;"+resultMap.data.infoTitle);       			
	 			$('#publishTime').html(formatDate(resultMap.data.publishTime));
	 			$('#resport').html(resultMap.data.resport);
	 			$('#commentNum').html(resultMap.data.commentNum);
	 			$('#thumbsupNum').html(resultMap.data.thumbsupNum);
	 			$('#thumbsupNum2').html(resultMap.data.thumbsupNum);
	 			$('#readNumber').html(resultMap.data.readNumber);
	 			commentNum = resultMap.data.commentNum;
	 			thumbsupNum = resultMap.data.thumbsupNum;
	 			$('#videoUrl').attr('src',resultMap.data.videoUrl);
	        }
	    });
	
});

layui.use('flow', function(){
  var flow = layui.flow;

  flow.load({
    elem: '.flow-default' //流加载容器
    //,scrollElem: '.flow-default' //滚动条所在元素，默认document
    //,isAuto: false
    //,end: '没了'
    ,isLazyimg: true
    ,done: function(page, next){ //加载下一页
      console.log(page);
      setTimeout(function(){
      	var lis = [];
	    
		if (!tag) {
			return;
		}
	
		var data = getcomment();
		for (var i = 0; i < data.length; i++) {
			lis.push(
					'<li><div class="pic"> <img src="' + data[i].headUrl
							+ '" alt=""/></div><div class="txt"><h3><span>'
							+ formatDate(data[i].commentTime) + '</span>'
							+ data[i].nickName + '</h3><p><pre>'
							+ data[i].commentText + '</pre></p></div></li>');
	
		}
		
		next(lis.join(''), !loadtag);
      }, 500);
    }
  });
  
});

/**
 * 获取当前信息的评论列表
 * 
 * @returns
 */
function getcomment() {
	var data
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web()
				+ "/usercomment/InformationCommentList",
		beforeSend : function() {

		},
		data : {
			objId : $('#infoId').val(),
			pageNum : pageNum,
			pageSize : pageSize
		},
		success : function(resultMap) {
			if (resultMap.resultCode == 'Success') {
				if (pageNum * pageSize < resultMap.total) {
					pageNum = pageNum + 1;

				} else {
					tag = false;
					loadtag = true;
				}
				data = resultMap.rows;

			} else {

				layer.msg("亲您的网络不太好")
			}

		}
	});
	return data;
}

var commentNum =0;
var thumbsupNum=0;
$(function(){
	
	    
	    $.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web() + "/userthumbsup/CheckThumbsUp",
		beforeSend : function() {

		},
		data : {
			objType : 'INFO',
			objId : $('#infoId').val(),

		},
		success : function(resultMap) {
		
			if (resultMap.resultCode == 'Success'){
				if(resultMap.pojo){
				  	$("#thumbsupNo").hide();
				  	$("#thumbsupYes").show();
				  }else{
				  	$("#thumbsupYes").hide();
				  	$("#thumbsupNo").show();
				  }
			
				
			}

		}
	});
	
	$.ajax({
				type : "post",
				dataType : "json",
				async : false,
				url : getRootPath_web()
						+ "/usercollection/Checkcollection",
				beforeSend : function() {
				},
				data : {
					objId : $('#infoId').val(),
					objType : 'INFO'

				},
				success : function(resultMap) {
					if(resultMap.pojo){
					  	$("#collectNo").hide();
					  	$("#collectYes").show();
					  }else{
					  	$("#collectYes").hide();
					  	$("#collectNo").show();
					  }


				}
			});
	
});

/**
 * 评论
 * 
 * @returns
 */
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
		url : getRootPath_web()
				+ "/usercomment/saveInformationComment",
		beforeSend : function() {
			LoginCheck();
		},
		data : {
			objId : $('#infoId').val(),
			objType : 'INFO',
			commentText : text_comment
		},
		success : function(resultMap) {
			layer.msg(resultMap.resultReason);
			//commentNum = commentNum+1;
			//$('#commentNum').html(commentNum);
			$('#text_comment').val("");
	 			
		},error : function() {
	        	layer.msg('加载失败');
	
		},complete : function () {
				closeShade();
	    }
	});

}

function cancleComment() {
	$('#text_comment').val("");
}

/**
 * 收藏
 * 
 * @returns
 */
function SaveCollect() {
	if(!LoginCheck()){
		 return ;
	}
	var data
	if (checkCollect()) {
		Cancelollect();
		return;
	}
	ShowShade();
	$.ajax({
				type : "post",
				dataType : "json",
				async : false,
				url : getRootPath_web()
						+ "/usercollection/Savecollection",
				beforeSend : function() {

				},
				data : {
					objId : $('#infoId').val(),
					objType : 'INFO'

				},
				success : function(resultMap) {
					layer.msg(resultMap.resultReason);
					if(resultMap.pojo){
						$("#collectNo").hide();
					  	$("#collectYes").show();
					}


				},error : function() {
			        	layer.msg('加载失败');
			
				},complete : function () {
						closeShade();
			    }
			});
	return data;
}
function checkCollect() {
	var tage_Collect=false;

	$.ajax({
				type : "post",
				dataType : "json",
				async : false,
				url : getRootPath_web()
						+ "/usercollection/Checkcollection",
				beforeSend : function() {
				},
				data : {
					objId : $('#infoId').val(),
					objType : 'INFO'

				},
				success : function(resultMap) {
					if(resultMap.pojo){
						tage_Collect = true;
					}


				}
			});
	return tage_Collect;
}
/**
 * 取消收藏
 * 
 * @returns
 */

function Cancelollect() {
	if(!LoginCheck()){
		 return ;
	}
	ShowShade();
	var data
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web()
				+ "/usercollection/Cancelcollection",
		beforeSend : function() {

		},
		data : {
			objId : $('#infoId').val(),

		},
		success : function(resultMap) {
			layer.msg(resultMap.resultReason);
			$("#collectNo").show();
			$("#collectYes").hide();

		},error : function() {
	        	layer.msg('加载失败');
	
		},complete : function () {
				closeShade();
	    }
	});
	return data;
}

function SaveThumbsUp() {
	if(checkThumbsUp()){
		 deleteThumbsUp();
		 return ;
	}
	ShowShade();
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web() + "/userthumbsup/saveThumbsUp",
		beforeSend : function() {
			LoginCheck();
		},
		data : {
			objType : 'INFO',
			objId : $('#infoId').val(),

		},
		success : function(resultMap) {
			layer.msg(resultMap.resultReason);
			if (resultMap.resultCode == 'Success'){
				thumbsupNum = thumbsupNum+1;
	 			$('#thumbsupNum').html(thumbsupNum);
	 			$('#thumbsupNum2').html(thumbsupNum);
				$("#thumbsupNo").hide();
				$("#thumbsupYes").show();
			}

		},error : function() {
	        	layer.msg('加载失败');
	
		},complete : function () {
				closeShade();
	    }
	});
}
function deleteThumbsUp() {
	if(!LoginCheck()){
		 return ;
	}
	ShowShade();
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web() + "/userthumbsup/DeleteThumbsUp",
		beforeSend : function() {

		},
		data : {
			objType : 'INFO',
			objId : $('#infoId').val(),

		},
		success : function(resultMap) {
			layer.msg(resultMap.resultReason);
			if (resultMap.resultCode == 'Success'){
				thumbsupNum = thumbsupNum-1;
	 			$('#thumbsupNum').html(thumbsupNum);
	 			$('#thumbsupNum2').html(thumbsupNum);
				$("#thumbsupNo").show();
				$("#thumbsupYes").hide();
			}

		},error : function() {
	        	layer.msg('加载失败');
	
		},complete : function () {
				closeShade();
	    }
	});
}
function checkThumbsUp(){
	var istrue=false;
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web() + "/userthumbsup/CheckThumbsUp",
		beforeSend : function() {

		},
		data : {
			objType : 'INFO',
			objId : $('#infoId').val(),

		},
		success : function(resultMap) {
		
			if (resultMap.resultCode == 'Success'){
				if(resultMap.pojo){
					istrue=true;
				}
			
				
			}

		}
	});
	return istrue;
}