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
function resetPsd(){
	if(!CheckCondition()){
		return false;
	}
	var randoncode= $('#randoncode').val();
	if(!randoncode){
		$("#loginTips").text("请填验证码");
		$("#loginTips").show();
		return false;
	}
	var password= $("#password").val()
	var repassword= $("#repassword").val()
	if(checkPass(password)<2){
		$("#loginTips").text("密码复杂度不够，请重新设置！密码只能输入6-20位数，必须是数字+字母+特殊字符，至少满足两种");
		$("#loginTips").show();
         return false ;
	}
	if(password!=repassword){
		$("#loginTips").text("两次输入的密码不一样");
		$("#loginTips").show();
         return false ;
	}
	$("#loginTips").hide();
	ShowShade();
	 $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/login/reSetPsd",
	        beforeSend: function () {
	        	
	          },
	        data:{
	        	randoncode:$('#randoncode').val(),
	        	mobile:$('#mobile').val(),
	         	password:$('#password').val(),
	        	repassword:$('#repassword').val()
	        },
	        success: function (resultMap) {
	        	$("#loginTips").text(resultMap.resultReason);
        		$("#loginTips").show();
        		layer.msg(resultMap.resultReason);
	            if('Success'==resultMap.resultCode){
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
function sendCode(){
	if(!CheckCondition()){
		return false;
	}	ShowShade();
	 $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/ValidateCode/SendValidateCode",
	        beforeSend: function () {
	        	
	          },
	        data:{
	        	mobile:$('#mobile').val(),
	        	templet_code:'FORGET_PWD',
	        	funCode:'FORGET_PWD'
	        },
	        success: function (resultMap) {
	                time();
	                layer.msg(resultMap.resultReason);
	        		$("#loginTips").text(resultMap.resultReason);
	        		$("#loginTips").show();
	 
	        },error : function() {
				layer.msg('加载失败');
				
			},complete : function () {
				closeShade();
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
    	o.text("获取(" + wait + ")"); 
        wait--;  
        setTimeout(function() {  
            time(o)  
        },  
        1000)  
    }  
}  
function checkPass(s){
	  if(s.length < 6){
	            return 0;
	  }
	 var ls = 0;
	 if(s.match(/([a-z])+/)||s.match(/([A-Z])+/)){
	     ls++;
	  }
	 if(s.match(/([0-9])+/)){
	       ls++; 
	 }
	  if(s.match(/[^a-zA-Z0-9]+/)){
	        ls++;
	    }
	        return ls
	 }
