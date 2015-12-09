define('Application',['Router','History','Logger'],function(Router,History,Logger){

	return {
		//启动应用程序
		start:function(){
			var routes = _.extend({},this.routes);
			if (!_.has(routes,'default')) {
				_.extend(routes,Router.default);
			};

			// //配置默认的router
			// Router.setDefaultRouter(routes);
			
			//日志记录类
			this.logger = Logger.instance();
			//浏览历史记录类
			this.history = History.instance();

			this.app = new Router({
				routes: routes
			});
			//启动app
			Backbone.history.start({
				pushState: false,
				hashChange: true,
				root: this.root
			});
			return this;
		},
		//停止应用程序
		stop:function(){
			Backbone.history.stop();
			this.routes = {};
			return this;
		},
		//设置站点根目录
		root:'/',

		//所有的路由配置
		routes:{},
		//配置应用程序
		config:function(options){
			if (!options) {
				return this;
			};
			var routes = _.extend({},_.result(this,'routes'),options.routes);
			_.extend(this,options);
			_.extend(this.routes,routes);
			return this;
		},
		navigate:function(url){
			if (!url) {
				return this;
			};
			if (/^https?\:\/\//i.test(url)) {
				window.location.assign(url);
			}else{
				this.app.navigate(url,{
					trigger:true,
					// replace:true
				});
			}
			return this;
		},
		back:function(){
			Backbone.history.history.back();
			return this;
		}
	};

});