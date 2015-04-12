window.onload = function(){
	/*
	cookie 是指Web浏览器存储的少量数据，同时它是与具体的Web页面或者站点相关的cookie最早是设计为被服务器端所用的。从底层来看，作为HTTP协议的一种拓展实现它。cookie数据会自动在Web浏览器和web
	服务器之间传输，因此服务器端脚本就可以读、写存储在客户端的cookie值。本节将介绍客户端的脚本如何通过使用Document对象的cookie
	属性实现对cookie的操作
	1.cookie属性：有效期和作用域
	2.保存cookie（需要使用字符串来进行保存，并且需要使用encodeURIComponent进行编码）
     

	 */
	 function setcookie(name,value,daysToLive){
	 	var cookie = name + '=' + encodeURIComponent(value);
	 	console.log(cookie);
	 	if(typeof daysToLive == 'number'){
	 		cookie += ';max-age='+(daysToLive*60*60*24);
	 	}
	 	document.cookie = cookie;
	 }
	 setcookie('username','laike',6)
};