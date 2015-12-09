require(['Engines'],function(Engines){

	//自定义环境配置，该类实现了根据调试参数，是否启用源码加载功能
	var CustomEngine = Engines.extend({
		viewLocationFormats_forRelease:[
			'dest/views/{view}.js'
		],
		controllerLocationFormats_forRelease:[
			'dest/controllers/{controller}.js'
		],
		viewLocationFormats_forDebug:[
			'views/{view}.js'
		],
		controllerLocationFormats_forDebug:[
			'controllers/{controller}.js'
		],
		//重写父类方法，实现自定义查找view
		findView:function(context,viewName,callback){
			var debug = context.url.param('debug');
			//开启缓存模式
			this.cache = true;
			if (debug) {
				//debug模式关闭缓存
				this.cache = false;
				//设置当前View查找的路径
				this.viewLocationFormats = this.viewLocationFormats_forDebug;
			}else{
				//设置当前View查找的路径
				this.viewLocationFormats = this.viewLocationFormats_forRelease;
			}
			return CustomEngine.__super__.findView.apply(this,arguments);
		},
		findController:function(context,controllerName,callback){
			var debug = context.url.param('debug');
			//开启缓存模式
			this.cache = true;
			if (debug) {
				//debug模式关闭缓存
				this.cache = false;
				//设置当前Controller查找的路径
				this.controllerLocationFormats = this.controllerLocationFormats_forDebug;
			}else{
				//设置当前Controller查找的路径
				this.controllerLocationFormats = this.controllerLocationFormats_forRelease;
			}

			return CustomEngine.__super__.findController.apply(this,arguments);
		}
	});

	//清空所有的环境配置
	Engines.clear();

	//将自定义的环境配置加入当前环境中
	Engines.add(new CustomEngine());

});