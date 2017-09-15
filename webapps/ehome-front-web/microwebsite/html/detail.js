/**
 * 
 */

var pageNum = 1;
var pageSize = 5;
var tag = true;
var loadtag = false;
var collection = false;
var collectionid = '';
var ThumbsUpTag = false;
$(function() {
	getload(callback);
	callback();
	
	



	
    
});

function callback() {
	if (loadtag) {
		$("#listcomment").append('<li><h4>没有更多了</h4></li>');
		loadtag = false;

	}
	if (!tag) {
		return;
	}

	var data = getcomment();
	for (var i = 0; i < data.length; i++) {
		$("#listcomment").append(
				'<li><div class="pic"> <img src="' + data[i].headUrl
						+ '" alt=""/></div><div class="txt"><h3>'
						+ data[i].nickName + '</h3> <h4>'
						+ formatDate(data[i].commentTime) + '</h4><p><pre>'
						+ data[i].commentText + '</pre></p></div></li>');

	}
}

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
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web()
				+ "/microwebsite/usercomment/saveInformationComment",
		beforeSend : function() {

		},
		data : {
			objId : getQueryStr('id'),
			objType : 'MESSAGE',
			commentText : text_comment
		},
		success : function(resultMap) {
			alert(resultMap.resultReason);
		}
	});

}
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
				+ "/microwebsite/usercomment/InformationCommentList",
		beforeSend : function() {

		},
		data : {
			objId : getQueryStr('id'),
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

				alert("亲您的网络不太好")
			}

		}
	});
	return data;
}
/**
 * 收藏
 * 
 * @returns
 */
function SaveCollect() {
	var data
	if (checkCollect()) {
		Cancelollect();
		return;
	}
	$.ajax({
				type : "post",
				dataType : "json",
				async : false,
				url : getRootPath_web()
						+ "/microwebsite/usercollection/Savecollection",
				beforeSend : function() {

				},
				data : {
					objId : getQueryStr('id'),
					objType : 'MESSAGE'

				},
				success : function(resultMap) {
					alert(resultMap.resultReason);
					if(resultMap.pojo){
						collectionid = resultMap.pojo.collectionUid;
					}


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
						+ "/microwebsite/usercollection/Checkcollection",
				beforeSend : function() {
					LoginCheck();
				},
				data : {
					objId : getQueryStr('id'),
					objType : 'MESSAGE'

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
	var data
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web()
				+ "/microwebsite/usercollection/Cancelcollection",
		beforeSend : function() {

		},
		data : {
			objId : getQueryStr('id'),

		},
		success : function(resultMap) {
			alert(resultMap.resultReason);
			collectionid = "";

		}
	});
	return data;
}

function SaveThumbsUp() {
	
	if(checkThumbsUp()){
		 deleteThumbsUp();
		 return ;
	}
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web() + "/microwebsite/userthumbsup/saveThumbsUp",
		beforeSend : function() {

		},
		data : {
			objType : 'MESSAGE',
			objId : getQueryStr('id'),

		},
		success : function(resultMap) {
			alert(resultMap.resultReason);
			if (resultMap.resultCode == 'Success'){
				ThumbsUpTag=true;
			}

		}
	});
}
function deleteThumbsUp() {
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web() + "/microwebsite/userthumbsup/DeleteThumbsUp",
		beforeSend : function() {

		},
		data : {
			objType : 'MESSAGE',
			objId : getQueryStr('id'),

		},
		success : function(resultMap) {
			alert(resultMap.resultReason);
			if (resultMap.resultCode == 'Success'){
				ThumbsUpTag=false;
			}

		}
	});
}
function checkThumbsUp(){
	var istrue=false;
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web() + "/microwebsite/userthumbsup/CheckThumbsUp",
		beforeSend : function() {

		},
		data : {
			objType : 'MESSAGE',
			objId : getQueryStr('id'),

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
