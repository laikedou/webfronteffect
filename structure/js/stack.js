//栈的实现
function Stack(){
	this.dataStore = [];//用于储存栈元素的数组
	this.top =0;
	this.push = push;
	this.pop=pop;
	this.peek = peek;
	this.clear = clear;
	this.length = length;
}
function push(element){
	this.dataStore[this.top++] = element; //注意这里的区别 如果是++this.top 的话就不一样了 例子 var i,j;i=j=3; i++(表达式返回值是3,同时i的值4)  ++i(表达式返回值是4,同时i的值4) 
}
function peek(){
	return this.dataStore[this.top-1];//返回顶部的栈元素
}
function pop(){
    return this.dataStore[--this.top];//出栈 返回顶部的栈元素同时让栈元素减少
}
function clear(){
	this.top = 0; //清除栈
}
function length(){
	return this.top; //返回栈元素个数
}

window.onload = function(){
        var s = new Stack();
        s.push('David');
        s.push('Raymond');
        s.push('Bryan');
        console.log('length: '+s.length());
        console.log(s.peek());
        var popped = s.pop();
        console.log('The popped element is :'+popped);
        console.log(s.peek());
        s.push('Cynthia');
        console.log(s.peek);
        s.clear();
        console.log('length: '+s.length());
        console.log(s.peek());
        s.push('Clayton');
        console.log(s.peek());
};