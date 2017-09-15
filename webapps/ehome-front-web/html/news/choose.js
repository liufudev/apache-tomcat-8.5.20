
    $(document).ready(function () {
    	// $("#inputAreaName").keyup(getAreaName);
    	//  $('#inputAreaName').bind('input',fun).bind('chenge',getAreaName);
    $('#inputAreaName').blur(getAreaName) 
        $(".myli").click(function(){
        	Areaclick(this);
        });
    });
  function cancelsearch(){
	  $("#search_ul").addClass('none');
	  $("#MainBox").removeClass('none');
	  $("#cancel_btn").attr('onclick','toIndex()');
  }
function getAreaName (){
$("#MainBox").addClass('none');
$("#search_ul").removeClass('none');
$("#cancel_btn").attr('onclick','cancelsearch()');
	 $.ajax({
	        type: "post",
	        dataType: "json",
	        async: false,
	        url:  getRootPath_web()+"/area/AreaByName",
	        data:{
	        	areaName:$("#inputAreaName").val()
	        	
	        },
	        success: function (resultMap) {
	        	$('#search_list').children(".myli").remove();
	        if('Success'==resultMap.resultCode){
	        	var list=resultMap.rows;
	        	if(list&&list.length>0){
	        	var lis='';
	        	for(var i=0;i<list.length;i++){parent
	        		lis=lis+ '  <li  class="myli "  _areaId="'+list[i].areaId+'"><span>'+list[i].areaName+'，'+list[i].parent.areaName+'</span></li>'
	        		//lis=lis+' <span style="padding: 1% 3%;" class="myli " _areaId="'+list[i].areaId+'">'+list[i].areaName+'</span>'
	        	}
	        
	        	$('#search_list').append(lis);
	        	$('#search_list').children('.myli').click(function(){
	        		Areaclick(this);
	        	}		
	        	);
	        }	
	        }
	        }
	    });
	
	
}

function Areaclick(area){
	var  areaId=$(area).attr('_areaId');
	window.location.href=getRootPath_web()+"/area/setCurrentArea?areaId="+areaId;
}
