/**
 * 
 */
var pageNum=1;
var pageSize=5;
var tag=true;
var loadtag=false;
$(function(){
	getload(callback);
	callback();
})
function  callback(){
	if(loadtag){
		$("#listCollection").append('<li><h4>没有更多了</h4></li>');
		loadtag=false;

	}
	if(!tag){
		return ;
	}

	var data=personCollection();
	for(var i=0;i<data.length;i++){
		$("#listCollection").append('<li> <a href="detail.html"> <div class="summary"> <h3>'+data[i].infoTitle+'</h3></div><div class="author"><span>作者：'+data[i].infoReporterName+'</span><span>阅读数：'+data[i].infoReadCount+'</span><span>'+formatDate(data[i].publishTime)+'</span></div></a></li>');

		
	}
}
function personCollection(){
	var data
		 $.ajax({
		        type: "post",
		        dataType: "json",
		        async: false,
		        url:  getRootPath_web()+"/microwebsite/usercollection/PersoncollectionList",
		        beforeSend: function () {
		        	
		          },
		        data:{
		        	type:'MESSAGE'
		        
		        
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
