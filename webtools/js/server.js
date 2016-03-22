//nodejs 实现的服务器端代码
var http = require('http');//nodejs http 服务器
//聊天客户端使用的html文件 在下面会用

var clientui =require('fs').readFileSync('comet.html');

var emulation = require('fs').readFileSync('comet.js');

//ServerResponse 对象数组，用于接收发送的事件
var clients = [];
//每20秒发送一条注释到客户端
//这样他们就不会关闭连接再重连
setInterval(function(){
  clients.forEach(function(client){
  	 client.write(':ping?n');
  });
},20000);

//创建一个新的服务器
var server = new http.Server();

server.on('request',function(request,response){
	//解析请求的url
	var url = require('url').parse(request.url);
	//如果请求是发送到'/'，服务器就发送客户端聊天室UI
	if(url.pathname === '/'){//如果请求是发送到 /服务器就发送客户端聊天室UI
       response.writeHead(200,{'Content-Type':'text/html'});
       response.write('<script>'+emulation+'</script>');
       response.write(clientui);
       response.end();
       return;
	}else if(url.pathname !=='/chat'){//如果发送的/chat这之外的地址那么就返回404
         response.writeHead(404);
         response.end();
         return;
	}
	//如果请求类型是post 那么就有一个客户端发送了一条新消息
	if(request.method === 'POST'){
		 console.log('POST');
		 request.setEncoding('utf8');
		 var body ='';
		 request.on('data',function(chunk){body += chunk;});//在获取到数据之后，将其添加到请求的主体中
		 //当请求完成时，发送一个空响应
	    //并将消息传输到所有处于监听状态的客户端中
	    request.on('end',function(){
	    	response.writeHead(200);//响应该请求
	    	response.end();
	    	//将消息转换成文本/事件流格式 
	    	//确保每一行的浅醉都是“data：”
	    	//并以两个换行符结束
	    	message = 'data: '+body.replace('\n','\ndata: ')+'\r\n\r\n';
	    	//发送消息给所有监听的客户端
	    	clients.forEach(function(client){
	    		client.write(message);
	    	});
	    });
	}else{
		//如果不是POST请求则客户端正在请求一组消息
		response.writeHead(200,{'Content-Type':'text/event-stream'});
		response.write('data: Connected\n\n');
		//如果客户端关闭了链接
		//从活动客户端数组中删除对应的响应对象
		response.connection.on('end',function(){
			clients.splice(clients.indexOf(response),1);
			response.end();
		});
		//记下响应对象，这样就可以向它发送未来的消息
		clients.push(response);
	}

	

});

//启动服务器
server.listen(5000);