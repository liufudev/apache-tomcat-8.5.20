/**
 * 登录请求
 */

	$(function(){
		Changeheadurl();
		getQueryParam();
	});
   
function getQueryParam(){
	var str = "/asdasf/asfaewf/agaegr/trer/rhh.html";
	var index = str .lastIndexOf("\/"); 
	str  = str .substring(index + 1, str .length);
	var poin=str .lastIndexOf(".");
	str  = str .substring(0, poin);
}
function Login(){

	 $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/microwebsite/login/register",
	        beforeSend: function () {
	        	
	          },
	        data:{
	        	identifyingCode:$('#identifyingCode').val(),
	        	mobile:$('#mobile').val()
	        },
	        success: function (resultMap) {
	            alert(resultMap.resultReason);
	            if('LoginBing'==resultMap.resultCode){
	            	
	            	window.location.href=getRootPath_web()+"/microwebsite/login/callBack";
	            }
	        }
	    });
	
}

function changeHead(){
$("#upload_headurl").click();
}
function Changeheadurl(){
	 $("#upload_headurl").change(function(){
	      if($(this).val()==""){
			alert("提示","图片不能为空");
			 return false;
		  }
		  var FileExt = $(this).val().substring($(this).val().lastIndexOf(".") + 1).toLowerCase();
		  if (FileExt != "jpg" && FileExt != "jpeg" && FileExt != "bmp" && FileExt != "png" && FileExt != "gif") {
				$.messager.alert("提示","图片只支持bmp/png/jpeg/jpg/gif格式");
				return false;
		  }
			var options = {   
			        url:getRootPath_web()+'/microwebsite/personal/CheangeMyHeadUrl',
			        type:"post",      
			        dataType:"json",
			        success: function(data)
			        {
			        if('Sueecss'==data.resultCode){
			        	alert("成功");
			        	 location.reload() ;
			        }
			       
			        	 
			        },error:  function(XMLHttpRequest, textStatus, errorThrown){
					
			    }, complete : function () {
					
			    }
			    };
		 $("#keywordsForm").ajaxSubmit(options);
   });
}
/**
 * 发送验证码
 * @returns
 */
function sendCode(){
	
	 $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/microwebsite/ValidateCode/SendValidateCode",
	        beforeSend: function () {
	        	
	          },
	        data:{
	        	mobile:$('#mobile').val()
	        },
	        success: function (resultMap) {
	            alert(resultMap.resultReason);
	        }
	    });
	
}
/*
 * 
 * 检查是否登录
 */
function LoginCheck(){
	var result=false;
	 $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/microwebsite/login/checklogin",
	        data:{},
	        success: function (resultMap) {
	    		//Success:成功，Error：失败，NoAccess:没有登录
	        	var Code=resultMap.resultCode;
	       if("NoLogin"==Code){
	    	   toLogin(window.location.href);
	    	   result =false;
	        }else if("Error"==Code){
	        	  result =false;
	        }else if("Login"==Code){
	        	result= true;
	        }
	        }
	    });
		return result;


//	 window.location.href

}

function toLogin(redirect_uri){
	if(redirect_uri){
		redirect_uri=encodeURIComponent(redirect_uri);
	}else{
		redirect_uri=encodeURIComponent(window.location.href);
		
	}

	
	window.location.href=getRootPath_web()+"/microwebsite/login/checkBrowser?redirect_uri="+redirect_uri;
	return
}

function loginOut(){
	alert("dasdasd");
	return false;
	window.location.href=getRootPath_web()+"/microwebsite/login/loginOut?";

}
/**
 * 个人中心
 * @returns
 */
function myPersonal(){
	url=getRootPath_web()+'/microwebsite/personal/ShowPersonal';
	window.location.href=url;
}
/**
 * 消息中心
 * @returns
 */
function ShowMessage(){
	url=getRootPath_web()+'/microwebsite/personal/ShowMessage';
	window.location.href=url;
}
/**
 * 评论中心
 * @returns
 */
function ShowComment(){
	url=getRootPath_web()+'/microwebsite/personal/ShowComment';
	window.location.href=url;
}
/**
 * 积分中心
 * @returns
 */
function ShowIntegral(){
	url=getRootPath_web()+'/microwebsite/personal/ShowIntegral';
	window.location.href=url;
}

/**
 * 个人信息
 * @returns
 */
function ShowInformation(){
	url=getRootPath_web()+'/microwebsite/personal/ShowInformation';
	window.location.href=url;
}
/**
 * 收藏中心
 * @returns
 */
function ShowAttention(){
	url=getRootPath_web()+'/microwebsite/personal/ShowAttention';
	window.location.href=url;
}
/**
 * 评论中心
 * @returns
 */
function showInfoComnetlsit(){
	url=getRootPath_web()+'/microwebsite/usercomment/ShowInfoComment?id='+getQueryStr('id');
	window.location.href=url;
}
/**
 * 等级中心
 * @returns
 */
function ShowlevelCenter(){
	url=getRootPath_web()+'/microwebsite/personal/ShowlevelCenter?';
	window.location.href=url;
}


/**
 * 信息详情
 * @returns
 */
function showInfoDetail(){
	url=getRootPath_web()+'/microwebsite/personal/ShowDetail?id=15435c42-3196-4fde-b69f-9e03715fa9c2';
	window.location.href=url;
}
function ShowIntegralDayDetail(){
	url=getRootPath_web()+'/microwebsite/personal/ShowIntegralDayDetail?';
	window.location.href=url;
}


/**
 * 获取当前工程的根目录
 * @returns
 */
function getRootPath_web() {//获取当前工程的根目录
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}





/**
 * 滑动底部的事件
 * @param callback
 * @returns
 */
function getload(callback){
	
	$(window).scroll(function(){
		 var scrollTop = $(this).scrollTop();    //滚动条距离顶部的高度
		 var scrollHeight = $(document).height();   //当前页面的总高度
		 var clientHeight = $(this).height();    //当前可视的页面高度
		 // console.log("top:"+scrollTop+",doc:"+scrollHeight+",client:"+clientHeight);
		 if(scrollTop + clientHeight >= scrollHeight){   //距离顶部+当前高度 >=文档总高度 即代表滑动到底部 count++;         //每次滑动count加1
			 callback();
		 }else if(scrollTop<=0){ 
		 
		 }
		});
}
/**
 * 获取url的参数
 */
var LocString=String(window.document.location.href);    
function getQueryStr(str){   
    var rs = new RegExp("(^|)"+str+"=([^/&]*)(/&|$)","gi").exec(LocString), tmp;   
   
    if(tmp=rs){   
        return tmp[2];   
    }   
   
    // parameter cannot be found   
    return "";   
}   

function formatDate(value) {  
    if (value == null || value == '') {  
        return '';  
    }  
    var dt;  
    if (value instanceof Date) {  
        dt = value;  
    } else {  
        dt = new Date(value);  
    }  
    return dt.format("yyyy-MM-dd hh:mm:ss"); //扩展的Date的format方法(上述插件实现)  
}
Date.prototype.format = function (format) {  
    var o = {  
        "M+": this.getMonth() + 1, // month  
        "d+": this.getDate(), // day  
        "h+": this.getHours(), // hour  
        "m+": this.getMinutes(), // minute  
        "s+": this.getSeconds(), // second  
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter  
        "S": this.getMilliseconds()  
        // millisecond  
    }  
    if (/(y+)/.test(format))  
        format = format.replace(RegExp.$1, (this.getFullYear() + "")  
            .substr(4 - RegExp.$1.length));  
    for (var k in o)  
        if (new RegExp("(" + k + ")").test(format))  
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));  
    return format;  
} 