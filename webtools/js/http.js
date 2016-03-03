//关于http 函数的封装问题
function getText(url,callback){
	var request = new XMLHttpRequest();
	request.open('GET',url);
	request.onreadystatechange = function(){
		if(request.readyState ===4 && request.status ===200){
           var type = request.getResponseHeader('Content-Type');
           if(type.match(/^text/)){
           	  callback(request.responseText);
           }
		}
	}
	request.send(null);
}
//进行强制同步
function getTextNotAsyn(url){
	var request = new XMLHttpRequest();
	request.open('GET',url,false);
	request.send(null);
	if(request.status !== 200){ throw new Error(request.statusText)}
	var type = request.getResponseHeader('Content-Type');
    if(!type.match(/^text/)){
    	throw new Error('Expected textual response got:'+type);
    }
    return request.responseText;
}
//编写一个可以进行请求同时也能够对返回的内容进行解析
function get(url,callback){
     var rq = new XMLHttpRequest();
     rq.open('GET',url);
     rq.onreadystatechange = function(){
     	 if(rq.readyState === 4 && rq.status ===200){
             var type = rq.getResponseHeader('Content-Type');
             if(type.indexOf('xml') && rq.responseXML){
             	 callback(rq.responseXML);
             }else if(type ==='application/json'){
             	 callback(JSON.parse(rq.responseText));
             }else{
             	 callback(rq.responseText);
             }

     	 }
     }
}

window.onload = function (){
   //这里必须注意一下 
   /*
    由于Chrome不支持本地的异步请求，因此直接通过file://访问文件就会报错！

　　报错信息如下：

　　XMLHttpRequest cannot load file:///C:/Users/Administrator/Desktop/test.txt. Cross origin requests are only supported for protocol schemes: http, data, chrome-extension, https, chrome-extension-resource.

　　Uncaught NetworkError: Failed to execute 'send' on 'XMLHttpRequest': Failed to load 'file:///C:/Users/Administrator/Desktop/test.txt'.

   */
   //console.log(getTextNotAsyn('http://localhost:808/ycaidao/index.html')); 
   console.log(JSON);
}

