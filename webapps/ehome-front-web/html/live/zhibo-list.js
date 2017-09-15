var pageSize=5;
var pageNumber=1;
var tag = true;
var loadtag = false;
$(function(){

	layui.use('flow', function(){
		var flow = layui.flow;
		flow.load({
			elem: '#live' //流加载容器
				,isLazyimg: true
				,done: function(page, next){ //加载下一页
					console.log(page);
					setTimeout(function(){
						var lis = [];
						if (!tag) {
							return;
						}
						var result = getData();
						if(result!=null)
							{
							for (var i = 0; i < result.length; i++) {
								if(result[i].status==4)
			        			{
			        				var state='<span class="fettle03" >回顾</span>';
			        			}
			        			if(result[i].status==3)
			    	        	{
			    	        		var state='<span class="fettle">直播中</span>';
			    	        	}
			    	        	if(result[i].status==2)
			    	        	{
			    	        		var state=' <span class="fettle02">敬请期待</span>';
			    	        	}
			    	        	var time=moment(new Date(result[i].startTime)).format("YYYY-MM-DD HH:mm:ss");
			    	        	if(result[i].status==3||result[i].status==2){
			    	        		lis.push('<a href="'+ getRootPath_web()+ '/live/showLive/'+ result[i].id+'"><div class="zhibobox">\
				    	        			<div class="tit"><p>'+result[i].videoName+'</p></div>\
				    	        			<div class="handle">\
						    	                <em class="fettle">'+state+'<i class="icon icon_zhibo"></i></em>\
						    	                <em class="join">'+result[i].totalNumber+'参与</em>\
						    	            </div>\
						    	            <div class="pic-cover"></div>\
						    	            <div class="pic" style="width:100%">\
						    	                <img style="max-width:100%;height:3.8rem" src="'+result[i].iconPath+'" alt="" class="img"/>\
						    	            </div>\
					    	            </div></a>');
			    	        	}else
		    	        		{
			    	        		lis.push('<a href="#" onclick="getReviewer('+result[i].id+')"><div class="zhibobox">\
				    	        			<div class="tit"><p>'+result[i].videoName+'</p></div>\
				    	        			<div class="handle">\
						    	                <em class="fettle">'+state+'<i class="icon icon_zhibo"></i></em>\
						    	                <em class="join">'+result[i].totalNumber+'参与</em>\
						    	            </div>\
						    	            <div class="pic-cover"></div>\
						    	            <div class="pic" style="width:100%">\
						    	                <img style="max-width:100%;height:3.8rem" src="'+result[i].iconPath+'" alt="" class="img"/>\
						    	            </div>\
					    	            </div></a>');
		    	        		}
			    	        	
			    	        	
								}
							}
						next(lis.join(''), !loadtag);
					}, 500);
				}
		});
		
	});	

})
function getReviewer(id)
{
	 $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/live/getReview/"+id,
			success : function(data) {
				if(data.data.length>0)
				{
					$("#getReviewList").children().remove();
					var result=data.data;
					for(var i=0;i<result.length;i++)
					{
						$("#getReviewList").append('<li><a href="'+getRootPath_web()+'/info/show/'+result[i].infoId+'?type=1'+'">'+result[i].infoTitle+'</a></li>')
					}
				}
				else
				{
					$("#getReviewList").children().remove();
					$("#getReviewList").append('<li><a href="#">暂无回顾</a></li>');
				}
				event.preventDefault();
			    $(".layer1").addClass("am-modal-active");
			    tolayer();
			},
	        error: function(XMLHttpRequest, textStatus, errorThrown){ 
	        	//调用异常（网络异常.超时异常级别）的提示失败，可以统一提示或者根据具体http状态代码
	        }, 
	        complete : function () {
	        //最后消除阻塞提示
	        }
	    });
}
function getData()
{
	var data
	 $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/live/getLiveList",
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
	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown){ 
	        	//调用异常（网络异常.超时异常级别）的提示失败，可以统一提示或者根据具体http状态代码
	        }, 
	        complete : function () {
	        //最后消除阻塞提示
	        }
	    });
	return data;
}