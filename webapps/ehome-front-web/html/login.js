$(function(){
	$("#loginTips").hide();
	//显示隐藏密码
	$('i.icon').click(function(){
    var classes=$(this).attr('class'); 
    if(classes.indexOf("iconSee3")>0){
    $(this).removeClass("iconSee3");
    $(this).addClass("iconSee2");
    $(this).prev().attr("type","password");
    }else{
    $(this).removeClass("iconSee2");
    $(this).addClass("iconSee3");
    $(this).prev().attr("type","text");
    }
    })
});
var wait=60;
function CheckCondition(){
	var mobile= $("#mobile").val()
	if(!mobile){
		$("#loginTips").text("请填写手机号码");
		$("#loginTips").show();
		return false;
	}
	if(!validatorMobile(mobile)){
		$("#loginTips").text("请填正确的手机号码");
		$("#loginTips").show();
		return false;
	}
	$("#loginTips").hide();
	return  true;
}
function validatorMobile(value) {
    var reg = /^1[3|4|5|7|8|9]\d{9}$/;
    return reg.test(value);
}
function Login(){
	if(!CheckCondition()){
		return false;
	}
	var password= $('#password').val();
	if(!password){
		$("#loginTips").text("请填密码");
		$("#loginTips").show();
		return false;
	}
	$("#loginTips").hide();
	ShowShade();
	 $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/login/phomePasdLogin",
	        beforeSend: function () {
	        	
	          },
	        data:{
	        	password:$('#password').val(),
	        	mobile:$('#mobile').val()
	        },
	        success: function (resultMap) {
	        	$("#loginTips").text(resultMap.resultReason);
        		$("#loginTips").show();
	            if('LoginBing'==resultMap.resultCode){
	            	tocallBack();
	            }
	        },	error : function() {
	        	layer.msg('加载失败');

			},complete : function () {
				closeShade();
	        }
	    });
	
}

function toRegister(){
	redirect(getRootPath_web()+'/login/toRegister');

}
/*function sendCode(){
	if(!CheckCondition()){
		return false;
	}
	 $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/ValidateCode/SendValidateCode",
	        beforeSend: function () {
	        	
	          },
	        data:{
	        	mobile:$('#mobile').val()
	        },
	        success: function (resultMap) {
	            time();
	        		$("#loginTips").text(resultMap.resultReason);
	        		$("#loginTips").show();
	 
	        }
	    });
	
}
 
function time() {  
var o=$("#sencode");
    if (wait == 0) {
    	o.attr("onclick","sendCode()");

       o.text("获取验证码");  
        wait = 60;  
    } else {  
    	
    	 o.removeAttr("onclick");
    	o.text("重新获取(" + wait + ")"); 
        wait--;  
        setTimeout(function() {  
            time(o)  
        },  
        1000)  
    }  
}  */