$(function(){
	SwitchTab();
});
function SwitchTab(){
	$("#zhibo").click(function(){
		$("#chatTab").hide();
		$("#introduceTab").show();
	})
	$("#chatOneline").click(function(){
		$("#introduceTab").hide();
		$("#chatTab").show();
	})
}