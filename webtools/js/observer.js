var Observer = (function(slice){
     function bind(event,fn){
     	var events = this.events = this.events || {},
     	parts = event.split(/\s+/),
     	i=0,
     	num=parts.length,
     	part;
     	if(events[event] && events[event].length){return this;}
     	for (; i < num; i++) {
     		events[(part=parts[i])] = events[part] || [];
     		events[part].push(fn);
     	};
     	return this;
     }
     //绑定一次然后立即释放 此方法
     function one(event,fn){
        
     }
     return function(){
         console.log(this);
     }
})([].slice);


var obs = new Observer();