/**
 * 
 */

/**
 * 获取当前工程的根目录
 * @returns
 */
function getRootPath_web() {
//为了暂时兼容页面没有引用公共common.html定义全局contextPath的情况
try
{
//alert(contextPath);
   if(contextPath){return contextPath;} 
    return "";
}
catch(err)
{
   //在此处理错误
   //获取当前工程的根目录
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
  
}
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
function formatDate2(value) {  
    if (value == null || value == '') {  
        return '';  
    }  
    var dt;  
    if (value instanceof Date) {  
        dt = value;  
    } else {  
        dt = new Date(value);  
    }  
    return dt.format("MM-dd hh:mm"); //扩展的Date的format方法(上述插件实现)  
}
function formatDate3(value) {  
    if (value == null || value == '') {  
        return '';  
    }  
    var dt;  
    if (value instanceof Date) {  
        dt = value;  
    } else {  
        dt = new Date(value);  
    }  
    return dt.format("yyyy/MM/dd hh:mm"); //扩展的Date的format方法(上述插件实现)  
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
/**
 * 详情页
 * @returns
 */
function toInfoDetail(id){
	setOUrl();
	redirect(getRootPath_web()+"/info/show/"+id)

}
/**
 * 登录成功后回调
 * @returns
 */
function tocallBack(){
	
	window.location.href=getRootPath_web()+"/login/callBack";

}


/**
 * 修改密码
 * @returns
 */
function ModifyPsd(){
	window.location.href=getRootPath_web()+"/personal/toModifyPsd";

}
/**
 * 去微博登录
 * @returns
 */
function toWeiboLogin(){
	
	window.location.href=getRootPath_web()+"/Login/WeiBo/toWeiBoLogin";

}


function toWeiXinOpenLogin(){
	
	window.location.href=getRootPath_web()+"/Login/WeiXinOpen/toWeiXinOpenLogin";

}
/**
 * 重置密码
 * @returns
 */
function toReSetPsd(){
	
	window.location.href=getRootPath_web()+"/login/toReSetPsd";

}
/**
 * 去qq登录
 * @returns
 */
function toQQboLogin(){
	
	window.location.href=getRootPath_web()+"/Login/qq/toQQLogin";

}

/**
 * 主页
 * @returns
 */
function toIndex(){
	redirect(getRootPath_web()+"/index")

}
/**
 * 选择地区
 * @returns
 */
function tochoose(){
	redirect(getRootPath_web()+"/area/choose?url="+window.location.href);
	
}
/**
 * 本日获取积分
 * @returns
 */
function ShowIntegralDayDetail(){

	redirect(getRootPath_web()+'/personal/ShowIntegralDayDetail');

}
/**
 * 退出登录
 * @returns
 */
function loginOut(){
	redirect(getRootPath_web()+"/login/loginOut?");

}
/**
 * 个人中心
 * @returns
 */
function myPersonal(){
//alert(getRootPath_web()+'/personal/ShowPersonal');
	redirect(getRootPath_web()+'/personal/ShowPersonal');
}
/**
 * 消息中心
 * @returns
 */
function ShowMessage(){
	redirect(getRootPath_web()+'/personal/ShowMessage');

}
/**
 * 评论中心
 * @returns
 */
function ShowComment(){
	redirect(getRootPath_web()+'/personal/ShowComment');

}
/**
 * 积分中心
 * @returns
 */
function ShowIntegral(){
	redirect(getRootPath_web()+'/personal/ShowIntegral');

}

/**
 * 个人信息
 * @returns
 */
function ShowInformation(){
	redirect(getRootPath_web()+'/personal/ShowInformation');

}
/**
 * 收藏中心
 * @returns
 */
function ShowAttention(){
	redirect(getRootPath_web()+'/personal/ShowAttention');

}
function ShowAttentionLive(){
	redirect(getRootPath_web()+'/personal/ShowAttention?type=LIVE');

}
/**
 * 评论中心
 * @returns
 */
function showInfoComnetlsit(){
	redirect(getRootPath_web()+'/usercomment/ShowInfoComment?id='+getQueryStr('id'));

}


/**
 * 等级中心
 * @returns
 */
function ShowlevelCenter(){
	redirect(etRootPath_web()+'/personal/ShowlevelCenter');
}

/*
*直播入口
*/
function zhiboList()
{
	window.location.href=getRootPath_web()+"/html/live/zhibo-list.html"; 
}
/*
 *活动入口
 */
function activity()
{
	window.location.href=getRootPath_web()+"/html/activity/activity.html"; 
}
//详情
function toLiveDetail(id){
	setOUrl();
	redirect(getRootPath_web()+"/live/showLive/"+id)

}
function toservice(){
	
	redirect(getRootPath_web()+"/MicroService/toService")

}
/***活动评论*/
function toActiviConmemt(){
	
	redirect(getRootPath_web()+"/activity/activityComment")

}
function toActivityCollection(){
	
	redirect(getRootPath_web()+"/activity/activityCollection")

}
function toOrder(enrollId){
	
	redirect(getRootPath_web()+"/activity/orderActivityView?enrollId="+enrollId)

}

function toOrderCancelFrist(enrollId){
	
	redirect(getRootPath_web()+"/activity/orderActivityCancelFrist?enrollId="+enrollId)

}


function callvback(){
	window.history.back();
}
/**
 * 设置前一页的url
 * @returns
 */
function setOUrl(){

	 $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/common/setOUrl",
	        data:{url:window.location.href},
	        success: function (resultMap) {
	        	
	        }
	  
	    });


}
/**
 * 返回上一页
 * @returns
 */
function goback(){
	//url=getRootPath_web()+'/common/goback';
	//window.location.href=url;
	window.history.back();
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
	        url:  getRootPath_web()+"/login/checklogin",
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
	        },complete : function () {
	        	
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

	
	window.location.href=getRootPath_web()+"/login/checkBrowser?redirect_uri="+redirect_uri;
	return
}
function redirect(url){

	window.location.href=url;
}
var lodindWait
function ShowShade(){
	lodindWait = layer.load(1, {
		  shade: [0.1,'#fff'] //0.1透明度的白色背景
		});
}
function closeShade(){
	layer.close(lodindWait);
}
function getqueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}