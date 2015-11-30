/*
	@example
		var IndexController = ControllerBase.extend({
			name:'index',
			exec:function(){
				this.model.set('names',['k','t']);
				return this.view('');
			}
		});
*/
define('ControllerBase',['Url','ViewContainer','Engines','Logger'],function(Url,ViewContainer,Engines,Logger){
	//函数参数匹配正则
	//@example 
	//	function (page,code){}
	//	==> page,code
	var fnParamsRegex = /^\s*function\s*(?:^\(+)*?\(([\s\S]+?)\)/i,
		viewContainer = ViewContainer.instance();
	/*	
		controll基类
		@param {object} context 当前运行的上下文
			For example:
				{
					url:Url,
					router:Router,
					app:Application
				}
	*/
	var ControllerBase = function(context){
		//传递给view的数据模型，可以在exec方法中对该对象赋值
		this.model = new Backbone.Model();

		//监听change事件，即时刷新view
		this.model.on('change',$.proxy(this._render,this));

		//初始化上下文
		this._init(context);

		//记录exec方法的参数列表
		var match = this.exec.toString().match(fnParamsRegex);
		this._executeParamList = match ? match[1].split(',') : [];

		//记录当前controller的名称
		this.name = this.name || '';

		//记录视图的根目录
		// this._viewpath = this.options.viewPath || 'views';

		

		//调用子类的构造函数
		this.initialize.apply(this,arguments);
	};

	//事件支持
	_.extend(ControllerBase.prototype,Backbone.Events);

	//预留给子类的构造函数
	ControllerBase.prototype.initialize = function(){};
	//预留给子类复写的方法
	//当controller被匹配时，将执行该方法进行view的渲染
	//函数可带参，参数名即为url中的参数名称，参数无顺序限定
	//@example 
	//	"index/789?key=k&code=hello"
	//	function(code,key){
	//		//key = 'k'
	//		//code = 'hello'
	//	}
	//@warning 
	//		需要特别说明，如果接收的是url_schema中定义的参数，请严格按照定义顺序接收
	//		For example :
	//			url_schema:"index/:page"
	//			url:"index/789?key=k&code=hello"
	//			function(page,code,key){}
	//
	//@return this.view('')  固定写法
	//	参数为空时，即查找与controller同名的view
	//	否则将根据view函数中指定的名称查找view
	//@example 
	//		this.model.set('names', ['a','b']);
	//		return view('index');
	ControllerBase.prototype.exec = function(){
		
		return this.view('');
	};

	//当前上下文切换
	ControllerBase.prototype._init = function(context){
		//
		this.context = _.extend({},_.result(this,'context'),context);
		//application
		this.App = this.context.app;
		//当前匹配到的路由器
		this.route = this.context.route;
		//全局路由对象
		this.router = this.context.router;

		//Url实例对象，封装了当前请求Url的信息，方便子类使用
		//将在_execute方法中被实例化
		this.url = this.context.url;

		//标记当前请求是否已经被重定向
		this._isredirect = false;

		//
		this._view = null;

		//记录当前controller要渲染的view名称
		this._viewname = null;

		//记录view尚未生成时model的数据变更引发的渲染view操作
		this._needrender = true;

		//标记view是否已经被加载
		this._viewloaded = false;
	},

	//执行controller，渲染view，该方法不允许子类使用
	ControllerBase.prototype._execute = function(context){
		//记录当前controller要渲染的view名称
		this._viewname = null;

		//记录view尚未生成时model的数据变更引发的渲染view操作
		this._needrender = true;

		//标记view是否已经被加载
		this._viewloaded = false;

		this._init(context);

		var params = this.url.param(),
			args = Array.prototype.slice.call(arguments),
			arr,
			view;
			arr = this._executeParamList.slice(args.length);
			arr = _.map(arr,function(item){
				return _.has(params,item) ? params[item] : undefined;
			});
			args = args.concat(arr);

		this.trigger('execute',this.context,this,args);

		view = this.exec.apply(this,args);

		if (this._isredirect) {
			//已经在子类中重定向，无需继续渲染
			return;
		};

		//重定向之后不会触发executed事件
		this.trigger('executed',this.context,this,args);

		if (!view) {
			this.view(this.name);
		};

		//子类exec方法对model赋值，可能触发render，此处加以判断，
		//如果render先于view之前被触发，则延迟到view生成之后执行
		if (this._needrender) {
			this._render();
		};
	};

	//渲染View
	ControllerBase.prototype._render = function(){
		if (this._isredirect) {
			//已经在子类中重定向，无需继续渲染
			return;
		};
		if (!this._view) {
			this._needrender = true;
			return;
		};
		this._needrender = false;
		// this._view.show();
		this._view._render(this.model.attributes);
	};

	/*
		用于重定向，不改变当前的url地址，从第二个参数开始为需要传递给新的controller的参数列表
		@param {string} controllerName 要使用的controller名称
		For example:
			redirect('test',150)
	*/
	ControllerBase.prototype.redirect = function(controllerName){
		if (!controllerName) {
			throw new Error('arguments "controllerName" cannot be null.');
		};
		this._isredirect = true;
		var args = Array.prototype.slice.call(arguments,1);
		args = [controllerName,this.context].concat(args);
		//execute
		ControllerBase.execute.apply(ControllerBase,args);
	};

	/*
		用于重定向，会改变当前的url地址，该函数不接受参数传递
		@param {string} url 当前要重定向的url
	*/
	ControllerBase.prototype.assign = function(url){
		if (!controllerName) {
			throw new Error('arguments "url" cannot be null.');
		};
		this._isredirect = true;
		this.App.navigate(url);
	};

	//不要再子类中重写该方法
	ControllerBase.prototype.view = function(viewname){
		if (this._viewloaded) {
			return this.view;
		};
		this._viewloaded = true;
		this._viewname = viewname || this.name;
		var context = _.extend({},this.context,{controller:this}),
			self = this,
			View = Engines.findView(context,this._viewname,function(e,V){
				if (!self._view && !e) {
					self._view = viewContainer.create(self.url.relativepath,V);
					self._view.show();
					self._render();
				};
			});
		if (View && !this._view) {
			this._view = viewContainer.create(this.url.relativepath,View);
			this._view.show();
		};
		return this._view || true;
	};

	ControllerBase.execute = function(controllerName,context){
		var args = Array.prototype.slice.call(arguments,2);
		Engines.findController(context,controllerName,function(e,Controller){
			if (!e) {
				var controller = new Controller(context);
				controller._execute.apply(controller,args);
			}else{
				Logger.instance().error(e);
			}
		});
	};

	ControllerBase.extend = Backbone.View.extend;
	return ControllerBase;
});