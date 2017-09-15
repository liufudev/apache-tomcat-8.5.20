var pageSize=5;
var pageNumber=1;
var tag = true;
var loadtag = false;
$(function(){
	loadArea();
	showLoop();
	showType();
	layui.use('flow', function(){
		var flow = layui.flow;
		flow.load({
			elem: '#activityList' //流加载容器
				,isLazyimg: true
				,done: function(page, next){ //加载下一页
					setTimeout(function(){
						var list = [];
						if (!tag) {
							return;
						}
						var data =showActivity();
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
});
function loadArea() {
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web() + "/info/getArea",
		success : function(data) {
			if (data.data != null) {
				var result = data.data;
				$("#areaName").text(result.areaName);
			}
		},	error : function() {
        	layer.msg('加载失败');

		},complete : function () {
			//closeShade();
        }
	});
}
//展示轮播图
function showLoop()
{
	 $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/activityIndex/getActivityLoop",
	        success: function (data) {
	        	if(data.resultCode=='200')
        		{
	        		var result=data.rows;
	        		console.log(result);
	        		if(result.length>0)
        			{
	        			for(var i=0;i<result.length;i++)
        				{
	        				if(result[i].loopType=='3')
        					{
	        					$("#loop").append('<li>\
	        							<a class="pic" href="'+result[i].link+'"><img src="'+result[i].loopPic+'"/></a>\
	        							<a class="tit" href="'+result[i].link+'">'+result[i].content+'</a>\
	        					</li>');
        					}
	        				else
        					{
	        					$("#loop").append('<li>\
	        							<a class="pic" href="'+result[i].link+'"><img src="'+result[i].loopPic+'"/></a>\
	        							<a class="tit" href="'+result[i].link+'">'+result[i].content+'<span class="advertisement">广告</span> </a>\
	        					</li>');
        					}
        				}
        			}
        		}
	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown){ 
	        }, 
	        complete : function () {
	        //最后消除阻塞提示
	        }
	    });
}
//展示分类
function showType()
{
	if(!isShowType())
	{
		 $.ajax({
		        type: "post",
		        dataType: "json",
		        async: false,
		        url:  getRootPath_web()+"/activityIndex/getActivityType",
		        success: function (data) {
		        	var result=data.rows;
		        	if(result.length>0)
	        		{
		        		for(var i=0;i<result.length;i++)
	        			{
		        			console.log(result[i]);
		        			$('#type').append('<li>\
			                        <a href="'+getRootPath_web()+'/html/activity/activity-classification.html?typeId='+result[i].typeId+'">\
			                        <img src="'+result[i].picPath+'" width="50px" height="50px"/>\
			                        <p>'+result[i].typeName+'</p>\
			                    </a>\
			                </li>');
	        			}
	        		}
		        },
		        error: function(XMLHttpRequest, textStatus, errorThrown){ 
		        }, 
		        complete : function () {
		        //最后消除阻塞提示
		        }
		    });
	}
}
//展示分类前判断是否需要展示分类
function isShowType()
{
	var value;
	 $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/activityIndex/getActivityTypeShow",
	        success: function (data) {
	        	if(data.status==200)
        		{
	        		value=data.data;
        		}
	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown){ 
	        }, 
	        complete : function () {
	        //最后消除阻塞提示
	        }
	    });
	 return value;
}
//展示活动
function showActivity()
{
	var data
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url:  getRootPath_web()+"/activityIndex/getActivityList",
		beforeSend : function() {

		},
		data : {
			pageNum : pageNumber,
			pageSize : pageSize
		},
		success : function(resultMap) {
			console.log(resultMap);
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

