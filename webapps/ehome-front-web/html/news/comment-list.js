/**
 * 
 */

var pageNum = 1;
var pageSize = 5;
var tag = true;
var loadtag = false;

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

		},
		data : {
			objId : getqueryString('id'),
			objType : 'INFO',
			commentText : text_comment
		},
		success : function(resultMap) {
			layer.msg(resultMap.resultReason);
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
			objId : getqueryString('id'),
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