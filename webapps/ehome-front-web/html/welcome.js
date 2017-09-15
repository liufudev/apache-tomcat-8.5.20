$(function() {
	var pic=$("#pic").val();
	var oldUrl=$("#oldUrl").val(); 
	//var pic="http://14.215.122.17:8001/IMG/MessageSend/2017/03/17/f08c466c-681f-4ce3-8bba-1364dd8a4933.jpg";
	$(".welcome").css("background","url('"+pic+"') no-repeat");
	$(".welcome").css("background-size","100% 100%");
	$(".welcome").css({position: "absolute",top: "0", bottom: "0", left: "0",right: "0"});
	count(oldUrl);
	$('#count').on('click', function(event) {
		location.href = oldUrl;//'../index';
	});
});
function count(oldUrl) {
	var count = 3;
	var countdown = setInterval(CountDown, 1000);
	function CountDown() {
		count--;
		$("#count").text("跳过 (" + count + "s)");
		if (count == 0) {
			$("#count").hide();
		    location.href = oldUrl;//'../index';
			clearInterval(countdown);
		}
	}
}