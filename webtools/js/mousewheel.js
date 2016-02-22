'use strict'
//自用工具库
var whenReady = (function(){
    var ready = false;
    var funcs = [];//存储函数的数组
    function handler(e){
        if(ready) return;
        if(e.type === 'readystatechange' && document.readyState !== 'commplete'){
            return;
        }
        for(var i=0;i<funcs.length;i++){
              funcs[i].call(document);
        }
        //进行标记
        ready  = true;
        funcs = null;//置空
    }
    if(document.addEventListener){
         document.addEventListener('DOMContentLoaded', handler,false);
         document.addEventListener('readystatechange', handler,false);
         window.addEventListener('load',handler,false);
    }else{
        //兼容IE等不支持addEventListener方法的浏览器
        document.attachEvent('onreadystatechange',handler);
        window.attachEvent('onload',handler);
    }

    return function isReady(f){

        if(ready){
             f.call(document);
        }else{
            funcs.push(f);
        }
    }
}());
//处理鼠标滚轮事件
whenReady(function(){
	 function enclose(content,framewidth,frameheight,contentX,contentY){
        framewidth = Math.max(framewidth,50);
        frameheight = Math.max(frameheight,50);
        contentX = Math.min(contentX,0) || 0;
        contentY = Math.min(contentY,0) || 0;
        var frame = document.createElement('div');
        frame.className = 'enclosure';
        frame.style.width = framewidth +"px";
        frame.style.height = frameheight + 'px';
        frame.style.overflow = 'hidden';
        frame.style.boxSizing = 'border-box';
        frame.style.webkitBoxSizing = 'border-box';
        frame.style.MozBoxSizing = 'border-box';
        content.parentNode.insertBefore(frame,content);
        frame.appendChild(content);
        content.style.position = 'relative';
        content.style.left = contentX + 'px';
        content.style.top = contentY + "px";
        var isMacWebkit = (navigator.userAgent.indexOf('Macintosh') !== -1 && 
            navigator.userAgent.indexOf('Webkit') !==-1);
        var isFirefox = (navigator.userAgent.indexOf('Gecko') !==-1);
        frame.onwheel = wheelHandler;
        frame.onmousewheel = wheelHandler;
        if(isFirefox){
            frame.addEventListener('DOMMouseScroll',wheelHandler,false);
        }
        function wheelHandler(e){
            e = e || window.event;
            var deltaX = e.deltaX*-30||
                         e.wheelDeltaX/4||
                         0;
            var deltaY = e.deltaY*-30||
                         e.wheelDeltaY/4||
                         (e.wheelDeltaY === undefined && e.wheelDelta/4)||
                         e.detail*-10||
                         0;
            if(isMacWebkit){
                deltaX /=30;
                deltaY /=30;
            }
            if(isFirefox && e.type !== 'DOMMouseScroll'){
                frame.removeEventListener('DOMMouseScroll', wheelHandler,false);
            }
            var contentbox = content.getBoundingClientRect();
            var contentwidth = contentbox.right - contentbox.left;
            var contentheight = contentbox.bottom - contentbox.top;
            if(e.altKey){
               if(deltaX){
                   framewidth -=deltaX;
                   framewidth = Math.min(framewidth,contentwidth);
                   frameheight = Math.max(framewidth,50);
                   frame.style.width = framewidth +"px";
               }
               if(deltaY){
                   frameheight -=deltaX;
                   frameheight = Math.min(frameheight,contentheight);
                   frameheight = Math.max(frameheight-deltaY,50);
                   frame.style.height = frameheight +"px";
               }
            }else{
                console.log(deltaX);
              if(deltaX){
                var minoffset = Math.min(framewidth-contentwidth,0);
                contentX = Math.max(contentX+deltaX,minoffset);
                contentX = Math.min(contentX,0);
                content.style.left = contentX +'px';
              }
              if(deltaY){
                var minoffset = Math.min(frameheight-contentheight,0);
                contentY = Math.max(contentY + deltaY,minoffset);
                contentY = Math.min(contentY,0);
                content.style.top = contentY + 'px';
              }
            }
            if(event.preventDefault){
                event.preventDefault();
            }
            if(event.stopPropagation){
                event.stopPropagation();
            }
            e.cancleBubble = true;
            e.returnValue = false;
            return false;


        }


     }
     enclose(document.getElementById('content'),400,200,-200,-300);
});