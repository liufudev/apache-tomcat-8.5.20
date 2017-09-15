    var index;var wait=60;
    //弹出一个iframe层
    $('#pop-up').on('click', function () { //点击触发
        index = layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            shadeClose: true, //点击遮罩关闭层
            area: ['90%'],
            content: $('#program')
        });
    });
    $('#pop-up2').on('click', function () { //点击触发
        index = layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            shadeClose: true, //点击遮罩关闭层
            area: ['90%'],
            content: $('#program2')
        });
    });
    // 确定
    $('#login_out').on("click", function () {
    	loginOut();
                layer.close(index);
            }
    );
   // 取消
    $('.cancle').on("click", function () {
                layer.close(index);
            }
    );


$(function(){
		Changeheadurl();
		changeSex();
	});
function SavenickName(){
	var nickName=$('#nickName').val();
	if(!nickName||nickName==''){
		layer.msg('请填入昵称');
		return ;
	}
	var data={nickName:nickName}
	changeUser(data);
}
function changeSex(){
	$('.sextag').click(function(){
		var sex=$(this).attr('_sex');
		 layer.close(index);
		var data={sex:sex};
		changeUser(data);
	});
}
function changeUser(data){
	ShowShade();
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web() + "/personal/ModifyUser",
		beforeSend : function() {

		},
		data : data,
		success : function(resultMap) {
		
			if (resultMap.resultCode == 'Success') {
				layer.msg('修改成功');
			   //	 location.reload() ;
			   	window.location.href = location.href;
			}else{
				layer.msg('修改失败');
			}
	
		},
		error : function() {
			layer.msg('系统繁忙，稍后再试');

		},complete : function () {
			closeShade();
        }
	});
	
}
function changeHead(){
	$("#upload_headurl").click();
	}
	function Changeheadurl(){
		 $("#upload_headurl").change(function(){
		      if($(this).val()==""){
		    	  layer.msg("提示","图片不能为空");
				 return false;
			  }
			  var FileExt = $(this).val().substring($(this).val().lastIndexOf(".") + 1).toLowerCase();
			  if (FileExt != "jpg" && FileExt != "jpeg" && FileExt != "bmp" && FileExt != "png" && FileExt != "gif") {
					$.messager.alert("提示","图片只支持bmp/png/jpeg/jpg/gif格式");
					return false;
			  }
				var options = {   
				        url:getRootPath_web()+'/personal/CheangeMyHeadUrl',
				        type:"post",      
				        dataType:"json",
				        success: function(data)
				        {
				        if('Sueecss'==data.resultCode){
				        	layer.msg("成功");
				        	// location.reload() ;
				        	 	window.location.href = location.href;
				        }else{
				        	  layer.msg(data.resultReason);
				        }
				      
				        	 
				        },error:  function(XMLHttpRequest, textStatus, errorThrown){
						
				    }, complete : function () {
				    	closeShade();
				    }
				    };
				ShowShade();
			 $("#keywordsForm").ajaxSubmit(options);
	   });
	}
	
	function CheckCondition(){
		var mobile= $("#mobile").val()
		if(!mobile){
			layer.msg("请填写手机号码");
			return false;
		}
		if(!validatorMobile(mobile)){
			layer.msg("请填正确的手机号码");
	
			return false;
		}
	
		return  true;
	}
	function validatorMobile(value) {
	    var reg = /^1[3|4|5|7|8|9]\d{9}$/;
	    return reg.test(value);
	}
	
	function changePhone(){
		if(!CheckCondition()){
			return false;
		}
		var password= $('#password').val();
		if(!password){
			layer.msg("请填验证码");
			return false;
		}
		ShowShade();
		 $.ajax({
		        type: "post",
		        dataType: "json",
		        async: false,
		        url:  getRootPath_web()+"/personal/ModifyPhone",
		        beforeSend: function () {
		        	
		          },
		        data:{
		        	identifyingCode:$('#password').val(),
		        	mobile:$('#mobile').val()
		        },
		        success: function (resultMap) {
		        	 if('Success'==resultMap.resultCode){
				        	layer.msg("成功");
				        	// location.reload();
				        	 	window.location.href = location.href;
				        }else{
				        	layer.msg(resultMap.resultReason);
				       
				        }
		       
		        },error:  function(XMLHttpRequest, textStatus, errorThrown){
		        	layer.msg("服务繁忙");
			    }
		        , complete : function () {
			    	closeShade();
			    }
		    });
		
	}
	
	function sendCode(){
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
		        	mobile:$('#mobile').val(),
		        	templet_code:'RE_BIND',
		        	funCode:'RE_BIND'
		        },
		        success: function (resultMap) {
		            time();
		     
		            layer.msg(resultMap.resultReason);
		        	
		 
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
	    	o.text("(" + wait + ")"); 
	        wait--;  
	        setTimeout(function() {  
	            time(o)  
	        },  
	        1000)  
	    }  
	}  