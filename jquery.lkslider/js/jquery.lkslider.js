//使用严格模式
'use strict'
//兼容nodejs的模块化加载
(function(factory){
   //这里判断是不是nodejs 环境如果是nodejs 环境的话
   if(typeof module === 'object' && typeof module.exports === 'object'){
      factory(require('jquery'));
   }else{
   	//这里是普通的浏览器环境
   	  factory(window.jQuery);
   }
}(function($){
     if(!$){
     	return console.warn('lkslider required jquery!');
     }
}));