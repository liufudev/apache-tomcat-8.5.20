var pageSize=10;
var pageNumber=1;
var tag = true;
var loadtag = false;
$(function(){
	showType();
});

function query()
{
	var value=$("#qValue").val();
	pageSize=10;
	pageNumber=1;
	tag = true;
	loadtag = false;
	if (value!=null&&value.length > 0){
		$("#historyAll").children().remove();
//		$("#historyAll").append('<div class="catalog"><h3>地区</h3><ul class="Box"  id="area"></ul></div>');
//		$("#historyAll").append('<div class="catalog2"><h3>资讯</h3><ul class="Box" id="info"></ul></div>');
		$("#historyAll").append('<div class="catalog"><h3>活动</h3><ul class="Box" id="acti"></ul></div>');

//		areaResult(value);
//		infoResult(value);
		actiResult(value);
//		$("#history").children().remove();
	}
}



function  showType()
{
	$.ajax({
		type : "get",
		dataType : "json",
		async : false,
		url : getRootPath_web() + "/activitySearch/getTypeList",
		success : function(data) {
			var result=data.data;
			if(result!=null)
			{
				for(var i=0;i<result.length;i++)
				{
					$("#tag").append('<li><a href="'+getRootPath_web()+'/html/activity/tagList.html?typeId='+result[i].typeId+'">'+result[i].typeName+'</a></li>');
				}
			}
		}
	});
}



function actiResult(q,ishot) {
//	 tag = true;
//	 loadtag = false;
	 layui.use('flow', function(){
			var flow = layui.flow;
			flow.load({
				elem: '#acti' //流加载容器
					,isLazyimg: true
					,done: function(page, next){ //加载下一页
						setTimeout(function(){
							var list = [];
							if (!tag) {
								return;
							}
							//var data =showActivity();
							var data =getInfoList(q);
							//console.log(data);
							for (var i = 0; i < data.length; i++) {
						     var time=moment(new Date(data[i].beginTime)).format("YYYY/MM/DD HH:mm");
							 var status;
		                     if(data[i].activityStatus=='A6')
		                	 {
		                    	 status=' <span class="fettleF"><a href="#">火热报名中</a></span>'
		                	 }
		                     if(data[i].activityStatus=='A8')
		                     {
		                    	 status='<span class="fettleG"><a href="#">已开始</a></span>'
		                     }
		                     if(data[i].activityStatus=='A9')
		                     {
		                    	 status='<span class="fettleH"><a href="#">已结束</a></span>'
		                     }
		                     var isFree;
		                     if(data[i].isFree=='0')
		                	 {
		                    	 isFree='免费';
		                	 }
		                     else
		                	 {
		                    	 isFree='¥'+data[i].costNumber+'起';
		                	 }
		                     var tmp='<div class="authorBox">\
				                            '+status+'\
				                             <span class="free">'+isFree+'</span>\
				                             <span class="See2"><i class="icon iconSee"></i>'+data[i].sightNumber+'</span>\
			                          </div>'
								list.push('<li>\
							                    <div class="BoxA">\
							                        <div class="BoxA-lf">\
							                            <a href="activity-info.html?activityId='+data[i].activityId+'&type=detail'+'">\
							                                <div class="summary">\
							                                    <h3>'+data[i].activityName+'</h3>\
							                                </div>\
							                            </a>\
							                            <div class="authorBox">\
							                                <span class="Author"><a href="author-list.html">'+data[i].areaShow+'</a></span>\
							                                <span class="Time"><i class="icon iconTime"></i>'+time+'</span>\
							                            </div>\
							                             '+tmp+'\
							                        </div>\
							                        <div class="BoxA-rg">\
							                            <div class="pictureC">\
							                                <img src="'+data[i].activityPicPath+'" alt=""/>\
							                            </div>\
							                        </div>\
							                    </div>\
							                </li>');
							}
							next(list.join(''), !loadtag);
						}, 500);
					}
			});
		});


}


function getInfoList(q) {
	var data
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		 url:  getRootPath_web()+"/activitySearch/getByTypeId",
		beforeSend : function() {

		},
		data : {
			activityName:q,
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