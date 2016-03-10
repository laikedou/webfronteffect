//为了兼容低版本的ie浏览器我们需要这样来写兼容代码
if(window.XMLHttpRequest === undefined){
     window.XMLHttpRequest = function(){
        try{
            return new ActiveObject('Msxml2.XMLHTTP.6.0');
        }catch(error){
            try{
                 return new ActiveObject('Msxml2.HTTP.3.0');
            }catch(error){
                 throw new Error('XMLHttpRequest is not supported!');
            }
        }
     }
}
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
function encodeFormData(data){
  if(!data) return;
  var pairs = [];
  for(var name in data){
    if(!data.hasOwnProperty(name)){ continue;}
    if(typeof data[name] === 'function') continue;
    var value = data[name];
    name = encodeURIComponent(name.replace('%20',"+"));
    value = encodeURIComponent(value.replace('%20','+'));
    pairs.push(name+'='+value);
  }
}

//使用表单编码数据发起一个http post请求
function postData(url,data,callback){
  var request = new XMLHttpRequest();
  request.open('POST',url);
  request.onreadystatechange = function(event){
    event = event || window.event;
    if(request.readyState ===4 && callback){
         callback(request);
    }
  }
  request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  request.send(encodeFormData(data));
}
//使用表单编码数据发起一个get请求
function getData(url,data,callback){
  var request = new XMLHttpRequest();
  request.open("GET",url+"?"+encodeFormData(data));
  request.onreadystatechange = function(){
    if(request.readyState ===4 && callback){
       callback(request);
    }
  }
  request.send(null);

}
//使用json编码的请求发送http post 请求
function postJSON(url,data,callback){
    var request = new XMLHttpRequest();
    request.open("POST",url);
    request.onreadystatechange = function(){
      if(request.readyState === 4 && callback){
         callback(request);
      }
    }
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify(data));
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
  
}
//使用POST方法发送multipart/form-data请求主题
function postFormData(url,data,callback){
  if(typeof FormData === 'undefined') throw new Error('FormData is not implemented!');
  var request = new XMLHttpRequest();
  request.open('POST',url);
  request.onreadystatechange = function(){
     if(request.readyState === 4 && callback){
           return callback(request);
     }
  }
  var formdata = new FormData();
  for(name in formdata){
    if(!formdata.hasOwnProperty(name)) continue;
    if(typeof formdata[name] ==='function') continue;
    formdata.append(name,formdata[name]);
  }
  //在mutipart请求主体中发送名/值对 每队都是请求的一部分 注意当传入FormData 对象时 send()会自动设置Content-Type
  request.send(formdata);
}
//HTTP的进度事件
function checkBrowserIsSupportProgressEvent(){
  if('onprogress' in (new XMLHttpRequest())){
    alert('支持http进度事件！');
  }else{
    alert('对不起您的浏览器不支持http进度事件！请更换谷歌或者火狐浏览器！');
  }
}
whenReady(function(){
  var elts = document.getElementsByTagName('input');
  for (var i = 0; i < elts.length; i++) {
    var input=elts[i];
    if(input.type !=='file') continue;
    var url = input.getAttribute('data-uploadTo');
    if(!url) continue;
    input.addEventListener('change', function(){
      var file = this.files[0];
      if(!file) return;
      var xhr = new  XMLHttpRequest();
      xhr.open('POST',url);
      xhr.send(file);
    },false);
  }
  //postFormData('http://www.baidu.com');
  checkBrowserIsSupportProgressEvent();//检测当前浏览器对http progress事件的支持情况！
});
