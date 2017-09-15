var pageSize=5;
var chatPageNumber=1;
var introducePageNumber=1;
var tagChat = true;
var loadtagChat = false;
var tagIntroduce = true;
var loadtagIntroduce = false;
var liveId=$("#liveId").val();
layui.use('flow', function(){
	  var flow = layui.flow;
	  flow.load({
	    elem: '#introduce' //流加载容器
	    ,isLazyimg: true
	    ,done: function(page, next){ //加载下一页
	      console.log(page);
	      setTimeout(function(){
	      	var lis = [];
		    
			if (!tagIntroduce) {
				return;
			}
			var data = getIntroduceHistory();
			if(data!=null)
				{
				var count=1;
				for (var i = 0; i < data.length; i++) {
					var showType;
	    			var content=data[i].content;
	        		var number=content.split("IMG/live").length-1;
	        		if(number==1)
	    			{
	        			showType="picture pictureone";
	    			}
	        		if(number==2)
	        		{
	        			showType="picture picturetwo";
	        		}
	        		if(number>=3)
	        		{
	        			showType="picture picturethree";
	        		}
					var time=moment(new Date(data[i].publishTime)).format("HH:mm");
					if(data[i].orderBy!=0)
					{
						lis.push('<li id="'+data[i].id+'">\
                                <div class="time-node"><em class="round"></em><span>'+time+'</span></div>\
                                <div class="summary bordiv">\
                                    <div class="zhiding"><img src="../../img/icon/icon_zd.png"></div>\
                                    <h2><i class="icon icon_e"></i> [直播员]'+data[i].nickname+'</h2>\
									<div class="'+showType+'">'+content+'</div>\
                                </div>\
                            </li>');
					}
					else
					{
						if(count==1)
						{
							lis.push('<input type="hidden" id="introduceHis">');
							count++;
						}
						if(data[i].referenceObj!=null)
						{
							lis.push('<li id="'+data[i].id+'">\
                                <div class="time-node"><em class="round"></em><span>'+time+'</span></div>\
                                <div class="summary bordiv">\
                                    <div class="bang"><img src="../../img/icon/icon_bang.png"></div>\
                                    <h2><i class="icon icon_e"></i> [直播员] '+data[i].nickname+'</h2>\
									<div class="'+showType+'">'+content+'</div>\
                                    <div class="ydiv">\
                                        <h6><span>'+moment(new Date(data[i].referenceTime)).format("HH:mm")+'</span>'+data[i].referenceUser+'</h6>\
                                        '+data[i].referenceConetent+'\
                                    </div>\
                                </div>\
                            </li>');
						}
						else{
							lis.push('<li id="'+data[i].id+'">\
									<div class="time-node"><em class="round"></em><span>'+time+'</span></div>\
									<div class="summary bordiv">\
									<h2><i class="icon icon_e"></i> [直播员]'+data[i].nickname+'</h2>\
									<div class="'+showType+'">'+content+'</div>\
									</div>\
							</li>');
						}
					}
					}
				}
			else
				{
					$("#introduce").append('<input type="hidden" id="introduceHis">');
				}
			next(lis.join(''), !loadtagIntroduce);
	      }, 500);
	    }
	  });
	  
});
layui.use('flow', function(){
	var flow = layui.flow;
	flow.load({
		elem: '#chat' //流加载容器
			,isLazyimg: true
			,done: function(page, next){ //加载下一页
				console.log(page);
				setTimeout(function(){
					var lis = [];
					
					if (!tagChat) {
						return;
					}
					var data = getChatHistory();
					console.log(data);
					for (var i = 0; i < data.length; i++) {
						lis.push(' <li>\
                            <div class="time-node"><em class="round"></em><span>'+ formatDate2(data[i].sendTime) +'</span></div>\
                            <div class="bordiv">\
                                <div class="pic">\
                                    <img src="'+data[i].headUrl+'" alt=""/>\
                                </div>\
                                <div class="txt">\
                                    <h3>'+data[i].nickName+'</h3>\
                                    <p>'+data[i].chatContent+'</p>\
                                </div>\
                            </div>\
                        </li>');
					}
					
					next(lis.join(''), !loadtagChat);
				}, 500);
			}
	});
	
});
function getChatHistory() {
	var data
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web()
				+ "/liveRecord/getChatHistory",
		beforeSend : function() {

		},
		data : {
			liveid : $("#liveId").val(),
			pageNum : chatPageNumber,
			pageSize : pageSize
		},
		success : function(resultMap) {
			if (resultMap.resultCode == 'Success') {
				if (chatPageNumber * pageSize < resultMap.total) {
					chatPageNumber = chatPageNumber + 1;

				} else {
					tagChat= false;
					loadtagChat = true;
				}
				data = resultMap.rows;

			} else {

				layer.msg("亲您的网络不太好")
			}

		}
	});
	return data;
}
function getIntroduceHistory() {
	var data
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web()
		+ "/liveRecord/getIntroduceHistory",
		beforeSend : function() {
			
		},
		data : {
			liveId :  $("#liveId").val(),
			pageNum : introducePageNumber,
			pageSize : pageSize
		},
		success : function(resultMap) {
			if (resultMap.resultCode == 'Success') {
				if (introducePageNumber * pageSize < resultMap.total) {
					introducePageNumber = introducePageNumber + 1;
					
				} else {
					tagIntroduce = false;
					loadtagIntroduce = true;
				}
				data = resultMap.rows;
				
			} else {
				
				layer.msg("亲您的网络不太好")
			}
			
		}
	});
	return data;
}