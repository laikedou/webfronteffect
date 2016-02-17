(function($){
  $.fn.tips=function(options){
       
       var opts = $.extend({}, $.fn.tips.default, options);
       debug('ok');
       
  }
  function debug(info){
     try {
     	// statements
     	if(window.console&&window.console.log){
           console.log(info);
     	}
     } catch(e) {
     	// statements
     	alert(info);
     }
  }
  $.fn.tips.default = {
  	 isshowcolsebtn:true,
  	 canminum:true,
  	 debugmode:true
  };
})(jQuery)