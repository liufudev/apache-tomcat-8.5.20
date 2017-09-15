/**
 * 
 */

function CancelComit() {
	
	var indes1=layer_mobile.open({type: 2});
	var data
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web() + "/activity/orderCancelComitActivityAjax",
		beforeSend : function() {

		},
		data : {
			enrollId:$("#enrollId").val(),
			reason: $("#reason ").val(),
			remark:$('#remark').val()
		},
		success : function(resultMap) {
			if (resultMap.resultCode == 'Success') {
			
		 	layer_mobile.open({
	    	    content: '取消成功'
	    	    ,skin: 'msg'
	    	    ,time: 1 //2秒后自动关闭
	    	  });
		 	//location.reload();
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