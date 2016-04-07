window.onload = function(){
   console.log('the browser is running ....');
   var name = localStorage.username;
   if(!name){
   	name = prompt('what is your name?');
   	localStorage.username = name;
   }
   //否则迭代查询所有存储的name/value对
   for (var name in localStorage) {
   	if (localStorage.hasOwnProperty(name)) {
   		console.log(localStorage[name]);
   	}
   }
   //localstorage默认情况下是存储的是字符串 当存储一个数字的时候，会把它自动转换成一个字符串
   //但是，当获取该值的时候别忘记手动将字符串转换成数字类型
   localStorage.x = 10;
   var x =parseInt(localStorage.x);
   localStorage.lastRead = (new Date()).toUTCString();
   var lastRead = new Date(Date.parse(localStorage.lastRead));
   var data = new Array('http://www.baidu.com/index.php?=a=index','http://ithome.com','http://tmall.com');
   localStorage.data = JSON.stringify(data);
   var data = JSON.parse(localStorage.data);

   //存储有效期和作用域
   //localStorage 和sessionStorage的区别在于存储的有效期和作用域的不同。通过localStorage存储的数据是持久性的，除非Web应用刻意
   //删除存储数据，或者用户通过设置浏览器的配置信息（浏览器提供的UI）来删除，否则数据将一直保留在用户的电脑上永不过期
   //localStorage的作用域是限定在文档员（document origin） 级别，文档源是通过协议、主机名以及端口三者来确定的。因此，下面每个URL都拥有不同的文档源
   //http://www.exaple.com https://www.exaple.com http://static.exaple.com http://www.exaple.com:8080 
   //同源文档间共享同样的localStorage数据（不论该源的脚本是否真正的访问localStorage）。他们可以互相读取对方的数据，甚至可以覆盖对方的数据。但是，非同源
   //的文档间相互都不能读取或者覆盖对方的数据（即使他们运行的脚本是来自同一台第三方服务器也不行）。
   //需要注意的是localStorage 的作用域也受浏览器供应商限制。如果你使用FireFox访问站点，那么下次用另外一个浏览器（比如：chorme）再次访问的时候，那么本次是无法
   //无法获取上次存储的数据的。
   

   //存储API
   //localStorage和sessionStorage 通常被当做普通的JavaScript对象使用；通过设置属性来存储字符串值，查询属性来读取该值 。除此之外，这两个对象还提供了更加正式的
   //API。调用setItem方法，将对应的名字和值传递进去，可以实现数据存储，调用getItem方法，将名字传递进去，可以获取对应的值。调用removeItem方法，将名字传递进去
   //可以删除对应的数据。还可以使用delete操作等
   
   localStorage.setItem('x',1);//以x的名字存储一个数值
   localStorage.getItem('x');//获取数值
   //枚举所有存储的名字/值对
   for (var i = localStorage.length - 1; i >= 0; i--) {//length表示了所有名字/值对的总数
   	var name =localStorage.key(i);//获取第i对的名字
   	var value = localStorage.getItem(name);//获取该值对的值
   }
   localStorage.removeItem('x');//删除'x'项
   localStorage.clear();//删除全部项
   console.log('the script is ending...');
};