window.onerror=function(err){
	alert(err);
}
    
    window.onload=function(){
    		   //现在页面当中的page个数
	   var _page1 = $("#page1");
	   
	   var _page2 = $("#page2");
	   
	   var _page3 = $("#page3");
	   
	   var _page4 = $("#page4");
	   
       
		  var _timeout1 = setTimeout(function(){
		  	
		  	jQuery('.lk-loading').fadeOut('3000','linear',function(){
	    		_page1.css('z-index',9);
	    		changeAnimationsForPage(_page1,'fadeInDown');
	    	});
		  	
		  },10000)
    	//提示加载完成
    	//BgMusic.playnext();
    	

	    var AppleIpadServe={
	    	BgMusic:null,
	    	istouched:false,
	    	init:function(){
	    		        var _this = this;
	    			    this.BgMusic=new LMusic({
				        musicList : musicList,
				        autoPlay  : true,  //是否自动播放
				        defaultMode : 1,   //默认播放模式，随机
				        offlineMode:true,
				        canvascontainer:'.lk-container-canvas-bg',
				        spectrumtype:0,
				        defaultVolume:1,
				        showlist:false,
				        callback   : function (obj) {  //返回当前播放歌曲信息
				               
				        },
				        callbackinit: function (obj) {  //返回当前播放歌曲信息
				        	    //这个是临时的解决方法
				                //为了支持苹果移动端不能够自动播放音乐的功能那么我们就会添加一个和用户互动操作的解决方案
							    document.body.addEventListener('touchstart',function(){
							    	if(!_this.istouched){
							    		_this.fireEvent('bgmplay',_this);
							    		_this.istouched = true;
							    	}
							    })
				        }
				    });
				    this.on('bgmplay',this.toogleplay);
				    
				    $('.bgm-btn').on('click',function(){
				    	
				    	_this.fireEvent('bgmplay',_this);
				    	
				    });
				    //这里我们要绑定一个事件让乖乖切换背景音乐
		    	    $("#btn-click-for-guaiguai").click(function(){
		    	    	  S.init();
		    	    	  $('.canvas').css('z-index',10);
		    	    	  _this.BgMusic.playnext();
		    	    	  setTimeout(function(){
		    	    	  	$('.canvas').css('z-index',1);
		    	    	  	
		    	    	  	//弹出对话框
		    	    	  	var istohearmusic = confirm("乖乖确定要听么？请调低音量，不然耳朵受不了哈");
		    	    	  	if(istohearmusic){
		    	    	  		console.log('ok');
		    	    	  		_this.BgMusic.play();
		    	    	  	}
		    	    	  },10000);
		    	    });

				    
	    	},
	    	toogleplay:function(_this){
	    		
		    	    var btn_music = $('.bgm-btn')[0];
		    	    var cl = new classList(_this.BgMusic.musicDom.button.ctrl);
		            if(cl.contains('play')){
		               _this.BgMusic.pause();
		               btn_music.className = 'bgm-btn';
		            }else{
		              _this.BgMusic.play();
		              btn_music.className = 'bgm-btn rotate';
		            }
	        }
	    	
	    }
	    
	    WaveSurfer.util.extend(AppleIpadServe, WaveSurfer.Observer);
	    AppleIpadServe.init();
	    
	    
       //执行文本动画动画函数
       function addTxtEffects(classname,txtdataurl,txteffectsurl){
       	
	       	$.get('txt/'+txtdataurl+'.txt',{},function(data){
	       		
				$.get('txteffect/'+txteffectsurl+'.txt',{},function(data2){
					txtOffect.init(classname,data,data2);
					
				})
				
		    },'text');
		    
       }
       //动画操作函数
	   function changeAnimationsForPage(ele,type,callback){
	   	if(callback){
	    	callback.call(this);
	    }
		ele.addClass(type + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	       $(this).removeClass().addClass('lk-container zIndex1');
		   //addTxtEffects("#page1-txt1",'txt1','txt1');
           
	    });
	    
	   }
	   	//动画变化函数
		function changeAnimations(ele,type,isremove){
			            if(!isremove){isremove = false;}
						if(typeof ele === 'string'){
							$(ele).removeClass().addClass(type + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
							  $(this).removeClass();
							  if(isremove){
							  	$(this).fadeOut().remove();
							  }
							});
							return;
						}
						ele.removeClass().addClass(type + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						  $(this).removeClass();
						  if(isremove){
							  	$(this).fadeOut().remove();
							  }
						});
		}
		
		var txtOffect={
			
			isLoop:true,
			lineHeight:30,
			speed:1500,
			classname:'.txt-scroller-container',
			txtData:[],
			
			txtoffect:function(){
			  var index = 0;
			  var _this = this;
			  var container = $(_this.classname);
			  container.html('');
	          var txtInterval = setInterval(function(){
	          	 var pElement=$('<p>');
	          	 pElement.className="bold";
	          	 pElement.html(_this.txtData[index]);
	          	 container.append(pElement);
	          	 changeAnimations(pElement,_this.effectsData[index],false);
	          	 
	          	 ++index;
	
	      	 	 if(index > (_this.txtData.length-1)){
	      	 		clearInterval(txtInterval);
	      	 	 }
	          	
	          },this.speed);
	          
			},
			init:function(classname,data,effects){
				 this.classname = classname;
				
				 this.txtData = [];
			     this.txtData= data.split('\n');
			     this.effectsData= effects.split('\n');
			     this.txtoffect();
			}
		}
	function fixPagesHeight() {
		$('.swiper-slide,.swiper-container').css({
			height: $(window).height(),
		})
	}
	
	$(window).on('resize', function() {
		fixPagesHeight();
	})
	
	fixPagesHeight();
	
	var mySwiper = new Swiper('.swiper-container', {
	
	    direction: 'vertical',
		lazyLoading : true,
		mousewheelControl: false,
		watchSlidesProgress: true,
		onInit: function(swiper) {
			swiper.myactive = 0;
			swiperAnimateCache(swiper); //隐藏动画元素 
	        swiperAnimate(swiper); //初始化完成开始动画
	        var index = swiper.activeIndex+1;
		    addTxtEffects("#page1-txt"+index,'txt'+index,'txt'+index);
		},
		onSlideChangeEnd: function(swiper){ 
		    swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
		    
		},
		onProgress: function(swiper) {
			for (var i = 0; i < swiper.slides.length; i++) {
				var slide = swiper.slides[i];
				var progress = slide.progress;
				var translate, boxShadow;
	
				translate = progress * swiper.height * 0.8;
				scale = 1 - Math.min(Math.abs(progress * 0.2), 1);
				boxShadowOpacity = 0;
	
				slide.style.boxShadow = '0px 0px 10px rgba(0,0,0,' + boxShadowOpacity + ')';
	
				if (i == swiper.myactive) {
					es = slide.style;
					es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,' + (translate) + 'px,0) scale(' + scale + ')';
					es.zIndex=0;
					
	
	
				}else{
					es = slide.style;
					es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform ='';
					es.zIndex=1;
					
					
				}
	
			}
	
		},
	
	
		onTransitionEnd: function(swiper, speed) {
			for (var i = 0; i < swiper.slides.length; i++) {
			//	es = swiper.slides[i].style;
			//	es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = '';
	
			//	swiper.slides[i].style.zIndex = Math.abs(swiper.slides[i].progress);
	
				
			}
	
			swiper.myactive = swiper.activeIndex;
			
	
		},
		onSetTransition: function(swiper, speed) {
	
			for (var i = 0; i < swiper.slides.length; i++) {
				//if (i == swiper.myactive) {
	
					es = swiper.slides[i].style;
					es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';
				//}
			}
	
		},
		onSlideChangeStart: function(swiper){

            var index = swiper.activeIndex+1;
		    //addTxtEffects("#page1-txt"+index,'txt'+index,'txt'+index);
        }
	});
	
	    
    
    };
    
    


    
