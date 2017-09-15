var socket;
var nickName;
var userId;
var headURL;
$(function(){
	$("#title").text($("#videoTitle").val());
	getUserInfo();
	showRemind();
	getServer();
	//在评论前判断是否登录
	checkLogin();
	sendMessage();
	if(checkCollect())
	{
		$("#collectNo").hide();
	  	$("#collectYes").show();
	}
	$("#time").text(moment(new Date()).format("YYYY-MM-DD"));
	
});
function thumpUpAddOne()
{
	$("#thumbsupNo").hide();
	$("#thumbsupYes").show();
	var number=parseInt($("#thumbsupNum2").text())+1;
	$("#thumbsupNum2").text(number);
	 $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/live/thumpUpAddOne",
	        data:{"liveId":$("#liveId").val()},
	        success: function (data) {
	        if("OK"==data.msg)
     		{
	        	layer.msg("点赞成功");
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
function openRemind(value)
{
	LoginCheck();
	 $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/live/operationRemind",
	        data:{"liveId":$("#liveId").val(),"operate":value},
	        success: function (data) {
	        	if("OK"==data.msg)
        		{
		        	if(value=='open')
	        		{
		        		$("#openRemind").val("cancel");
		        		$("#openRemind").text("取消提示");
	        		}
		        	if(value=='cancel')
		        	{
		        		 $("#openRemind").val("open");
		        	 	 $("#openRemind").text("开启提示");
		        	}
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
function showRemind()
{
	var type=$("#status").val();
	 if(type=="2")
	 {
		 $("#remind").show();
		 if("true"==$("#remindState").val())
		 {
			 $("#openRemind").val("cancel");
     		$("#openRemind").text("取消提示");
		 }
		 else{
			 $("#openRemind").val("open");
    	 	 $("#openRemind").text("开启提示");
		 }
	 }
	 else
	 {
		 $("#remind").remove();
	 }
}
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
function getServer()
{
	 $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/liveServer/getLiveServer",
	        data:{"liveId":$("#liveId").val()},
	        success: function (data) {
	        	var reslut=data.data;
	        	if(reslut!=null)
     		{
	        		//建立连接
	        		socket =  io.connect(reslut);
	        		var origin;
	        		if(isWeiXin())
	        			{
	        			origin="1"
	        			}
	        		else{
	        			origin="2"
	        		}
	        		
	        		socket.on('connect', function() {
	        			   var jsonObject = {
	        					   	userId:userId,
	        						  type:"front",
	        						  origin:origin,
	        						  ip:returnCitySN["cip"]};
	        		  	 socket.emit('record', jsonObject);
	        		});
	        		//响应服务端请求聊天请求
	        		socket.on('sendToFront', function(data) {
	        			$("#talkBoxShow").after('<li>\
	                            <div class="time-node"><em class="round"></em><span> '+  moment().format('HH:mm') +'</span></div>\
	                            <div class="bordiv">\
	                                <div class="pic">\
	                                    <img src="'+data.headURL+'" alt=""/>\
	                                </div>\
	                                <div class="txt">\
	                                    <h3>'+data.nickName+'</h3>\
	                                    <p>'+data.message+'</p>\
	                                </div>\
	                            </div>\
	                        </li>');
		        				if($("#talkBox li").length>50)
		        					{
		        						$("#talkBox li:last-child").remove();
		        					}
		        				
	        		});
	        		//响应服务端请求正文发送请求
	        		socket.on('introduce', function(data) {
	        			var content=data.message;
		        		var number=content.split("IMG/live").length-1;
		        		var showType;
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
		        		var time=moment(new Date()).format("HH:mm");
		        		if(data.referenceObj!=null&&data.referenceObj.length>0)
		        			{
		        			$("#introduceHis").after('<li id="'+data.chatId+'">\
	                                <div class="time-node"><em class="round"></em><span>'+time+'</span></div>\
	                                <div class="summary bordiv">\
	                                    <div class="bang"><img src="../../img/icon/icon_bang.png"></div>\
	                                    <h2><i class="icon icon_e"></i> [直播员] '+data.nickName+'</h2>\
		        					    <div class="'+showType+'">'+content+'</div>\
	                                    <div class="ydiv">\
	                                        <h6><span>'+moment(new Date(data.referenceTime)).format("HH:mm")+'</span>'+data.referenceUser+'</h6>\
	                                        <div class="'+showType+'">'+data.referenceConetent+'</div>\
	                                    </div>\
	                                </div>\
	                            </li>');
		        			}
		        		else
		        			{
		        			$("#introduceHis").after('<li>\
		        					<div class="time-node"><em class="round"></em><span>'+time+'</span></div>\
		        					<div class="summary bordiv">\
		        					<h2><i class="icon icon_e"></i> [直播员] '+data.nickName+'</h2>\
		        					<div class="'+showType+'">'+content+'</div>\
		        					</div>\
		        			</li>');
		        			}
	        		});
	        		socket.on('stick', function(data) {
	        			var chatId=data.chatId;
	        			console.log(chatId);
	        			var temId="#"+chatId;
	        			$($(temId).children().get(1)).append('<div class="zhiding"><img src="../../img/icon/icon_zd.png"></div>');
	        			//$("#introduceShow").append($("#chatId"));
	        			$("#introduceStick").after($(temId));
	        		});
	        		socket.on('totalNumber', function(data) {
	        			$("#totalNumber").text(data);
	        		});
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
function checkLogin()
{
	$("#sayTmp").click(function(){
		var result=LoginCheck();
		if(result)
			{
			getUserInfo();
			checkBan();
			}
	});
}
function checkBan()
{
	 $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/liveServer/checkBan",
	        data:{"liveId":$("#liveId").val(),userId:userId},
	        success: function (data) {
	        	if(data.data)
        		{
	        		alert("您在该直播间已被禁言！");
        		}
	        	else
        		{
	        		$('#say').click();
	        		$("#content").focus();
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
function getUserInfo()
{
	 $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/live/getUserInfo",
	        success: function (data) {
	        	var result=data.data;
	        	if(result!=null)
	        		{
	        		nickName=result.nickName;
	        		userId=result.webUserId;
	        		headURL=result.headUrl;
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
function sendMessage() {
	$("#send").click(function(){
		var message = $('#content').val();
	    $('#content').val('');
	    var jsonObject = {nickName:nickName,
				  userId:userId,
				  headURL:headURL,
                message: message};
  	 socket.emit('chat', jsonObject);
	   
	});
    
}
/**
 * 收藏
 * 
 * @returns
 */
function SaveCollect() {
	if(!LoginCheck()){
		 return ;
	}
	var data
	if (checkCollect()) {
		Cancelollect();
		return;
	}
	ShowShade();
	$.ajax({
				type : "post",
				dataType : "json",
				async : false,
				url : getRootPath_web()
						+ "/usercollection/Savecollection",
				beforeSend : function() {

				},
				data : {
					objId : $('#liveId').val(),
					objType : 'LIVE'

				},
				success : function(resultMap) {
					layer.msg(resultMap.resultReason);
					if(resultMap.pojo){
						$("#collectNo").hide();
					  	$("#collectYes").show();
					}


				},error : function() {
	        	layer.msg('加载失败');
	
				},complete : function () {
						closeShade();
			    }
			});
	return data;
}
function checkCollect() {
	var tage_Collect=false;

	$.ajax({
				type : "post",
				dataType : "json",
				async : false,
				url : getRootPath_web()
						+ "/usercollection/Checkcollection",
				beforeSend : function() {
				},
				data : {
					objId : $('#liveId').val(),
					objType : 'LIVE'

				},
				success : function(resultMap) {
					if(resultMap.pojo){
						tage_Collect = true;
					}


				}
			});
	return tage_Collect;
}
/**
 * 取消收藏
 * 
 * @returns
 */

function Cancelollect() {
	if(!LoginCheck()){
		 return ;
	}
	ShowShade();
	var data
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web()
				+ "/usercollection/Cancelcollection",
		beforeSend : function() {

		},
		data : {
			objId : $('#liveId').val(),
			objType : 'LIVE'
		},
		success : function(resultMap) {
			layer.msg(resultMap.resultReason);
			$("#collectNo").show();
			$("#collectYes").hide();

		},error : function() {
	        	layer.msg('加载失败');
	
		},complete : function () {
				closeShade();
	    }
	});
	return data;
}
