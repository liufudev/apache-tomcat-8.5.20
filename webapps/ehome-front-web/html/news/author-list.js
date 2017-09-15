var pageSize=10;
var pageNumber=1;
var tag = true;
var loadtag = false;
var reporterId;
$(function(){
	reporterId=getqueryString("reporterId");
	resporterInfo(reporterId);
	//infoList(reporterId);
});
function resporterInfo(reporterId)
{
	 $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/reporter/getReporterInfo",
	        data:{"reporterId":reporterId},
	        success: function (data) {
	        	console.log(data);
	        	var reslut=data.data;
	        	if(reslut!=null)
        		{
	        		$("#articleNumber").text(reslut.articleNumber);
	        		$("#followerNumber").text(reslut.followerNumber);
	        		$("#reporterName").text(reslut.name);
        		}
	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown){ 
	        	//调用异常（网络异常.超时异常级别）的提示失败，可以统一提示或者根据具体http状态代码
	        }, 
	        complete : function () {
	        //最后消除阻塞提示
	        }
	    });
}

layui.use('flow', function(){
	var flow = layui.flow;
	flow.load({
		elem: '#info' //流加载容器
			,isLazyimg: true
			,done: function(page, next){ //加载下一页
				console.log(page);
				setTimeout(function(){
					var lis = [];
					
					if (!tag) {
						return;
					}
					var result = getInfoList();
					console.log(result);
					for (var i = 0; i < result.length; i++) {
						lis.push('<div class="title mt10">\
					            <em></em>\
					        </div>\
					        <ul class="Box">\
					            <li>\
					                <a href="'
								+ getRootPath_web()
								+ '/info/show/'
								+ result[i].infoId
								+ '">\
					                    <div class="BoxA">\
					                        <div class="BoxA-lf">\
					                            <div class="summary">\
					                                <h3>'+result[i].infoTitle+'</h3>\
					                                <p>'+result[i].summary+'</p>\
					                            </div>\
					                        </div>\
					                        <div class="BoxA-rg">\
					                            <div class="pictureA">\
					                                <img src="'+result[i].infoCover+'" alt=""/>\
					                            </div>\
					                        </div>\
					                    </div>\
					                </a>\
					                <div class="authorBox">\
					                    <span class="Time"><i class="icon iconTime"></i>'+result[i].publishDateShow+'</span>\
					                    <span class="Author">阅读数   '+result[i].readNumber+'</span>\
					                </div>\
					            </li>\
					        </ul>')
					}
					
					next(lis.join(''), !loadtag);
				}, 500);
			}
	});
	
});
function getInfoList() {
	var data
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web()
				+ "/reporter/getInfoList",
		beforeSend : function() {

		},
		data : {
			reporterId:reporterId,
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
function infoList(reporterId)
{
	 $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/reporter/getInfoList",
	        data:{"reporterId":reporterId},
	        success: function (data) {
	        	console.log(data);
	        	if(data.data!=null)
        		{
	        		var result=data.data;
        			for(var i=0;i<result.length;i++)
        			{}
        		}
	        },
	        error:  function(XMLHttpRequest, textStatus, errorThrown){ 
	        	layer.msg('加载失败');
	        }, 
	        complete : function () {
	        //最后消除阻塞提示
	        }
	    });
}