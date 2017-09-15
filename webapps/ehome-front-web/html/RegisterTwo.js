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


function Login(){
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
	        url:  getRootPath_web()+"/login/addPsd",
	        beforeSend: function () {
	        	
	          },
	        data:{
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

/*
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
	        	mobile:$('#mobile').val()
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
}  */