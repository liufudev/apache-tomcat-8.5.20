var payId="";
$(function(){
	
});
function goPay(){
	initWxParam();
}
function initWxParam(){
	ShowShade();
	$.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url:  getRootPath_web()+"/activityPay/prePay?enrollId="+$("#enrollId").val(),
        success: function (data) {
        	if(data.status==200)
    		{
        		var result=data.data;
        		payId=result.payId;
        		toweixinpay(result);
    		}
        	else
    		{
        		layer.msg(data.data);
    		}
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){ 
        	
        }, 
        complete : function () {
        	//最后消除阻塞提示
        	closeShade();
        }
    });
}


function toweixinpay(result) { 
if (typeof WeixinJSBridge == "undefined") {
	if (document.addEventListener) {
		document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	} else if (document.attachEvent) {
		document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
		document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	}
} else {
	onBridgeReady(result);
}
}

function onBridgeReady(result) { 
	alert(result.appId+"11");
	WeixinJSBridge.invoke('getBrandWCPayRequest', {
		"appId" :  result.appId, // 公众号名称，由商户传入
		"timeStamp" :result.timeStamp, // 时间戳，自1970年以来的秒数
		"nonceStr" : result.nonceStr, // 随机串
		"package" : result.package,
		"signType" :"MD5", // 微信签名方式：
		"paySign" :  result.paySign// 微信签名
	},
	function(res) {
		// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回 ok，但并不保证它绝对可靠。
		if (res.err_msg == "get_brand_wcpay_request:ok") {
			self.location=getRootPath_web()+"/activity/orderActivityView?enrollId=" +$("#enrollId").val(); 
		} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
			cancelPay();
		} else if (res.err_msg == "get_brand_wcpay_request:fail") {
		}
	});
}
function cancelPay()
{
	ShowShade();
	$.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url:  getRootPath_web()+"/activityPay/cancelPay?payId="+payId,
        success: function (data) {
        	
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){ 
        	
        }, 
        complete : function () {
        	//最后消除阻塞提示
        	closeShade();
        }
    });
}