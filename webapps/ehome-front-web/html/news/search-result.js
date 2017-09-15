$(function() {
	searchData(1,null);
	showTag();
});
function searchData(tagId) {
	var ishot=1;
	var value =$("#query").val();
	$('#area').children().remove();
	$('#info').children().remove();
	if (value!=null&&value.length > 0){
		areaResult(value);
		infoResult(value,ishot,tagId);
	}
}
function  showTag()
{
	$.ajax({
		type : "get",
		dataType : "json",
		async : false,
		url : getRootPath_web() + "/tag/getTag",
		success : function(data) {
			var result=data.data;
			console.log(result);
			if(result!=null)
			{
				for(var i=0;i<result.length;i++)
				{
					//$("#tag").append('<li><a href="#" onclick="searchData(\''+result[i].tagId+'\')">'+result[i].tagName+'</a></li>');
					$("#tag").append('<li><a href="'+getRootPath_web()+'/html/news/tagList.html?tagId='+result[i].tagId+'">'+result[i].tagName+'</a></li>');
				}
			}
		}
	});
}

function infoResult(q,ishot,tagId) {
	var urlValue;
	if(tagId!=null)
		{
		urlValue=getRootPath_web() + "/search/queryInfo?q=" + q+"&tagId="+tagId;
		}
	else
		{
		urlValue= getRootPath_web() + "/search/queryInfo?q=" + q+"&ishot=2";
		}
	$.ajax({
				type : "get",
				dataType : "json",
				async : false,
				url :urlValue,
				success : function(data) {
					if(data.data!=null)
						{
						var infoList = data.data;
						console.log(infoList);
							for (var i = 0; i < infoList.length; i++) {
								$("#info")
										.append(
												'<li>\
			                        <a href="detail.html">\
			                            <div class="BoxB">\
			                                <div class="summary">\
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
														+ infoList[i].publishDateShow
														+ '</span>\
										<span class="Author">作者：<a href="author-list.html">'
														+ infoList[i].resport
														+ '</a></span>\
			                        </div>\
			                    </li>');
							}
						}
				}
			});
}
function getqueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}