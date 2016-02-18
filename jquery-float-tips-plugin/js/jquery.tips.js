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
       function getScrollOffsets(w){
       	var w = w || window;
       	if(w.pageXOffset != null){
           return {
           	 x : w.pageXOffset,
           	 y : w.pageYOffset
           }
       	}
       	var d = w.document;
       	if(document.compatMode == 'CSS1Compat'){
       		return {
       			x : d.documentElement.scrollLeft,
       			y : d.documentElement.scrollTop
       		}
       	}

       	return {
       		 x:d.body.scrollLeft,
       		 y:d.body.scrollTop
       	}
       }
       function drag(event){
       	      event = event || window.event;
              var drag = true;
              var elementToDrag = this;
              var scroll = getScrollOffsets();
              var startX  = event.clientX + scroll.x;
              var startY = event.clientY + scroll.y;
              var origX = elementToDrag.offsetLeft;
              var origY = elementToDrag.offsetTop;
              var deltaX = startX - origX;
              var deltaY = startY - origY;
              var drag_header = _header[0];

              if(document.addEventListener){
              	document.addEventListener('mousemove',moveHandler,true);
              	document.addEventListener('mouseup',upHandler,true);
              	drag_header.addEventListener('mouseout',function(e){
                        drag = false;
              	});
              	drag_header.addEventListener('mousedown',function(e){
              		    drag = true;
              	});
              }else if(document.attachEvent){
              	//捕获事件
              	elementToDrag.setCapture();
                elementToDrag.attachEvent('onmousemove',moveHandler);
                elementToDrag.attachEvent('onmouseup',upHandler);
                drag_header.attachEvent('onmouseout',function(e){
                        drag = false;
              	});
              	drag_header.attachEvent('onmousedown',function(e){
              		    drag = true;
              	});
                elementToDrag.attachEvent('onlosecapture',upHandler);
              }
              //阻止冒泡
              if(event.stopPropagation) event.stopPropagation();
              else event.cancelBubble = true;
              //阻止默认事件
              if(event.preventDefault) event.preventDefault();
              else event.returnValue = false;

              function moveHandler(e){
              	if(!drag){
                   return;
              	}
                e = e || window.event;
                var scroll = getScrollOffsets();
                elementToDrag.style.left = (e.clientX + scroll.x - deltaX) + 'px';
                elementToDrag.style.top = (e.clientY + scroll.y - deltaY) + 'px';
                if(event.stopPropagation) event.stopPropagation();
                else event.cancelBubble = true;
              } 

              function upHandler(e){
              	drag = false;
                e = e || window.event;
                if(document.removeEventListener){
                	  document.removeEventListener('mousemove', moveHandler);
                	  document.removeEventListener('mouseup', upHandler);
                }else if(document.detachEvent){
                	  document.detachEvent('onlosecapture',upHandler);
                	  document.detachEvent('onmouseup',upHandler);
                	  document.detachEvent('onmousemove',moveHandler);
                	  elementToDrag.releaseCapture();
                	  if(event.stopPropagation) event.stopPropagation();
                      else event.cancelBubble = true;
                }
              }
       }
       //是否可以拖动
       if(opts.candrag){
           $this.bind('mousedown',drag);
       }
       //绑定关闭和缩小事件
       _close_btn.click(function(e){
           e.preventDefault();
           $this.fadeOut(500);
       });
       _min_btn.click(function(e){
       	   if($(_content).height() == 130){
              _content.stop(true).animate({
                  	'height': '0px'},
                  	500);
       	   }else{
       	   	_content.stop(true).animate({
                  	'height': '130px'},
                  	500);
       	   }
       });
       
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
  	 debugmode:false,
  	 candrag:true
  };
})(jQuery)