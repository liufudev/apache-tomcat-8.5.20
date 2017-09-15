var activityId;
$(function(){
	activityId=getqueryString("activityId");
	getBaseInfo();
})
function getBaseInfo()
{
	ShowShade();
	$.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url:  getRootPath_web()+"/activitySign/getBaseInfo?activityId="+activityId,
        success: function (data) {
        	if(data.status==200)
    		{
        		var isFree=data.data.isFree;
        		console.log(data.data);
        		var isCollect=data.data.isCollect;
        		if(isFree)
    			{
        			initCost();
    			}
        		if(isCollect)
        		{
        			initForm();
        		}
        		if(!isFree&&!isCollect)
    			{
        			sureSign();
    			}
    		}
        	else
    		{
        		layer.msg('系统异常请稍后再试');
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
//初始化报名费用信息
function initCost(){
	ShowShade();
	$.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url:  getRootPath_web()+"/activitySign/getCostList?activityId="+activityId,
        success: function (data) {
        	$("#fee").show();
        	for(var i=0;i<data.length;i++)
    		{
        		$("#fee").append('<div class="signup" id="'+data[i].activityCostId+'">\
                        <p>\
                        <strong>¥'+data[i].costNumber/100+'</strong>\
                        <span class="cor_888">|</span>\
                        <span>'+data[i].costName+'</span>\
                    </p>\
                    <p class="relative">\
                    <span class="choice-number">\
                    <em onclick="reduce(this)">-</em>\
                    <input class="ticketNumber" value="1" readonly="readonly">\
                    <em onclick="increase(this)">+</em>\
                    </span>\
                        <span>购买数量</span>\
                    </p>\
                    <p>\
                        <span>费用说明： </span>\
                        <span>'+data[i].costDescribe+'</span>\
                    </p>\
                </div>');
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
//初始化报名表单信息
function initForm(){
	ShowShade();
	$.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url:  getRootPath_web()+"/activitySign/getFormVOList?activityId="+activityId,
        success: function (data) {
        	$("#form").show();
        	formShow(data);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){ 
        	
        }, 
        complete : function () {
        	//最后消除阻塞提示
        	closeShade();
        }
    });
}
function formShow(data){
	for(var i=0;i<data.length;i++)
	{
		console.log(data[i].code);
		var type=data[i].formType;
		var code=data[i].code;
		var isRequire=data[i].isRequire;
		var isRequireShow="";
		if(isRequire=='1')
		{
			 isRequireShow='<span class="cor_red">*</span>'
		}
		else
		{
			 isRequireShow='';
		}
		if(type=='1'){
			if(code=='certificates_l')
			{
				$("#formShow").append('<li type="'+data[i].formId+'">\
	                    <span class="name">'+isRequireShow+''+data[i].name+'</span>\
	                    <div class="form-txt fr"   name='+data[i].formId+' onclick="singleOpt(this)">\
	                        <p class="formValue">身份证</p>\
	                    </div>\
	                </li>\
	                <li type="'+data[i].formId+'">\
                        <span class="name">'+isRequireShow+'证件号码</span>\
                        <div class="form-txt fr">\
                            <input type="text" name="" id="contact"  class="formValue" value="" placeholder="请输入证件号码">\
                        </div>\
                    </li>');
				$("#popShow").append('<div class="window none" id="'+data[i].formId+'">\
					    <div class="winCon winCon2" id="'+data[i].code+'">\
						    <p>身份证</p>\
						    <p>护照</p>\
						    <p>军官证</p>\
					    	<p>回乡证</p>\
					    	<p>台胞证</p>\
					    </div>\
				    <div class="winBtn">\
				        <button class="w_one confirmBtn sure">确定</button>\
				    </div>\
				</div>');
			}
			else if(code=='marriage_l')
			{
				$("#formShow").append('<li type="'+data[i].formId+'">\
						<span class="name">'+isRequireShow+''+data[i].name+'</span>\
						<div class="form-txt fr"   name='+data[i].formId+' onclick="singleOpt(this)">\
						<p class="formValue">未婚</p>\
						</div>\
				</li>');
				$("#popShow").append('<div class="window none" id="'+data[i].formId+'">\
						<div class="winCon winCon2" id="'+data[i].code+'">\
						<p>未婚</p>\
						<p>已婚</p>\
						</div>\
						<div class="winBtn">\
						<button class="w_one confirmBtn sure">确定</button>\
						</div>\
				</div>');
			}
			else if(code=='gender_l')
			{
				$("#formShow").append('<li type="'+data[i].formId+'">\
						<span class="name">'+isRequireShow+''+data[i].name+'</span>\
						<div class="form-txt fr"   name='+data[i].formId+' onclick="singleOpt(this)">\
						<p class="formValue">男</p>\
						</div>\
				</li>');
				$("#popShow").append('<div class="window none" id="'+data[i].formId+'">\
						<div class="winCon winCon2" id="'+data[i].code+'">\
						<p>男</p>\
						<p>女</p>\
						</div>\
						<div class="winBtn">\
						<button class="w_one confirmBtn sure">确定</button>\
						</div>\
				</div>');
			}
			else if(code=='education_l')
			{
				$("#formShow").append('<li type="'+data[i].formId+'">\
						<span class="name">'+isRequireShow+''+data[i].name+'</span>\
						<div class="form-txt fr"   name='+data[i].formId+' onclick="singleOpt(this)">\
						<p class="formValue">大专</p>\
						</div>\
				</li>');
				$("#popShow").append('<div class="window none" id="'+data[i].formId+'">\
						<div class="winCon winCon2" id="'+data[i].code+'">\
						<p>小学</p>\
						<p>初中</p>\
						<p>高中</p>\
						<p>大专</p>\
						<p>本科</p>\
						<p>研究生及以上</p>\
						</div>\
						<div class="winBtn">\
						<button class="w_one confirmBtn sure">确定</button>\
						</div>\
				</div>');
			}
			else
			{
				$("#formShow").append('<li type="'+data[i].formId+'">\
                        <span class="name">'+isRequireShow+''+data[i].name+'</span>\
                        <div class="form-txt fr">\
                            <input type="text" name="" class="formValue" value="" placeholder="'+data[i].placeholder+'">\
                        </div>\
                    </li>');
			}
		}
		if(type=='2'){
			$("#formShow").append('<li type="'+data[i].formId+'" class="question" id="'+data[i].formId+'">\
                    <span>'+isRequireShow+''+data[i].name+'</span>\
                    <textarea class="formValue"></textarea>\
                </li>');
		}
		if(type=='3'){
			var opt=data[i].option;
			$("#formShow").append('<li type="'+data[i].formId+'">\
                    <span class="name">'+isRequireShow+''+data[i].name+'</span>\
                    <div class="form-txt fr"   name='+data[i].formId+' onclick="singleOpt(this)">\
                        <p class="formValue">'+opt[0].optContent+'</p>\
                    </div>\
                </li>');
			$("#popShow").append('<div class="window none" id="'+data[i].formId+'">\
				    <div class="winCon winCon2" id="'+data[i].code+'">\
			    </div>\
			    <div class="winBtn">\
			        <button class="w_one confirmBtn sure">确定</button>\
			    </div>\
			</div>');
			var tmpId="#"+data[i].code;
			for(var m=0;m<opt.length;m++)
			{
				$(tmpId).append('<p>'+opt[m].optContent+'</p>')
			}
			
		}
		if(type=='4'){
			var opt=data[i].option;
			$("#formShow").append('<li type="'+data[i].formId+'">\
                    <span class="name">'+isRequireShow+''+data[i].name+'</span>\
                    <div class="form-txt fr" name='+data[i].formId+' onclick="mutilOpt(this)">\
                        <p class="formValue">'+opt[0].optContent+'</p>\
                    </div>\
                </li>');
			$("#popShow").append('<div class="window none" id="'+data[i].formId+'">\
				    <div class="winCon winCon2 winCon3" id="'+data[i].code+'" style="overflow: auto;">\
			    </div>\
			    <div class="winBtn">\
			        <button class="w_one sure confirmBtn">确定</button>\
			    </div>\
			</div>');
			var tmpId="#"+data[i].code;
			for(var k=0;k<opt.length;k++)
			{
				$(tmpId).append('<p>\
			            <em class="check-basic checkboxFive">\
		                <input type="checkbox" value="'+k+'" id="checkboxFiveInput'+k+'" name="'+k+'"/>\
		                <label for="checkboxFiveInput'+k+'"></label>\
		            </em>'+opt[k].optContent+'\
		        </p>')
			}
		}
		if(type=='5'){
			$("#formShow").append('<li id="'+data[i].formId+'" type="'+data[i].formId+'">\
                    <span class="name">'+isRequireShow+''+data[i].name+'</span>\
                    <div class="form-txt fr">\
                        <input type="text" name="" class="formValue" value="" placeholder="'+data[i].placeholder+'">\
                    </div>\
                </li>')
		}
	}
}
function reduce(o)
{
	var number=$(o).next().val();
	if(number>0)
	{
		$(o).next().val(parseInt(number)-1);
	}
}
function increase(o)
{
	var number=$(o).prev().val();
	$(o).prev().val(parseInt(number)+1);
}





var index;
	function singleOpt(o){
		var id=$(o).attr("name");
		var tempId="#"+id;
		var txt="";
	       index = layer.open({
	            type: 1,
	            title: false,
	            closeBtn: 0,
	            shadeClose: true, //点击遮罩关闭层
	            area: ['90%'],
	            content: $(tempId)
	        });
	    var tempIdP="#"+id+" p";
	    $(tempIdP).click(function(){
	        	$(this).addClass("active").siblings().removeClass("active");
	        	txt=$(this).text();
	        })
	    var tempIdSure="#"+id+" .sure";
        $(tempIdSure).click(function(){
        	if(txt)
        	$(o).children("p").text(txt);
        	layer.close(index);
        })
	}
	
	function mutilOpt(o){
		var id=$(o).attr("name");
		var tempId="#"+id;
        index = layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        shadeClose: true, //点击遮罩关闭层
        area: ['90%'],
        content: $(tempId)
        });
        var tempIdSure="#"+id+" .sure";
        $(tempIdSure).click(function(){
        	var txt="";
        	 var tempIdImput="#"+id+" input";
        	 var inputList=$(tempIdImput);
        	 for(var a=0;a<inputList.length;a++)
    		 {
        		 if($(inputList[a]).prop("checked"))
        			 {
        			 txt+=$(inputList[a]).parents("p").text().trim()+"、";
        			 }
    		 }
    		 
        	if(txt)
        		$(o).children("p").text(txt);
        	layer.close(index);
        })
	}
