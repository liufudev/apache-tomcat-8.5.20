/**
 * 
 */
var pageNum = 1;
var pageSize = 5;
var tag = true;
var loadtag = false;
var fristload = true; //是否第一次加载
var edittag = false; //是否编辑状态
layui.use('flow', function() {
	var flow = layui.flow;
	flow.load({
		elem : '#listCollection',
		isLazyimg : true,
		done : function(page, next) { // 加载下一页
			setTimeout(callback(page,next), 500);
		}
	});
});


$(function() {
   // $("#listCollection").children().remove();


})

function callback(page,next) {

    if (!tag) {
        return;
    }
	ShowShade();
    var data = personCollection();
	var lis = [];
    for (var i = 0; i < data.length; i++) {
    	var reporterName=''; 
		 var summary=data[i].summary;
	     var  str = '<li><div class="BoxB" > <div class="summary"><h2 _collectionUid="' + data[i].collectionUid + '" _href="' + data[i].infoId + '">' + data[i].infoTitle + '</h2> <p class="text_main">' + summary + '</p></div></div><div class="authorBox"><div class="hr"></div><span class="Author">'+reporterName+'</span></div></li>';
	     lis.push(str);
	    }
	next(lis.join(''), !loadtag); 
	$('.summary').click(function() {
		var href_ = $(this).children('h2');
		var infoid = $(href_).attr('_href');
		//toLiveDetail(infoid);
		});

}
function personCollection() {
    var data = '';
    $.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url: getRootPath_web() + "/usercollection/PersoncollectionList",
        beforeSend: function() {

},
        data: {
            type: 'LIVE'

        },
        success: function(resultMap) {
            if (resultMap.resultCode == 'Success') {
        		if (fristload) {
    				if (resultMap.rows.length == 0) {
    					NoneError();
    				}
    			}
                if (pageNum * pageSize < resultMap.total) {
                    pageNum = pageNum + 1;

                } else {
                    tag = false;
                    loadtag = true;
                }
                data = resultMap.rows;

            } else {
            	NoneError();
            	layer.msg('加载失败');
            }

        },	error : function() {
			if (fristload) {
				NoneError();
			}

		},complete : function () {
			closeShade();
        }
    });
    return data;
}

function edit(obj) {
    if (!edittag) {
        edittag = true;
        toedit();
        $(obj).text('完成');
    } else {
        edittag = false;
        CancelEdit();
        $(obj).text('编辑');
    }

}

function toedit() {
    $(".message-bottom").toggle();
    $("#listCollection").children('li').each(function() {
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

function NoneError() {
    $("#Infomation").children().remove();
    $("#Infomation").append('<div class="errorBox"><img src="../img/pic/pic_none.png"><p>暂无数据</p></div>');

}
function ListChange(){
	if( $("#listCollection").children('li').length==0){
		 NoneError();
	}
}
function delete_attention(){
	//alert($('input:checkbox[name=num_check]:checked').length);
	var dataArray=new Array();
	$('input:checkbox[name=num_check]:checked').each(function(obj){
		var _collectionuid=$(this).parent().parent().parent().children('.comment-rg').children('.BoxB').children('.summary').children('h2');
	
		var collectionuid=$(_collectionuid).attr('_collectionuid');
		dataArray.push(collectionuid);
		
		
	});	
	deleAttention(dataArray);
}
function deleAttention(dataArray){
	if(dataArray.length==0){
		return ;
	}
	ShowShade();
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web() + "/usercollection/deletecollection",
		beforeSend : function() {

		},
		data : {
			collectionUids:dataArray.join(',')
		},
		success : function(resultMap) {
		
			if (resultMap.resultCode == 'Success') {
				layer.msg('删除成功');
				$('input:checkbox[name=num_check]:checked').each(function(obj){
					var a_comment=$(this).parent().parent().parent().remove();
				});	
				 ListChange();
			} else {
				 ListChange();
				 layer.msg('删除失败');
			}

		},
		error : function() {
			layer.msg('加载失败');
			if (fristload) {
				 ListChange();
			}

		},complete : function () {
			closeShade();
        }
	});
	
	
	
}
