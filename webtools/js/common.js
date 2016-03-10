/**
 * [_extends 把p中的可枚举属性复制到O中 ，并且返回o]
 * @AuthorHTL
 * @DateTime  2016-03-01T17:23:20+0800
 * @param     {[object]}                 o [description]
 * @param     {[object]}                 p [description]
 * @return    {[objtect]}                   [description]
 */
function _extends(o,p){
   for (var prop in p) {
   	 o[prop] = p[prop];
   }
   return o;
}
/**
 * [merge 把p中的可枚举属性复制到o中但是o和p中有同名属性的 o中的属性将不受影响]
 * @AuthorHTL
 * @DateTime  2016-03-01T17:33:27+0800
 * @param     {[type]}                 o [description]
 * @param     {[type]}                 p [description]
 * @return    {[type]}                   [description]
 */
function merge(o,p){
	for (var prop in p) {
		if (o.hasOwnProperty(prop)) {
			continue;
		}
		o[prop] = p[prop];
	}
	return o;
}
/**
 * [restrict description]
 * @AuthorHTL
 * @DateTime  2016-03-01T17:38:11+0800
 * @param     {[type]}                 o [description]
 * @param     {[type]}                 p [description]
 * @return    {[type]}                   [description]
 */
function restrict(o,p){
  for(prop in o){
  	 if(!(prop in p)) delete o[prop];
  }
  return o;
}
/**
 * [subtract description]
 * @AuthorHTL
 * @DateTime  2016-03-01T17:39:13+0800
 * @param     {[type]}                 o [description]
 * @param     {[type]}                 p [description]
 * @return    {[type]}                   [description]
 */
function subtract(o,p){
     for(prop in p){
     	delete o[prop];
     }
     return o;
}
/**
 * [union description]
 * @AuthorHTL
 * @DateTime  2016-03-01T17:41:00+0800
 * @param     {[type]}                 o [description]
 * @param     {[type]}                 p [description]
 * @return    {[type]}                   [description]
 */
function union(o,p){
   return _extends(_extends({},o),p);
}
/**
 * [instersection description]
 * @AuthorHTL
 * @DateTime  2016-03-01T17:42:11+0800
 * @param     {[type]}                 o [description]
 * @param     {[type]}                 p [description]
 * @return    {[type]}                   [description]
 */
function instersection(o,p){
    return restrict(_extends({},o),p);
}
/**
 * [keys description]
 * @AuthorHTL
 * @DateTime  2016-03-01T17:43:59+0800
 * @param     {[type]}                 o [description]
 * @return    {[type]}                   [description]
 */
function keys(o){
  //今天暂时写到这里了，这些都是以后的工具函数
}

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