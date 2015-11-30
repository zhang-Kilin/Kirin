//该类为系统级别使用，不推荐用户调用
require(['Router'],function(Router){

	//申明路由器集合
	var routes = {
		"index":{
			"url_schema":["index","/",""],
			"controller":"index"
		}
	};

	//实例化路由器
	var app = new Router({
		routes:routes
	});
});