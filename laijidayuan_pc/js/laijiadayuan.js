$(document).ready(function(){
	//使用jquery加载方式
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        parallax: true,
        speed: 600,
        autoplay:6000,
        autoplayDisableOnInteraction: false
    });
    //控制音乐播放
    var btn_music = document.querySelector('.bgm-btn');
    var audio_music = document.querySelector('audio');
    //audio_music.autoplay = true;
    audio_music.loop = true;
    btn_music.addEventListener('click',function(event){
    	
    	//先阻止默认事件
    	event.preventDefault();
    	event.stopPropagation();
    	if(audio_music.paused){
    		audio_music.play();
    		//btn_music.classList.addClass('rotate');
    		btn_music.className = 'bgm-btn rotate';
    	}else{
    		audio_music.pause();
    		//btn_music.classList.removeClass('rotate');
    		btn_music.className = 'bgm-btn';
    	}
    });
    $('.fancybox').fancybox();
});
/**
 * 手机端主js代码部分
 * @AuthorHTL
 * @DateTime  2016-02-29T11:50:08+0800
 * @param     {[type]}                 win [window]
 * @param     {[type]}                 doc [document]
 * @param     {[type]}                 $   [zepto moudle]
 * @return    {[type]}                     [null]
 */
(function(win,doc,$){
	var resizeEvt = 'orientationchange' in win ? 'orientationchange' :'resize';
	var docEl = doc.documentElement;
	var onDeviceResize = function(){
        
        var articles=$('.swiper-slide article');
        $.each(articles, function(index,item) {
        	$(this).css('margin-left','-'+($(this).width()/2)+'px');;
        });
        
	};
	win.addEventListener(resizeEvt, onDeviceResize,false);
	doc.addEventListener('DOMContentLoaded', onDeviceResize,false);
})(window,document,jQuery);