/**
 * 
 */

$(function(){
	
  if($("#enrollState").val()=='S0C'){//取消报名失败
		
		$("#button_div").append('<button id="nextbtn" onclick="cancleenroll()" class="button-act">重新提交申请</button>');

		
	}
	else{
		$("#button_div").append('<button id="nextbtn" onclick="callvback()" class="button-act">返回</button>');

	}
	

});
function cancleenroll(){
	
	redirect(getRootPath_web()+"/activity/orderActivityCancelFrist?enrollId="+$("#enrollId").val()+"&replay=ok")

}