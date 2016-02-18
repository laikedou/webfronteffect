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
	
});