function getJSONP(url,callback){

   var cbnum ='cb'+getJSONP.counter++;
   var cbname = 'getJSONP.'+cbnum;
   if(url.indexOf('?') === -1)
   url += '?jsonp='+cbname;
   else
   url += '&jsonp='+cbname;
   var script = document.createElement('script');
   getJSONP[cbnum] = function(response){
      try{
         callback(response);
      }
      finally{
         delete getJSONP[cbnum];//删除该函数
         script.parentNode.removeChild(script);//移除script元素
      }
   };
   //立即出发http请求
   script.src = url;//设置脚本url
   document.body.appendChild(script);

}
//当页面全部加载以后
window.onload = function(){
   getJSONP.counter = 0;
   getJSONP('http://api.taobao.com/apitools/ajax_props.do',function(res){
   	alert(res);
   });
};