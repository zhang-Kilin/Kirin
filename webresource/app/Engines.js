/*
	环境配置，该类主要用于多环境下controller和view的加载
*/
define('Engines',['Url','ViewContainer'],function(Url,ViewContainer){
	var queue = [],
		VIEWREGEX = /\{view\}/ig,
		CONTROLLERREGEX = /\{controller\}/ig;

	var Engines = function(){};

	_.extend(Engines.prototype,{
		findView:function(context,viewName,callback){
			var viewLocations = this.buildViewLocations(viewName),
				View;
			//启用了缓存，先尝试同步加载
			if (this.cache) {
				for (var i = 0; i < viewLocations.length; i++) {
					try{
						View = this.syncLoad(viewLocations[i]);
					}catch(e){
						View = null;
					}
					if (View) {
						break;
					};
				};
				if (View) {
					// View = this.createView(context,View);
					if (_.isFunction(callback)) {
						setTimeout(function(){
							callback(null,View);
						},0);
					};
					return View;
				};
			}
			//未启用缓存或同步加载失败，启动异步加载
			if (viewLocations.length > 0) {
				(function r(i,ctx){
					ctx.load(viewLocations[i],function(v){
						// View = ctx.createView(context,v);
						if (_.isFunction(callback)) {
							callback(null,v);
						};
					},function(e){
						if (++i < viewLocations.length) {
							setTimeout(function(){//开启异步循环，防止堆栈溢出
								r(i,ctx);
							},0);
						}else{
							if (_.isFunction(callback)) {								
								callback(e,null);
							};
						}
					});
				})(0,this);
			};
		},
		findController:function(context,controllerName,callback){
			var controllerLocations = this.buildControllerLocations(controllerName),
				Controller;
			//启用了缓存，先尝试同步加载
			if (this.cache) {
				for (var i = 0; i < controllerLocations.length; i++) {
					try{
						Controller = this.syncLoad(controllerLocations[i]);
					}catch(e){
						Controller = null;
					}
					if (Controller) {
						break;
					};
				};
				if (Controller) {
					// Controller = this.createController(context,Controller);
					setTimeout(function(){
						callback(null,Controller);
					},0);
					return Controller;
				};
			}
			//未启用缓存或同步加载失败，启动异步加载
			if (controllerLocations.length > 0) {
				(function r(i,ctx){
					ctx.load(controllerLocations[i],function(v){
						// Controller = ctx.createController(context,v);
						if (_.isFunction(callback)) {
							callback(null,v);
						};
					},function(e){
						if (++i < controllerLocations.length) {
							setTimeout(function(){//开启异步循环，防止堆栈溢出
								r(i,ctx);
							},0);
						}else{
							if (_.isFunction(callback)) {								
								callback(e,null);
							};
						}
					});
				})(0,this);
			};
		},
		load:function(path,callback,errorcallback){
			require([path],callback,errorcallback);
		},
		//同步加载
		syncLoad:function(path){
			return require(path);
		},
		//构造view路径
		buildViewLocations:function(viewName){
			return _.map(this.viewLocationFormats,$.proxy(function(item){
				return this.buildLocation(item,VIEWREGEX,viewName);
			},this));
		},
		//构造controller路径
		buildControllerLocations:function(controllerName){
			return _.map(this.controllerLocationFormats,$.proxy(function(item){
				return this.buildLocation(item,CONTROLLERREGEX,controllerName);
			},this));
		},
		//
		buildLocation:function(format,reg,replacePath){
			if (!format) {
				return format;
			};
			var location = format.replace(reg,replacePath);
			return new Url(location).pathname + (!this.cache ? '?' + new Date().getTime() : '');
		},
		// createController:function(context,Controller){
		// 	return new Controller();
		// },
		// createView:function(context,View){
		// 	return new View();
		// },
		//是否启用缓存
		cache:true,
		//本地视图搜索格式化器
		viewLocationFormats:null,
		//本地controller搜索格式化器
		controllerLocationFormats:null
	});

	//清理掉所有的环境配置
	Engines.clear = function(){
		queue.length = 0;
	};

	//增加环境配置
	//@param {object extend Engines} 
	Engines.add = function(engine){
		queue.push(engine);
	};

	/*
		查找View
		@param {Object} context 当前请求的上下文对象
			For example:
				{
					url:Url,
					controller:Controller,
					router:Router,
					app:Application
				}
		@param {string} viewName 当前要加载的view名称
		@param {function} callback 回调函数，第一个参数为error错误，当加载出错时，该参数包含错误信息，加载成功，该参数为null
			For example: 
				function(err,view){}
	*/
	Engines.findView = function(context,viewName,callback){
		var view,engine;
		if (queue.length == 0) {
			var e = new Error('没有可供加载的环境，请先通过Engines.add配置当前环境');
			if (_.isFunction(callback)) {
				callback(e,null);
				return view;
			}else{
				throw e;
			}
		};
		(function find(i,ctx){
			engine = queue[i];
			view = engine.findView(context,viewName,function(e,v){
				if (e) {
					if (++i < queue.length) {
						setTimeout(function(){//开启异步循环，防止堆栈溢出
							find(i,ctx);
						},0);
					}else{
						if (_.isFunction(callback)) {
							callback(e,v);
						};
					}
				}else{
					if (_.isFunction(callback)) {
						callback(e,v);
					};
				}
			});
		})(0,this);

		return view;
	};

	/*
		查找Controller
		@param {Object} context 当前请求的上下文对象
			For example:
				{
					url:Url,
					router:Router,
					app:Application
				}
		@param {string} controllerName 当前要加载的controller名称
		@param {function} callback 回调函数，第一个参数为error错误，当加载出错时，该参数包含错误信息，加载成功，该参数为null
			For example: 
				function(err,controller){}
	*/
	Engines.findController = function(context,controllerName,callback){
		var controller,engine;
		if (queue.length == 0) {
			var e = new Error('没有可供加载的环境，请先通过Engines.add配置当前环境');
			if (_.isFunction(callback)) {
				callback(e,null);
				return view;
			}else{
				throw e;
			}
		};
		(function find(i,ctx){
			engine = queue[i];
			controller = engine.findController(context,controllerName,function(e,v){
				if (e) {
					if (++i < queue.length) {
						setTimeout(function(){//开启异步循环，防止堆栈溢出
							find(i,ctx);
						},0);
					}else{
						if (_.isFunction(callback)) {
							callback(e,v);
						};
					}
				}else{
					if (_.isFunction(callback)) {
						callback(e,v);
					};
				}
			});
		})(0,this);
		
		return controller;
	};

	Engines.extend = Backbone.View.extend;

	//默认的环境配置
	var DefaultEngine = Engines.extend({
		viewLocationFormats:[
			'views/{view}.js'
		],
		controllerLocationFormats:[
			'controllers/{controller}.js'
		]
	});

	//加载一个默认环境先
	Engines.add(new DefaultEngine());

	return Engines;
});