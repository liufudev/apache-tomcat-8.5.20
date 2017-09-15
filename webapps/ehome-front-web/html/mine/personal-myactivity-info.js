var index;var wait=60;
$(function(){
	$("#qrcodeCanvas").height($("#qrcodeCanvas").width()*0.5);
	initKey();
	jQuery('#qrcodeCanvas').qrcode({
		    text	: toUtf8($("#enrollId").val()),
		    render: "canvas",
		    width:$("#qrcodeCanvas").width()*0.5, //宽度 
		    height:$("#qrcodeCanvas").height(), //高度 
	});
	

	
	 var ctx=$("#qrcodeCanvas").children()[0];
	var dataURL = ctx.toDataURL("image/png",1.0);
	

   $("#qrcodeCanvas").children().remove();
   $("#qrcodeCanvas").append('<img alt="" id="qrcodeCanvasImg" style="width:50%;height:95%" src="">')
   $("#qrcodeCanvasImg").attr('src',dataURL);
   $("#button_div").children().remove();
	
	if($("#enrollState").val()=='S0A'){//报名成功
		$("#button_div").append('<button id="nextbtn" onclick="cancleenroll()" class="button-act">取消报名</button>');
		
	}else  if($("#enrollState").val()=='S0B'){//取消报名成功
		
		$("#button_div").append('<button id="nextbtn" onclick="cancleenroll()" class="button-act">查看进度</button>');

		
	}else  if($("#enrollState").val()=='S0C'){//取消报名失败
		
		$("#button_div").append('<button id="nextbtn" onclick="cancleenroll()" class="button-act">查看进度</button>');

		
	}else  if($("#enrollState").val()=='S0D'){//待付款
		
		$("#button_div").append('<button id="nextbtn" onclick="toPayorder()" class="button-act2">支付</button><button id="nextbtnCancel" onclick="cancleOrder()" class="button-act3">取消</button>');
		
		
		
	}

   else  if($("#enrollState").val()=='S0E'){//取消申请中
		
		$("#button_div").append('<button id="nextbtn" onclick="cancleenroll()" class="button-act">查看进度</button>');

		
	}else  if($("#enrollState").val()=='S0F'){//已经取消
		
		
		$("#button_div").append('<button id="nextbtn" onclick="callvback()" class="button-act">返回</button>');

		
	}
	else{
		$("#button_div").append('<button id="nextbtn" onclick="cancleenroll()" class="button-act">活动已经过期</button>');

	}
	if($("#outDate").val()=='true'){
		if($("#enrollState").val()=='S0A'||$("#enrollState").val()=='S0D'){
			
			$("#button_div").children().remove();
			$("#button_div").append('<button id="nextbtn" onclick="callvback()" class="button-act4">报名已经结束</button>');

		}
		
	}

});

function toUtf8(str) {    
    var out, i, len, c;    
    out = "";    
    len = str.length;    
    for(i = 0; i < len; i++) {    
        c = str.charCodeAt(i);    
        if ((c >= 0x0001) && (c <= 0x007F)) {    
            out += str.charAt(i);    
        } else if (c > 0x07FF) {    
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));    
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));    
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));    
        } else {    
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));    
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));    
        }    
    }    
    return out;    
} 

function cancleenroll(){
	toOrderCancelFrist($("#enrollId").val());
	
}


function cancleOrder(){

	layer_mobile.open({
		    content: '您确取消本次报名么？'
		    ,btn: ['删除', '取消']
		    ,yes: function(index){
		    	toCancelorderAjax();
		    
		    
		    }
		  });
	
}
function toPayorder(){
	self.location=getRootPath_web()+"/activityPay/initPayPage?enrollId="+$("#enrollId").val();
}

function toCancelorderAjax(){
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web() + "/activity/removeorderActivityAjax",
		beforeSend : function() {

		},
		data : {
			enrollId:$("#enrollId").val(),
			
		},
		success : function(resultMap) {
			if (resultMap.resultCode == 'Success') {
			
				layer_mobile.close(index);
		    	layer_mobile.open({
		    	    content: '取消成功'
		    	    ,skin: 'msg'
		    	    ,time: 1 //2秒后自动关闭
		    	  });
		     // location.reload();
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
			layer_mobile.close(indes1);
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