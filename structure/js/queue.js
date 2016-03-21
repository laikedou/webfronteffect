//队列的javascript版本实现

function Queue(){
    this.dataStore = [];
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.front = front;
    this.back = back;
    this.toString = toString;
    this.empty = empty;
}
//加入队列
function enqueue(element){
	this.dataStore.push(element);
}
//出队列
function dequeue(){
	return this.dataStore.shift();
}
//返回队列头元素
function front(){
	return this.dataStore[0];
}
//返回队列尾元素
function back(){
	return this.dataStore[this.dataStore.length -1]
}
//返回队列元素组合的字符串
function toString(){
	var retStr = '';
	for (var i = 0; i < this.dataStore.length; i++) {
		retStr += this.dataStore[i]+'\n';
	}
	return retStr;
}
//判断队列是否为空
function empty(){
	if(this.dataStore.length === 0){
		return true;
	}else{
		return false;
	}
}
window.addEventListener('load', function(){

    //测试队列程序
    var q = new Queue();
    q.enqueue('Meredith');
    q.enqueue('Cynthia');
    q.enqueue('Jennifer');
    console.log(q.toString());
    q.dequeue();
    console.log(q.toString());
    console.log('front of the queue :'+q.front());
    console.log('back of queue: '+q.back());
});