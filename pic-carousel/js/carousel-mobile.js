
(function(win,doc){
	var config ={
		'innerPicWidth':128,

	}
	 //旋转木马代码开始
	 $ = function(selector){
         return document.querySelector(selector);
	 },
	 $$ = function(selector){
	 	return document.querySelectorAll(selector);
	 },
	 transform = function(element,value,key){
        key = key || 'Transform';
        ['Moz','O','Webkit','Ms',''].forEach(function(prefix){
              element.style[prefix + key] = value;
        });
        return element;
	 },
	 htmlPic='',
	 arrayPic = [1, 8, 3, 4, 6, 7, 10, 13, 15],
	 rotate = 360/arrayPic.length;
	 arrayPic.forEach(function(pic){
	 	htmlPic += '<img class="piece" id="piece'+pic+'" src="http://image.zhangxinxu.com/image/study/s/s128/mm'+pic+'.jpg">';
	 });
	 var stage = $('.stage');
	 var container = $('.container');
	 var indexPiece = 0;
	 var transZ = 64 / Math.tan((rotate / 2 / 180) * Math.PI);
	 container.innerHTML = htmlPic;
	 var elePieces = $$('.piece');
     /*
	 container.addEventListener('click', function(event){
	 	transform(this,'rotateY('+(-1*rotate*++indexPiece)+'deg)');
	 })*/ 

     function getIndex(ele){
     	 for (var i = 0; i < elePieces.length; i++) {
     	 	if(elePieces[i].id == ele.id){
                return i;
     		}
     	 };
     }
     for (var i = 0; i <elePieces.length; i++) {
     	/*var bdbox = elePieces[i].getBoundingClientRect();
     	var pic_width = bdbox.right - bdbox.left;
     	var pic_height = bdbox.bottom - bdbox.top;
     	var picradio = pic_width /pic_height;*/
     	elePieces[i].addEventListener('click', function(event){
     	   var _index = getIndex(this);
     	   transform(container,'none');
     	   transform(container,'rotateY('+(-1*rotate*_index)+'deg)');
        });
     };
	 arrayPic.forEach(function(i,j){
	 	transform($('#piece'+i),'rotateY('+(j*rotate)+'deg) translateZ('+(transZ+20)+'px)');
	 	//这里要获取一下图片的高度和大小
	 });
     
     var reseizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize';
     var docEl = doc.documentElement;//html
     resizeFn = function(){
        docEl.style.fontSize = 20 * (docEl.clientWidth/320)+'px';
     }
     win.addEventListener(reseizeEvt,resizeFn,false);
     doc.addEventListener('DOMContentLoaded', resizeFn,false);

})(window,document);