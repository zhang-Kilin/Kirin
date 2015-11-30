require(['History','Application'],function(History,App){
	//获取History对象的实例
	var history = History.instance();

	//返回上一次请求
	history.go(-1,function(url){
		App.navigate(url);
	});

	//返回下一次请求
	history.go(1,function(url){
		App.navigate(url);
	});	
});