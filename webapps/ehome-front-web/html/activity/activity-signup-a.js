var activityId;
$(function(){
	activityId=getqueryString("activityId");
})
function sureSign(){
	var number=0;
	var numberList=$(".ticketNumber");
	for(var a=0;a<numberList.length;a++)
	{
		number+=parseInt($(numberList[a]).val());
	}
	//免费票时，默认每个用户购买票数为1
	if(numberList.length==0)
	{
		number=1;
	}
	validateTicket(number);
}
function getCostData(){
	var array=new Array();
	var costList=$("div .signup");
	for(var i=0;i<costList.length;i++)
	{
		var json={};
		var id=$(costList[i]).attr("id");
		json.costId=id;
		var tempId="#"+id;
		var number=$(tempId).find(".ticketNumber").val();
		var tmpPrice=$(tempId).find("strong").text();
		var price=tmpPrice.substring(1,tmpPrice.length);
		json.number=number;
		json.price=price;
		array.push(json);
	}
	return array;
}
function getFormData(){
	var resultArray=new Array();
	var jsonContact={};
	jsonContact.enrollName="联系人";
	jsonContact.sequence=1;
	jsonContact.enrollValue=$("#contact").val();
	jsonContact.enrollCode="contact";
	resultArray.push(jsonContact);
	var jsonPhone={};
	jsonPhone.enrollName="联系电话";
	jsonPhone.enrollValue=$("#phone").val();
	jsonPhone.sequence=2;
	jsonPhone.enrollCode="phone";
	resultArray.push(jsonPhone);
	var idList=new Array();
	var valueList=new Array();
	var formList=$("#formShow li");
	for(var i=2;i<formList.length;i++)
	{
		idList.push($(formList[i]).attr("type"));
	}
	var formValueList=$(".formValue");
	for(var m=0;m<formValueList.length;m++)
	{
		if($(formValueList[m]).text().length>0)
		{
			valueList.push($(formValueList[m]).text());
		}
		else
		{
			valueList.push($(formValueList[m]).val());
		}
	}
	for(var n=0;n<idList.length;n++)
	{
		 var json={};
		 json.fromlId=idList[n];
		 json.enrollValue=valueList[n];
		 json.sequence=n+3;
		 resultArray.push(json);
	}
	return resultArray;
}
function validateTicket(number){
	ShowShade();
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web()+ "/activitySign/getHaveTicket",
		beforeSend : function() {
		},
		data : {
			activityId :activityId,
			number:number
		},
		success : function(result) {
			var status=result.status;
			if(status==200)
			{
				var costData=getCostData();
				var formData=getFormData();
				saveInfo(costData,formData);
			}
			if(status==300)
			{
				layer.msg('余票不足，您所能购买的最多票数为'+result.data+'张');
			}
			if(status==500)
			{
				layer.msg('活动票数不合法');
			}
				
		},error : function() {
	        	layer.msg('请求失败');
	
		},complete : function () {
			//最后消除阻塞提示	
			closeShade();
	    }
	});

}
function saveInfo(costData,formData){
	ShowShade();
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getRootPath_web()+ "/activitySign/saveEnrollInfo",
		beforeSend : function() {
		},
		data : {
			payDetai:JSON.stringify(costData),
			enrollDetail:JSON.stringify(formData),
			activityId :activityId
		},
		success : function(result) {
			if(result.status==200)
			{
				self.location=getRootPath_web()+result.data; 
			}
			else
			{
				layer.msg(result.data);
			}
		},error : function() {
	        	layer.msg('请求失败');
		},complete : function () {
			//最后消除阻塞提示	
			closeShade();
	    }
	});
}