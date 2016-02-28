(function(win,doc,$){
	var resizeEvt = 'orientationchange' in win ? 'orientationchange' :'resize';
	var docEl = doc.documentElement;
	var onDeviceResize = function(){
         
        docEl.style.fontSize = 20 * (docEl.clientWidth/640) +'px';
         $('.ycd-slider-wrap img').height(docEl.clientWidth*(320/640));
	}
	win.addEventListener(resizeEvt, onDeviceResize,false);
	doc.addEventListener('DOMContentLoaded', onDeviceResize,false);
	/*var $=function(selector){
          return document.querySelector(selector);
	};
	var $$ = function(selector){
		return document.querySelectorAll(selector);
 	};*/
	

})(window,document,Zepto);

//网站公共js部分
Zepto(function($){
	//移动端底部状态切换
	var foot_tabs = $('.ycd-foot-tab');
    foot_tabs.forEach( function(tab, index) {
    	 
    	 var tab_a = $(tab).find('.ycd-foot-tab-a');
    	 var tab_icon = $(tab_a).find('.ycd-foot-icon');
         var data_current = tab_icon.data('current');
         var data_default = tab_icon.data('default');
    	 tab_icon.html(data_default);
    	 if(tab_a.hasClass('ycd-foot-tab-a-cur')){
              tab_icon.html(data_current);
    	 }
    });
    foot_tabs.tap(function(event){
    	    $('.ycd-foot-tab > a').removeClass('ycd-foot-tab-a-cur');
    	    $(this).find('a').addClass('ycd-foot-tab-a-cur');
		    $('.ycd-foot-tab').forEach( function(tab, index) {
		    	 var tab_a = $(tab).find('.ycd-foot-tab-a');
		    	 var tab_icon = $(tab_a).find('.ycd-foot-icon');
		         var data_current = tab_icon.data('current');
		         var data_default = tab_icon.data('default');
		    	 tab_icon.html(data_default);
		    	 if(tab_a.hasClass('ycd-foot-tab-a-cur')){
		              tab_icon.html(data_current);
		    	 }
		    });

    });

    //调用slider组建
    $("#ycd-header-banner").slider({tick: 3000 });
   
});
