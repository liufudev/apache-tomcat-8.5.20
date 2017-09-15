var audioElementHovertree;
function playMusic(){

	$(".icon_qqmusic_switch").click(function(){
		if(audioElementHovertree&&(audioElementHovertree.getAttribute('src')==$(this).parent().children('.qqmusic_thumb').attr('data-autourl'))){
			audioElementHovertree.pause();
			audioElementHovertree=null;
			$('.qqmusic_playing').removeClass('qqmusic_playing');
			return ;
		}else if(audioElementHovertree){
			audioElementHovertree.pause();
			$('.qqmusic_playing').removeClass('qqmusic_playing');
		}
		
		 $(this).parent().parent().parent().parent().parent().addClass('qqmusic_playing');
		audioElementHovertree = document.createElement('audio');
	    
	      audioElementHovertree.setAttribute('src', $(this).parent().children('.qqmusic_thumb').attr('data-autourl'));
		 audioElementHovertree.play();
		
		});

}
$(function (){
	playMusic();
	
});