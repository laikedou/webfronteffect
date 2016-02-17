(function($){
  $.fn.tips=function(options){
       
       var opts = $.extend({}, $.fn.tips.default, options);
       var $this = $(this);
       var _header = $this.find('.jq-tips-header');
       var _content = $this.find('.jq-tips-content');
       var _min_btn = $this.find('.jq-tips-mini');
       var _close_btn = $this.find('.jq-tips-close');
       if(opts.bottom){
       	 if(typeof opts.bottom == 'string'){
             $this.css({bottom:opts.bottom});
       	 }else if(typeof opts.bottom == 'number'){
               $this.css({bottom:opts.bottom+'px'});
       	 }
       }
       if(opts.right){
       	 if(typeof opts.right == 'string'){
             $this.css({right:opts.right});
       	 }else if(typeof opts.right == 'number'){
               $this.css({right:opts.right+'px'});
       	 }
       }
       //是否可以拖动
       
       debug($this);
       
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
  	 debugmode:true,
  	 candrag:true
  };
})(jQuery)