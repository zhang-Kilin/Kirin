require(['History','Application'],function(History,App){
	//获取History对象的实例
	var history = History.instance();

	//入队历史记录
	history.push('index');

	//输出当前History队列的长度
	console.log(history.length());

	//返回上一次请求
	history.go(-1,function(url){
		App.navigate(url);
	});

	//清空历史记录
	history.clear();

});