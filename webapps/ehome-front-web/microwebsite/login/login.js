/**
 * 
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
   
   /**************************以上是工具方法***************************************/
function LoginCheck(){
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
			    	   
			        }else if("Error"==Code){
			        	return ;
			        }
			        }
			    });
		   

	
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

function microwebsiteAjax(){}