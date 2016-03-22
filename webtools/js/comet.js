function init(){
	var nickname = prompt('请输入您的名字！');
	var input = document.getElementsByClassName('input-in')[0];
	var chat = document.getElementsByClassName('chat-message')[0];
	console.log(chat);
	input.focus();
	//通过EventSource注册最新消息的通知
	var chat = new EventSource('/chat');
	chat.onmessage = function(event){
        var msg = event.data;

        chat.innerHTML += '<li>'+msg+'</li>';
	}
	input.onchange=function(event){
        var msg = nickname +' : ' +input.value;
        var xhr = new XMLHttpRequest();
        xhr.open('POST','/chat');
        xhr.setRequestHeader('Content-Type','text/plain;charset=UTF-8');
        xhr.send(msg);
        input.value = '';
	}
}

window.onload = function(){
   init();
};