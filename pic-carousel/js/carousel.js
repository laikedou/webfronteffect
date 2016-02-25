
(function(win){
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
	 var elePieces = $$('.piece');
	 var transZ = 64 / Math.tan((rotate / 2 / 180) * Math.PI);
	 console.log(container);
	 container.innerHTML = htmlPic;
	 container.addEventListener('click', function(event){
	 	transform(this,'rotateY('+(-1*rotate*++indexPiece)+'deg)');
	 })
	 arrayPic.forEach(function(i,j){
	 	transform($('#piece'+i),'rotateY('+(j*rotate)+'deg) translateZ('+(transZ+20)+'px)');
	 });

})(window);