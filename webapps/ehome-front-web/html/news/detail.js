var commentNum =0;
var thumbsupNum=0;
$(function(){
	getType();
	$.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/info/getInfoDetail",
	        data:{
	        	infoId:$('#infoId').val()
	        },
	        success: function (resultMap) { 
	        	$('#infoTitle').html(resultMap.data.infoTitle);       			
	 			$('#publishTime').html(formatDate(resultMap.data.publishTime));
	 			$('#resport').html(resultMap.data.resport);
	 			$('#commentNum').html(resultMap.data.commentNum);
	 			$('#thumbsupNum').html(resultMap.data.thumbsupNum);
	 			$('#thumbsupNum2').html(resultMap.data.thumbsupNum);
	 			commentNum = resultMap.data.commentNum;
	 			thumbsupNum = resultMap.data.thumbsupNum;
	 			if(resultMap.data.originLink!=null){
	 				var originLinkHtml='<a href="'+resultMap.data.originLink+'">'+resultMap.data.originLinkName+'</>';
		 			//alert(originLinkHtml);
		 			$('#originLink').html(originLinkHtml);
		 			
	 			}
	 			
	        }
	    });
	    
	    $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/info/getInfoContent",
	        data:{
	        	infoId:$('#infoId').val()
	        },
	        success: function (resultMap) {         	
	 			$('#content').html(resultMap.data.content);
	        }
	    });
	    
	    $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/info/getInfoRecomm",
	        data:{
	        	infoId:$('#infoId').val()
	        },
	        success: function (resultMap) { 
	        	var infoList=resultMap.data;
	        	if(infoList){
	        	for(var i=0;i<infoList.length;i++)
        		{
        			$("#recomm").append('<li>'
							                +'<a onclick="toInfoDetail('+ infoList[i].infoId + ')">'
							                    +'<div class="BoxB">'
							                        +'<div class="summary">'
							                        	 +'<h3>'+infoList[i].infoTitle+'</h3>'
							                            +'<p>'+infoList[i].summary+'</p>'
							                        +'</div>'
							                    +'</div>'
							                +'</a>'						
							                +'<div class="authorBox">'
							                    +'<div class="hr"></div>'
							                    +'<span class="See"><i class="icon iconSee"></i>' + infoList[i].readNumber + '</span>'
							                    +'<span class="Time"><i class="icon iconTime"></i>' + formatDate(infoList[i].publishTime) + '</span>'
							                    +'<span class="Author"><a href="'
													+ getRootPath_web()
													+ '/html/news/author-list.html?reporterId='
													+ infoList[i].reporterId
													+ '">' + infoList[i].resport + '</a></span>'
							                +'</div>'
							            +'</li>');
        		}
	        }
	        }
	    });
	    
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
	//alert("aaa");
	$('#say').val("");
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
/*	if(!LoginCheck()){
		 return ;
	}*/
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
//直播回顾文章详情不需要占展示推荐新闻
function getType()
{
	var type=$("#type").val();
	if(type!=null&&type==1)
	{
		$("#recommShow").hide();
	}
}