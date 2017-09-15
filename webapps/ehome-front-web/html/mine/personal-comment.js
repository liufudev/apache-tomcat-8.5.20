var pageNum = 1;
var pageSize = 5;
var tag = true;

var loadtag = false;// 是否加载完了true:是，false：否
var fristload = true;// 是否第一次加载
var edittag = false;// 是否编辑状态
layui.use('flow', function() {
	var flow = layui.flow;
	flow.load({
		elem : '#listcomment',
		isLazyimg : true,
		done : function(page, next) { // 加载下一页
			setTimeout(callback(page,next), 500);
		}
	});
});

$(function() {
	//$("#listcomment").children().remove();

	
})

/**
 * 
 * @returns
 */

function edit(obj) {
	if (!edittag) {
		edittag = true;
		toedit();
		$(obj).text('完成');
	} else {
		edittag = false;
		CancelEdit()
		$(obj).text('编辑');
	}

}
function toedit() {

	$("#listcomment")
			.children('li')
			.each(
					function() {
						var checkbox = '<div class="comment-lf"><div class="check-basic checkboxFive"> <input type="checkbox"  id="" name="num_check"/><label class="check_Box"for="checkbox2"></label></div</div>';
						var inhtml = $(this).html();
						$(this).children().remove();
						var contain = $('<div class="comment-rg"></div>');
						contain.append(inhtml);
						$(this).append(checkbox);
						$(this).append(contain);

					});

	$(".check_Box").click(function() {
		if ($(this).prev()[0].checked == true) {
			$(this).prev()[0].checked = false;
		} else {
			$(this).prev()[0].checked = true;
		}
	});
	$(".message-bottom").toggle();
}
function CancelEdit() {
	$(".message-bottom").toggle();
	$('.comment-lf').remove();
	$('.comment-rg').each(function() {
		var inhtml = $(this).html();
		var parent = $(this).parent();
		parent.children().remove();
		parent.append(inhtml);
	});
	clearAll('num_check');

}
function callback(page,next) {
	if (!tag) {
		return;
	}
	if(edittag){
		next(null, !loadtag); 
		return false;	
	}
	ShowShade();
	var data = getMycomment();
	var lis = [];
	for (var i = 0; i < data.length; i++) {
				var lisr ='<li>'
				+ '<div class="comment-rg">'
				+ '<div class="pic">'
				+ '	<img src="'+data[i].headUrl+'" alt="" />'
				+ '</div>'
				+ '<div class="txt">'
				+ '	<h3>'
				+ '		<span class="cor_grey"><i class="icon iconTime"></i>'+formatDate2(data[i].commentTime)+'</span> <em class="cor_blue fr">'+ data[i].commentStatusName+'</em> ' + data[i].nickName 
				+ '</h3>'

				+ '	<p>'+data[i].commentText+'</p>'
				+ '	<h6 class="yuan">'
				+ '<a href="javascript:void(0)" _comment="'
				+ data[i].commentUid + '" _href="' + data[i].infoId + '">原文：'
				+ data[i].articleTitle + '</a>'
				+ '	</h6>'
				+ '</div>'
				+ '</div>'
				+ '</li>'
				
				
				
				
				
		lis.push(lisr);
	}
	next(lis.join(''), !loadtag); 
	$('.yuan').click(function() {
		var href_ = $(this).children('a');
		var infoid = $(href_).attr('_href');
		toInfoDetail(infoid);
		});
}
function getMycomment() {
	var data
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web() + "/usercomment/PersonCommentList",
		beforeSend : function() {

		},
		data : {
			pageNum : pageNum,
			pageSize : pageSize
		},
		success : function(resultMap) {
			if (fristload) {
				if (resultMap.rows.length == 0) {
					NoneError();
				}
			}
			fristload = false;
			if (resultMap.resultCode == 'Success') {
				if (pageNum * pageSize < resultMap.total) {
					pageNum = pageNum + 1;

				} else {
					tag = false;
					loadtag = true;
				}
				data = resultMap.rows;

			} else {
				$("#listcomment").append('<li><h4>加载失败</h4></li>');

			}

		},
		error : function() {
			if (fristload) {
				NoneError();
			}

		},
		complete : function() {
			closeShade();
		}
	});
	return data;
}
function NoneError() {
	$("#Infomation").children().remove();
	$("#Infomation")
			.append(
					'<div class="errorBox" style="width:95%"><img src="../img/pic/pic_none.png"><p>暂无数据</p></div>');

}
function ListChange() {
	if ($("#listcomment").children('li').length == 0) {
		NoneError();
	}
}

function delete_comnet() {

	var dataArray = new Array();
	$('input:checkbox[name=num_check]:checked').each(
			function(obj) {
				var a_comment = $(this).parent().parent().parent().children('.comment-rg')
				.children('.comment-rg').children('.txt').children('h6')
						.children('a');

				var _comment = $(a_comment).attr('_comment');
				dataArray.push(_comment);

			});
	deleCommnet(dataArray);
}

function deleCommnet(dataArray) {
	if (dataArray.length == 0) {
		return;
	}
	ShowShade();
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web() + "/usercomment/DeleteInformationComment",
		beforeSend : function() {

		},
		data : {
			commentUids : dataArray.join(',')
		},
		success : function(resultMap) {

			if (resultMap.resultCode == 'Success') {

				layer.msg('删除成功');
				$('input:checkbox[name=num_check]:checked').each(
						function(obj) {
							var a_comment = $(this).parent().parent().parent()
									.remove();
						});
				ListChange();

			} else {

				layer.msg('加载失败');
			}

		},
		error : function() {

			layer.msg('加载失败');
			if (fristload) {
				NoneError();
			}

		},
		complete : function() {
			closeShade();
		}
	});

}