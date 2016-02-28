(function($){
	  $.fn.slider=function(opts){
           var _options = $.extend({},$.fn.slider.defaultOpt,opts),
           _timer =null,
           _self = $(this),
           _target =_self.find('.ycd-slider-box'),
           _title = _self.find('.ycd-ks-wt'),
           m = {initX:0,initY:0,startX:0,startY:0,endX:0,canmove:false},
           currentTab=0;
           //切换当前的轮播样式 第一种是tab 第二种是带圆点的轮播
           _self.toggleClass(_options.className,true);//进行强制切换
           //如果设定了maxwidth 和minwidth 那么进行设定
           if(_options.maxWidth) _self.css({maxWidth:_options.maxWidth});
           if(_options.minWidth) _self.css({minWidth:_options.minWidth});
           _title.tap(function(event){
           	  if(event.target == this) return;
           	  toTab($(event.target).index());
           });
           //绑定touchstart touchmove touchend
           _self.on('touchstart',function(event){
             var et = event.touches[0];
             if($(et.target).closest('.ycd-slider-box').length !=0){
               m.canmove = true;
               m.initX = m.startX = et.pageX;
               m.initY = et.pageY;
               clearTimer();
             }
           }).on('touchmove',function(event){
              var et = event.touches[0];
              if(m.canmove && Math.abs(et.pageY - m.initY)/Math.abs(et.pageX - m.initX) <0.6){
                 _target.removeClass('ycd-slider-ks-ts').css('transform','translate3d('+(m.endX += et.pageX - m.startX)+'px,0,0)');
                 m.startX = et.pageX;
                 event.preventDefault();
              }
           }).on('touchend',function(event){
                if(!m.canmove) return;
                _target.toggleClass('ycd-slider-ks-ts');
                _tw = _target.width();
                var _bl = false,_current = Math.abs(m.endX / _tw);
                if(m.endX >0){
                    _current = m.endX = 0;
                	_bl =true;
                }else if(m.endX < -_tw * (_target.children().length-1)){
                	 _current = _target.children().length -1;
                     _bl =true;
                }
                if(!_bl){
                      if(m.endX % _tw !=0){
                             var _str = parseInt((_current+"").split('.')[1][0]);
                             if(event.changedTouches[0].pageX >m.initX){
                             	_current = _str <= 9 ? Math.floor(Math.abs(_current)) : Math.abs(Math.round(m.endX / _tw));
                             }else{
                             	_current = _str >= 1 ? Math.floor(Math.abs(_current)) + 1 : Math.abs(Math.round(m.endX / _tw));
                             }
                      }
                }
                toTab(_current);
                setTimer();
                m.canmove = false;
           })
           //添加时间计数器
           var setTimer = function(){
              if(!_options.tick) return;
              if(_timer){
                  clearTimer();
              }    
              _timer=setInterval(function(){
                  //进行轮播切换 需要切换到下一个所以需要currentTab+1 
                  toTab(currentTab >= _target.children().length-1 ? 0 :currentTab+1);
              },_options.tick);
           }
            var toTitle = function (i) {
                if (_title.length == 0) return;
                _title.children().toggleClass("ycd-ks-t2", false).eq(i).toggleClass("ycd-ks-t2", true);
            }
           //清除时间计数器
           var clearTimer=function (){
           	  clearInterval(_timer);
           	  _timer = null;
           }
           var move = function (i) {
                _target.css("transform", "translate3d(" + (m.endX = i) + "px,0,0)");
            }

            var setIndex = function (i) {
                return i < 0 ? 0 : i >= _target.children().length ? _target.children().length - 1 : i;
            }

           //切换图片效果函数
           var toTab = function (i){
                i = setIndex(i), tw = _target.width();
                move(-tw * i), toTitle(i);
                if (currentTab != i && _options.change) {
                    _options.change(i);
                }
                currentTab = i
           }
           setTimer();
	  }
	  $.fn.slider.defaultOpt={
            className: "yc-slider-wt2" ,
            tick:3000
	  };
})(Zepto);