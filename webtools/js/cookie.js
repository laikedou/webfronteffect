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
	 //setcookie('username','laike',6)

	 
};

//今天我们来写一个cookie相关存储的一个代码
//展示了如何实现基于cookie的一系列存储api方法，该例子定义了一个cookieStorage函数（被实例化的时候具有构造函数特性），通过将max-age 和path属性传递给该
//构造函数，就会返回一个对象，然后就可以使用localStorage 和sessionStorage 一样的使用该对象，但是需要注意的是，该例子没有实现存储事件，因此，当设置和查询cookieStorage
//的时候，不会实现自动保存和获取对应的值
function cookieStorage(maxage,path){
	console.log(maxage);
	//获取一个存储全部cookie信息的对象 
	var cookie = (function(){
		var cookie = {};//该对象最终会返回
		var all = document.cookie; 
		if(all === '') return cookie;
		var list = all.split(';');
		for (var i=0;i<list.length;i++) {
			 var cookie = list[i];
			 var p = cookie.indexOf('=');
			 var name = cookie.substring(0,p);
			 var value = cookie.substring(p+1);
			 value = decodeURIComponent(value);
			 cookie[name] = value;
		}
		return cookie;
		
	}());
	//将所有的cookie的名字存储到一个数组中
	var keys = [];
	for(var key in cookie) keys.push(key);
	//下面定义的是存储API公共的属性和方法
	//存储的cookie的个数
	this.length = keys.length;
	//返回低n个cookie的名字，如果n越界则返回null
	this.key = function(n){
		if(n<0 || n>=keys.length) return null;
		return keys[n];
	}
	//返回指定名字的cookie 值
	this.getItem = function(name){
		return cookie[name] || null;
	}
	//存储cookie值
	
	this.setItem = function(key,value){
		
		if(!(key in cookie)){
			keys.push(key);
			this.length ++;
		}
		cookie[key] =value;
		//开始设置cookie
		//首先要存储的cookie的值进行编码，同时创建一个‘名字=编码后的值’形式的字符串
		var cookie = key +'='+encodeURIComponent(value);
		//将cookie的属性也加入到该字符串之中
		if(maxage){
			cookie+=';max-age='+maxage;
		}
		if(path){
			cookie +=';path='+path;
		}
		//通过document.cookie属性来设置cookie
		document.cookie = cookie;
	}
	//删除指定的cookie
	this.removeItem = function(key){
		if(!(key in cookie)){
			 return;
		}
		//从内部维护的cookie组删除指定cookie
		delete cookie[key];
		//同时将cookie中的名字也在内部的数组中删除
		for (var i=0;i<keys.length;i++) {
			if(keys[i] === key){
				keys.splice(i,1);
				break;
			}
		}
		this.length --;
		document.cookie = key+'=;max-age=0';
	}
	//删除所有cookie
	this.clear = function(){
		//循环所有cookie名字，并将其删除
		for(var i=0;i<keys.length;i++) document.cookie = keys[i]+'=;max-age=0';
		//重置所有内部状态
		cookies = {};
		keys = [];
		this.length = 0;
	}
}
