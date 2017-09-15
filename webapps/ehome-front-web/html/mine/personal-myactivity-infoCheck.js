var index;var wait=60;
$(function(){

	$("#button_div").children().remove();
	initKey();
	
	if($("#enrollState").val()=='S0A'){//报名成功
		$("#button_div").append('<button id="nextbtn" onclick="SignOrder()" class="button-act">确认签到</button>');
		$("#imgmark").hide();
	}
	else if($("#enrollState").val()=='SIGN'){//签到成功
		$("#button_div").append('<button id="nextbtn" onclick="myPersonal()" class="button-act">返回</button>');
		$("#imgmark").show();
	}else{
		$("#button_div").append('<button id="nextbtn" onclick="myPersonal()" class="button-act">返回</button>');
	  	layer_mobile.open({
    	    content: '您没有报名成功'
    	    ,skin: 'msg'
    	    ,time: 1 //2秒后自动关闭
    	  });

	}

});



var myindex;
function SignOrder(){

	myindex=layer_mobile.open({
		    content: '您确认签到么？'
		    ,btn: ['签到', '取消']
		    ,yes: function(index){
		    	toSignorderAjax();
		    
		    
		    }
		  });
	
}

function toPayorder(){
	
}

function toSignorderAjax(){
	
	layer_mobile.close(myindex);
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getRootPath_web() + "/activity/orderCheckAjax",
		beforeSend : function() {

		},
		data : {
			enrollId:$("#enrollId").val(),
			
		},
		success : function(resultMap) {
			if (resultMap.resultCode == 'Success') {
			
				
				layer_mobile.open({
				    content: '签到成功'
				    ,skin: 'msg'
				    ,time: 1 //2秒后自动关闭
				  });

	
			 	window.location.href = location.href+'&time='+((new Date()).getTime());
		   
			}else{
				layer_mobile.open({
		    	    content: resultMap.resultReason
		    	    ,skin: 'msg'
		    	    ,time: 1 //2秒后自动关闭
		    	  });
				
			}
		},
		error : function() {
			

		},
		complete : function() {
			layer_mobile.close(myindex);
		}
	});
}

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

