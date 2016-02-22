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
	 // var clock = document.getElementById('clock');
  //    //用于可以拖动的img标签
  //    var img = new Image();
  //    img.src = 'images/clock.png';
  //    function displayTime(){
  //     var now = new Date();
  //     var hrs = now.getHours();
  //     if(hrs <10) hrs = '0'+hrs;
  //     var mins = now.getMinutes();
  //     if(mins < 10) mins = '0' +mins;
  //     var seconds = now.getSeconds();
  //     if(seconds<10){seconds = '0'+seconds}
  //     clock.innerHTML = hrs + ' : ' +mins+" : "+seconds;
  //    }
  //    displayTime();
  //    setInterval(displayTime,1000);
  //    //设置可以拖动
  //    clock.draggable = true;
  //    clock.dragstart  = function(event){
  //       event = event || window.event;
  //       var dt = event.dataTransfer;
  //       dt.setData('Text',Date()+'\n');
  //       if(dt.setDragImage){ 
  //         dt.setDragImage(img,0,0);
  //       }
  //    }

    //下面的代码是实现拖放目标和拖放源的列表
    //查找所有ul的元素
    var lists = document.getElementsByTagName('ul');
    var regexp = /\bdnd\b/;
    for (var i = 0; i < lists.length; i++) {
        if(regexp.test(lists[i].className) ) dnd(lists[i]);
    };
    
    //为样式名称是dnd的列表添加拖动事件
    function dnd(list){
        //console.log(list);
        var original_class = list.className;
        var entered = 0;
        list.ondragenter = function(e){
            e = e || window.event;
            var from = e.relatedTarget;
            entered ++;
            if(from && !ischild(from,list) || entered ===1){
                var dt = e.dataTransfer;
                var types = dt.types;
                if(!types ||//ie
                    (types.contains && types.contains('text/plain'))||//html5
                    (types.indexOf && types.indexOf('text/plain') !== -1)//webkit
                  ){
                    list.className = original_class +' droppable';
                    return false;
                }
                return;
            }
            return false;
        }
        list.ondragover = function(e){
            e = e || window.event;
            return false;
        }
        list.ondragleave = function(e){
            e = e || window.event;
            var to = e.relatedTarget;
            entered--;
            if(to && !ischild(to,list) || entered <=0){
                list.className = original_class;
                entered = 0;
            }
            return false;
        }
        list.ondrop = function(e){
            e = e || window.event;
            var dt = e.dataTransfer;
            var text = dt.getData('Text');
            if(text){
                var item = document.createElement('li');
                item.draggable = true;
                item.appendChild(document.createTextNode(text));
                list.appendChild(item);
                list.className = original_class;
                entered = 0;
                return false;
            }
        }
        var items = list.getElementsByTagName('li');
        for (var i = 0; i < items.length; i++) {
            items[i].draggable = true;
        };
        list.ondragstart = function(e){
            e = e || window.event;
            var target = e.target || e.srcElement;
            if(target.tagName !=='LI') return false;
            var dt = e.dataTransfer;
            dt.setData('Text',target.innerText||target.textContent);
            dt.effectAllowed = 'copyMove';
        }
        list.ondragend = function(e){
            e = e || window.event;
            var target = e.target ||e.srcElement;
            if(e.dataTransfer.dropEffect === 'move'){
                target.parentNode.removeChild(target);
            }
        }

    }
    //如果a是b的子元素
    function ischild(a,b){
       for(;a;a=a.parentNode) if(a === b) return true;
        return false;
    }

});