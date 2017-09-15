var activityId;
$(function(){
	initKey();
	activityId=getqueryString("activityId");
	var type=getqueryString("type");
	if(type==""||type==null){
		type='detail';
	}
	if(type=='detail'){
		$("#liActivity").addClass("cur");
		$("#liComment").removeClass("cur");
		
		$("#divDetail").addClass("mact");
		$("#divDetail").removeClass("none mact");
		$("#divComment").addClass("none mact");
		$("#divComment").removeClass("mact");
		
		$("#divComment").css('display','none');
		$("#divDetail").css('display','block'); 
		loadActivityDetail(activityId);
	}else if(type=='comment'){
		$("#liComment").addClass("cur");
		$("#liActivity").removeClass("cur");
		
		$("#divComment").addClass("mact");
		$("#divComment").removeClass("none mact");
		$("#divDetail").addClass("none mact");
		$("#divDetail").removeClass("mact");
		
		$("#divDetail").css('display','none');
		$("#divComment").css('display','block'); 
		loadActivityDetailComment(activityId);
	}else{
		$("#liActivity").addClass("cur");
		$("#liComment").removeClass("cur");
		
		$("#divDetail").addClass("mact");
		$("#divDetail").removeClass("none mact");
		$("#divComment").addClass("none mact");
		$("#divComment").removeClass("mact");
		
		$("#divComment").css('display','none');
		$("#divDetail").css('display','block'); 
		loadActivityDetail(activityId);
	}
	$("#liActivity").click(function(){
		$("#liActivity").addClass("cur");
		$("#liComment").removeClass("cur");
		
		$("#divDetail").addClass("mact");
		$("#divDetail").removeClass("none mact");
		$("#divComment").addClass("none mact");
		$("#divComment").removeClass("mact");
		
		$("#divComment").css('display','none');
		$("#divDetail").css('display','block'); 
	    loadActivityDetail(activityId);
	});
	$("#liComment").click(function(){
		$("#liComment").addClass("cur");
		$("#liActivity").removeClass("cur");
		
		$("#divDetail").removeClass("mact");
		$("#divDetail").addClass("none mact");
		$("#divComment").removeClass("none mact");
		$("#divComment").addClass("mact");
		
		$("#divDetail").css('display','none');
		$("#divComment").css('display','block'); 
	    loadActivityDetailComment(activityId);
	});
	
	judgeCollection();
	//judgeEnroll();
	getActivityStatus();
	//judgeCollectionDiv();
	//收藏活动
	$('#collectTag').bind("click", function(){
		doCollection();
		$("#divCollect").hide();
		$("#divCancelCollect").show();
	});
	//取消收藏活动
	$('#cancelCollectTag').bind("click", function(){
		doCancelCollection();
		$("#divCollect").show();
		$("#divCancelCollect").hide();
	});
	
	//活动详情
	$('#liActivity').bind("click", function(){
		loadActivityDetail(activityId);
	});
	
	//评论和咨询展示前三条
	$('#liComment').bind("click", function(){
		loadActivityDetailComment(activityId);
	});
	
	//转向全部评论页面
	$('#ulCommentAll').bind("click", function(){
		loadActivityAllComment(activityId);
	});
	
	//转向全部咨询页面
	$('#ulConsultAll').bind("click", function(){
		loadActivityAllConsult(activityId);
	});
	//点击地址名称调用地图
	$("#activityLocale").click(function(){
		loadMap();
	});
	
});

//初始化要显示的按钮
function initShowDiv(){
	
}

//加载地图
function loadMap(){
	var dest=$("#activitySite").val();
	var destName=$("#activityLocale").val();
	var key=$("#key").val();
	if(dest.length>0)
	{
		self.location='http://m.amap.com/navi/?start=&dest='+dest+'&destName='+destName+'&key='+key;
	}
}


//初始化地图key
function initKey(){
	$.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url:  getRootPath_web()+"/activityDetail/getMapKey",
        success: function (data) {
        	console.log(data);
        	if(data.status=='200')
    		{
        		$("#key").val(data.data);
    		}
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){ 
        }, 
        complete : function () {
        }
    });
}


//展示活动详情
function loadActivityDetail(activityId){
	//alert("aa");
	ShowShade();
	$.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url:  getRootPath_web()+"/activityDetail/getActivityDetailById?activityId="+activityId,
        //url:  getRootPath_web()+"/activityDetail/getActivityDetail?activityId="+activityId,
        success: function (data) {
        	console.log(data);
        	//alert(data);
        	if(data){
        		var bean=data.rows[0];
        		if(bean){
        		
	        		$("#activitySite").val(bean.activitySite);
	        		$("#activityLocale").val(bean.activityLocale);
	        		$("#activityLocaleShow").text(bean.activityLocale);
	        		$("#activityPicPath").html("<img src='"+bean.activityPicPath+"' alt=''/>");	
	        		$("#activityId").val(bean.activityId);
	        		$("#sightNumber").html(bean.sightNumber);
	        		$("#collectNumber").html(bean.collectNumber);
	        		var beginTime=moment(new Date(bean.beginTime)).format("YYYY/MM/DD HH:mm");
	        		$("#beginTime").html(beginTime);
	        		var endTime=moment(new Date(bean.endTime)).format("YYYY/MM/DD HH:mm");
	        		$("#endTime").html(endTime);
	        		$("#activityLocaleShow").html(bean.activityLocale);
	        		var isFree=bean.isFree;//0免费，1收费
	        		if(isFree==1){
	        			$("#costNumber").html(bean.costNumber+"元起");
	        		}else if(isFree==0){
	        			$("#costNumber").html("免费");
	        		}
	        		//$("#activityPhone").html(bean.activityPhone);
	        		//<a href="tel:13922897782">移动WEB页面JS一键拨打号码咨询功能</a>
	        		$("#activityPhone").html("<a href='tel:"+bean.activityPhone+"'>拨打电话"+bean.activityPhone+"</a>");
	        		$("#activityNumber").html(bean.activityNumber);
	        		$("#enrollNumber").html(bean.enrollNumber);
	        		$("#activityDetail").html(bean.activityDetail);
        		
        		}
        	}
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){ 
        	
        }, 
        complete : function () {
        	//最后消除阻塞提示
        	closeShade();
        }
    });
}


//收藏活动
function doCollection(){
	ShowShade();
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web()+ "/activityDetail/saveActivityCollection",
		//url : getRootPath_web()+ "/usercollection/Savecollection",
		beforeSend : function() {
			LoginCheck();
		},
		data : {
			activityId : $('#activityId').val(),
		},
		success : function(result) {
			layer.msg(result.resultReason);
		},error : function() {
	        	layer.msg('请求失败');
	
		},complete : function () {
			//最后消除阻塞提示
			closeShade();
	    }
	});
}


//取消收藏活动
function doCancelCollection(){
	ShowShade();
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web()+ "/activityDetail/deleteActivityCollection",
		//url : getRootPath_web()+ "/usercollection/Cancelcollection",
		beforeSend : function() {
			LoginCheck();
		},
		data : {
			activityId : $('#activityId').val(),
		},
		success : function(result) {
				layer.msg(result.resultReason);
		},error : function() {
	        	layer.msg('请求失败');
	
		},complete : function () {
			//最后消除阻塞提示	
			closeShade();
	    }
	});
}

function judgeCollectionDiv(){
	$("#divCollect").show();
	$("#divCancelCollect").hide();
}

//判断是否收藏活动
function judgeCollection(){
	ShowShade();
	$.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url:  getRootPath_web()+"/activityDetail/getActivityCollection?activityId="+activityId,
        //url:  getRootPath_web()+"/usercollection/Checkcollection?activityId="+activityId,
        success: function (data) {
        	if(data){
        		if(data.resultCode=='Success'){
        			$("#divCollect").hide();
        			$("#divCancelCollect").show();
        		}else if(data.resultCode=='False'){
        			$("#divCollect").show();
        			$("#divCancelCollect").hide();
        		}else if(data.resultCode=='NoLogin'){
        			$("#divCollect").show();
        			$("#divCancelCollect").hide();
        		}
        	}
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){ 
        }, 
        complete : function () {
        	//最后消除阻塞提示	
        	closeShade();
        }
    });
}


//判断是否报名活动
function judgeEnroll(){
	ShowShade();
	//alert("aa");
	$.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url:  getRootPath_web()+"/activityDetail/getActivityEnroll?activityId="+activityId,
        success: function (data) {
        	if(data){
        		if(data.resultCode=='Success'){
        			$("#divEnroll").hide();
        			$("#divCancelEnroll").show();
        			enrollId=data.pojo.enrollId;
        		}else if(data.resultCode=='False'){
        			$("#divEnroll").show();
        			$("#divCancelEnroll").hide();
        		}else if(data.resultCode=='NoLogin'){
        			$("#divEnroll").show();
        			$("#divCancelEnroll").hide();
        		}
        	}
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){ 
        }, 
        complete : function () {
        	//最后消除阻塞提示
        	closeShade();
        }
    });
}

var enrollId;
function toEnrollDetail(){
	window.location.href=getRootPath_web()+"/activity/orderActivityView?enrollId="+enrollId;
}


//判断活动状态
function getActivityStatus(){
	ShowShade();
	//alert("aa");
	$.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url:  getRootPath_web()+"/activityDetail/getActivityStatus?activityId="+activityId+"&type=detail",
        success: function (data) {
        	if(data){
        		var pojo=data.pojo;
        		if(pojo){
        			var activityStatus=data.pojo.activityStatus;
            		if(activityStatus=='A8'){//已开始
            			$("#divAlreadyStart").hide();
            			$("#divAlreadyEnd").hide();
            			$("#divEnroll").hide();
            			$("#divCancelEnroll").hide();
            		}else if(activityStatus=='A9'){//已结束
            			$("#divAlreadyStart").hide();
            			$("#divAlreadyEnd").show();
            			$("#divEnroll").hide();
            			$("#divCancelEnroll").hide();
            		}else if(activityStatus=='A6'){//已发布(可以报名或者取消报名)
            			$("#divAlreadyStart").hide();
            			$("#divAlreadyEnd").hide();
            			judgeEnroll();
//            			$("#divEnroll").hide();
//            			$("#divCancelEnroll").hide();
            		}
        		}
        		
        	}
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){ 
        }, 
        complete : function () {
        	//最后消除阻塞提示
        	closeShade();
        }
    });
}


//加载评论和咨询
function loadActivityDetailComment(activityId){
	loadActivityThreeComment(activityId);
	loadActivityThreeConsult(activityId);
	selectActivityTotalCommentNum(activityId);
	selectActivityTotalConsultNum(activityId);
}



//默认加载三条评论
function loadActivityThreeComment(activityId){
	ShowShade();
	$.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url:  getRootPath_web()+"/activityDetail/selectThreeActivityComment?activityId="+activityId,
        success: function (data) {
        	if(data){
        		var rows=data.rows;
        		$("#ulComment").html("");//清空列表
        		if(rows!=null&&rows.length>0){
        			for(var i=0;i<rows.length;i++){
            			$("#ulComment").append("<li>" +
            					"<div class='pic'>" +
            					"<img src='"+rows[i].headUrl+"' alt=''/>"+
            					"</div>" +
            					"<div class='txt'>" +
            					"<h3><span>" +moment(new Date(rows[i].commentTime)).format("YYYY-MM-DD HH:mm:ss") +"</span>"+
            					rows[i].nickName +"</h3>" +
            					"<p>" +rows[i].commentText +"</p>" +
            					"</div>"+
            					"</li>");

            		}
        		}
        		
        	}
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){ 
        }, 
        complete : function () {
        	//最后消除阻塞提示
        	closeShade();
        }
    });
}



//加载所有评论总数
function selectActivityTotalCommentNum(activityId){
	ShowShade();
	$.ajax({
      type: "post",
      dataType: "json",
      async: false,
      url:  getRootPath_web()+"/activityDetail/selectActivityTotalCommentNum?activityId="+activityId,
      success: function (data) {
      	//console.log(data);
      	var num=data.rows[0].totalCommentNum;
      	$("#totalCommentNum").html("评论（"+num+"）");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown){ 
      }, 
      complete : function () {
    	//最后消除阻塞提示
    	  closeShade();
      }
  });
}
//转向所有评论
function loadActivityAllComment(activityId){
	//window.parent.doChangeIframe('/html/activity/activity-all-comment.html?activityId='+activityId); 
	window.location.href=getRootPath_web()+"/html/activity/activity-all-comment.html?activityId="+activityId;
}

//转向所有咨询
function loadActivityAllConsult(activityId){
	//window.parent.doChangeIframe('/html/activity/activity-all-consultation.html?activityId='+activityId); 
	window.location.href=getRootPath_web()+"/html/activity/activity-all-consultation.html?activityId="+activityId;
}


//默认加载三条咨询
function loadActivityThreeConsult(activityId){
	ShowShade();
	$.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url:  getRootPath_web()+"/activityDetail/selectThreeActivityConsult?activityId="+activityId,
        success: function (data) {
        	if(data){
        		var rows=data.rows;
        		$("#ulConsult").html("");//清空列表
        		if(rows!=null&&rows.length>0){
        			for(var i=0;i<rows.length;i++){
            			$("#ulConsult").append("<li>" +
            					"<div class='pic'>" +
            					"<img src='"+rows[i].headUrl+"' alt=''/>"+
            					"</div>" +
            					"<div class='txt'>" +
            					"<h3><span>" +moment(new Date(rows[i].consultDate)).format("YYYY-MM-DD HH:mm:ss") +"</span>"+
            					rows[i].nickName +"</h3>" +
            					"<p><i class='icon icon_ask'></i>" +rows[i].consultContent +"</p>" +
            					"<p><i class='icon icon_answer'></i>" +rows[i].replyContent +"</p>" +
            					"</div>"+
            					"</li>");

            		}
        		}
        		
        	}

        },
        error: function(XMLHttpRequest, textStatus, errorThrown){ 
        }, 
        complete : function () {
        	//最后消除阻塞提示
        	closeShade();
        }
    });
}



//加载所有咨询总数
function selectActivityTotalConsultNum(activityId){
	ShowShade();
	$.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url:  getRootPath_web()+"/activityDetail/selectActivityTotalConsultNum?activityId="+activityId,
        success: function (data) {
        	//console.log(data);
        	var num=data.rows[0].totalConsultNum;
        	$("#totalConsultNum").html("问题（"+num+"）");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){ 
        }, 
        complete : function () {
        	//最后消除阻塞提示	
        	closeShade();
        }
    });
}




Date.prototype.toLocaleString = function() {
	//转换到秒
    //return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds() + "";
    //转换到分
	return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes();
};
//立即报名，跳转报名页面
function signUp()
{
	if(LoginCheck())
	{
		self.location="activity-signup.html?activityId="+activityId; 
	}
}










