var pageSize=5;
var pageNumber=1;
var tag = true;
var loadtag = false;
$(function(){
	showTag();
	loadHotKey();
});
function loadHotKey()
{
	 $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/hotSearch/getHotList",
	        success: function (data) {
	        	var hotKeyList=data.data;
	        	for(var i=0;i<hotKeyList.length;i++)
        		{
	        		var q=hotKeyList[i].hotContent;
	        		if(i<3)
        			{
	        			$("#hotKey").append('<a href="#" onclick="history(\''+q+'\')"><li><em class="bg00'+(i+1)+'">'+(i+1)+'</em><span>'+hotKeyList[i].hotContent+'</span></li></a>');
        			}
	        		else
        			{
	        			$("#hotKey").append('<a href="#" onclick="history(\''+q+'\')"><li><em class="bg004">'+(i+1)+'</em><span>'+hotKeyList[i].hotContent+'</span></li></a>');
        			}
        		}
	        }
	    });
}



function query()
{
	var value=$("#qValue").val();
	if (value!=null&&value.length > 0){
		$("#historyAll").children().remove();
		$("#historyAll").append('<div class="catalog"><h3>地区</h3><ul class="Box"  id="area"></ul></div>');
		$("#historyAll").append('<div class="catalog2"><h3>资讯</h3><ul class="Box" id="info"></ul></div>');
		areaResult(value);
		infoResult(value);
		$("#history").children().remove();
	}
}

function loadQHistory()
{
	$("#historyAll").children().remove();
	$("#historyAll").append('<ul id="history"> </ul>\
            <p class="clear_all" id="clear" onclick="dele()"><i class="icon iconDelete"></i>&nbsp;&nbsp;清空搜索历史</p>');
	$.ajax({
		type: "post",
		dataType: "json",
		async: false,
		url:  getRootPath_web()+"/search/getHistory",
		success: function (data) {
			if(data.data!=null)
			{
				var result=data.data;
				for(var i=0;i<result.length;i++)
				{
					$("#history").append('<li onclick="history(\''+result[i]+'\')"><span>'+result[i]+'</span></li>');
				}
			}
		}
	});
	
}
function dele()
{
	$.ajax({
		type: "post",
		dataType: "json",
		async: false,
		url:  getRootPath_web()+"/search/clearHistory",
		success: function (data) {
			$("#history").remove();
		}
	});
}
function history(value)
{
	$("#qValue").val(value);
	query();
	$("#history").next().remove();
	$("#history").children().remove();
}
$(document).on("keyup", "#qValue", function() {
	if($("#qValue").val().length==0)
		{
			$("#hotKey1").show();
		}
});
function  showTag()
{
	$.ajax({
		type : "get",
		dataType : "json",
		async : false,
		url : getRootPath_web() + "/tag/getTagList",
		success : function(data) {
			var result=data.data;
			if(result!=null)
			{
				for(var i=0;i<result.length;i++)
				{
					$("#tag").append('<li><a href="'+getRootPath_web()+'/html/news/tagList.html?tagId='+result[i].tagId+'">'+result[i].tagName+'</a></li>');
				}
			}
		}
	});
}
function areaResult(q) {
	$.ajax({
		type : "get",
		dataType : "json",
		async : false,
		url : getRootPath_web() + "/search/queryArea?q=" + q,
		success : function(data) {
			var result=data.data
			if(result!=null)
			{
				$("#hotKey1").hide();
				var areaList = data.data.resultList;
				for (var i = 0; i < areaList.length; i++) {
					$("#area").append(' <h4>' + areaList[i].areaName + '</h4> ');
				}
			}
			else
			{
				$("#hotKey1").show();
			}
		}
	});
}
function infoResult(q,ishot) {
	 tag = true;
	 loadtag = false;
	layui.use('flow', function(){
		var flow = layui.flow;
		flow.load({
			elem: '#info' //流加载容器
				,isLazyimg: true
				,done: function(page, next){ //加载下一页
					setTimeout(function(){
						var lis = [];
						if (!tag) {
							return;
						}
						var infoList = getInfo(q);
						if(infoList!=null)
						{
							for (var i = 0; i < infoList.length; i++) {
								var time=moment(new Date(infoList[i].publishTime)).format("YYYY-MM-DD HH:mm");
								lis.push('<li>\
				                        <a href="'
											+ getRootPath_web()
											+ '/info/show/'
											+ infoList[i].infoId
											+ '">\
		                            <div class="BoxB">\
		                                <div class="summary">\
											 <h3>'+ infoList[i].infoTitle+'</h3>\
		                                    <p>'
													+ infoList[i].summary
													+ '</p>\
		                                </div>\
		                            </div>\
		                        </a>\
		                        <div class="authorBox">\
		                            <div class="hr"></div>\
	                                <span class="See"><i class="icon iconSee"></i>'
													+ infoList[i].readNumber
													+ '</span> \
									<span class="Time"><i class="icon iconTime"></i>'
													+ time
													+ '</span>\
									<span class="Author">作者：<a href="author-list.html">'
													+ infoList[i].resport
													+ '</a></span>\
		                        </div>\
		                    </li>');
							}
						}
						
						next(lis.join(''), !loadtag);
					}, 500);
				}
		});
		
	});
}
function getInfo(q) {
	var urlValue= getRootPath_web() + "/search/queryInfo?q=" + q+"&ishot=2";
	var data
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url :urlValue,
		beforeSend : function() {

		},
		data : {
			pageNum : pageNumber,
			pageSize : pageSize
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

		}
	});
	return data;
}