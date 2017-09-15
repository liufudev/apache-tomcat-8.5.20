/**
 * 
 */
$(function(){
	getload(callback);
	callback();
})
var pageNum=1;
var pageSize=5;
var tag=true;
var loadtag=false;
/**
 * 
 * @returns
 */
function  callback(){
	if(loadtag){
		$("#listcomment").append('<li><h4>没有更多了</h4></li>');
		loadtag=false;

	}
	if(!tag){
		return ;
	}

	var data=getMycomment();
	for(var i=0;i<data.length;i++){
		$("#listcomment").append('<li><div class="pic"><img src="'+data[i].headUrl+'" alt=""/></div> <div class="txt"><h3><span class="shi">'+formatDate(data[i].commentTime)+'</span><span class="dai">'+data[i].commentStatusName+'</span>'+data[i].nickName+'</h3><h4><pre>'+data[i].commentText+'</pre></h4><p class="yuan"><a href="#">原文：'+data[i].articleTitle+'</a> </p></div></li>');
	}
}

function getMycomment(){
	var data
		 $.ajax({
		        type: "post",
		        dataType: "json",
		        async: false,
		        url:  getRootPath_web()+"/microwebsite/usercomment/PersonCommentList",
		        beforeSend: function () {
		        	
		          },
		        data:{
		        	pageNum:pageNum,
		        	pageSize:pageSize
		        },
		        success: function (resultMap) {
		        	if(resultMap.resultCode=='Success'){
		        		if(pageNum*pageSize<resultMap.total){
		        			  pageNum=pageNum+1;
		        			  
		        		}else{
		        			 tag=false;
		        			 loadtag=true;
		        		}
		        	  	  data=resultMap.rows;
		        	 	 
		        	}else {
		        		
		        		alert("亲您的网络不太好")
		        	}
		       
		          
		        }
		    });
	return data;
	}

