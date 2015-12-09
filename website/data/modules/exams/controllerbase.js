require(['ControllerBase','Application'],function(ControllerBase,App){

	var routes = {
		'index':{
			'url_schema':['index/:type'],
			'controller':'index'
		}
	};
	//
	App.config({
		routes:routes
	});


	var IndexController = ControllerBase.extend({
		//constructor
		initialize:function(){
			//listen to 'execute'
			this.on('execute',function(){
				console.log('execute');
			});
			//listen to 'executed'
			this.on('executed',function(){
				console.log('executed');
			});
		},
		//设置controller名称
		name:'index',
		//复写父类函数
		exec:function(type){

			//TODO something ...

			//根据当前参数动态返回view
			if (type == 'code') {
				//使用code视图渲染
				return this.view('code');
			};
			//使用index视图渲染
			return this.view('index');			
		}
	});

	//跳转该地址，IndexController将使用code视图渲染
	App.navigate('index/code');

	//跳转该地址，IndexController将使用index视图渲染
	App.navigate('index/module');
});