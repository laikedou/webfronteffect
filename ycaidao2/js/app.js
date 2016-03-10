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
        docEl.style.fontSize = 20 * (docEl.clientWidth/750) +'px';
        $('.ycd-slider-wrap img').height(docEl.clientWidth*(400/750));
        $('.ycd-js-search-icon').css({marginTop:-($('.ycd-js-search-icon').height()/2)});
	};
	win.addEventListener(resizeEvt, onDeviceResize,false);
	doc.addEventListener('DOMContentLoaded', onDeviceResize,false);
	/*var $=function(selector){
          return document.querySelector(selector);
	};
	var $$ = function(selector){
		return document.querySelectorAll(selector);
 	};*/
})(window,document,Zepto);
//数据结构列表

//网站公共js部分
Zepto(function($){
       //是否开启调试模式
       var _debug_mode  = true;
	//百度ip定位地址api ak秘钥
	var baidu_iplocation_ak = 'AEyizCWyHqsgvGbdBp6wShtF';
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

    //基于html5 和百度api进行定位 暂时不使用基于html5 的定位
    function initGeolocation(){
    	if(navigator.geolocation){
    		navigator.geolocation.getCurrentPosition(showPosition,showError);
    	}else{
    		alert('对不起您的浏览器不支持geolocation');
    	}
    }
    function showPosition(){ 
		var lat = position.coords.latitude; //纬度 
		var lag = position.coords.longitude; //经度 
		var location = lat+','+lag;
		var baidu_iplocation_url = "http://api.map.baidu.com/geocoder/v2/?ak="+baidu_iplocation_ak+"&callback=renderReverse&location="+location+"&output=json&pois=0";
		$.ajax({  
	        type: "GET",  
	        dataType: "jsonp",  
	        url: url, 
	        beforeSend: function(){ 
	            $(".ycd-location-txt").html('正在定位...'); 
	            alert('正在定位');
	        }, 
	        success: function (json) {  
	            if(json.status === 0){ 
	                $(".ycd-location-txt").html(json.result.formatted_address); 
	            } 
	        }, 
	        error: function (XMLHttpRequest, textStatus, errorThrown) {  
	            $(".ycd-location-txt").html("定位失败");  
	        } 
       }); 
		
    }
    function showError(error){
            switch(error.code) { 
		        case error.PERMISSION_DENIED: 
		            alert("定位失败,用户拒绝请求地理定位,将自动切换到无锡"); 
		            break; 
		        case error.POSITION_UNAVAILABLE: 
		            //alert("定位失败,位置信息是不可用,将自动切换到无锡");  
		            break; 
		        case error.TIMEOUT: 
		            alert("定位失败,请求获取用户位置超时,将自动切换到无锡"); 
		            break; 
		        case error.UNKNOWN_ERROR: 
		            alert("定位失败,定位系统失效,将自动切换到无锡"); 
		            break; 
		    } 
    }
    //初始化定位
    //initGeolocation();
    //获取窗口滚动条的位置
    function getScrollOffset(win){
    	var w = w ||window;
    	if(w.pageXOffset != null){
           return {
           	x:w.pageXOffset,
           	y:w.pageYOffset
           };
    	}
    }
  function onTopBgColorChange(event){
              var _page_offset = getScrollOffset();
              var _y = _page_offset.y;
              var _top_header_height = $('.ycd-header-search-box-top').height();
              if(_y > _top_header_height){
                 $('.ycd-header-search-box-top').addClass('ycd-top-bg-animation');
              }else if(_y < _top_header_height){
                 $('.ycd-header-search-box-top').removeClass('ycd-top-bg-animation');
              }
    }

    window.addEventListener('scroll',onTopBgColorChange,false);
    //后续函数会新增聚焦到搜索框隐藏顶部搜索栏位 显示搜索页面的效果

   function debugMode(){
      $('.ycd-header-search-box-top').hide();
   }
   if(_debug_mode){
       //debugMode();
   }

  

    
});
