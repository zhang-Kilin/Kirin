require(['Application'],function(App){
	//应用程序配置
	App.config({
		//路由器配置
		"routes":[
			{
				//路由器名称
				"index":{
					//路由规则
					"url_schema":"index",
					//处理器，
					//string:从Engines中指定的controller目录中搜索文件，并交由其处理
					//function:直接将请求交给该函数处理
					"controller":"index"
				}
			}
		],
		//站点根目录，以/结尾
		"root":"/website/"
	});

	//启动应用程序
	App.start();

	//结束应用程序
	App.stop();

	//跳转本地连接
	App.navigate('index');

	//跳转外部连接
	App.navigate('http://www.baidu.com')

	//返回上次连接
	App.back();
});