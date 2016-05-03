define('Logger',[],function(){

	var Logger = function(){
		//监听并接管error事件
		// window.onerror = $.proxy(function(){
		// 	this.error.apply(this,arguments);
		// 	return true;
		// },this);
	};

	_.extend(Logger.prototype,{
		debug:function(){
			console.debug.apply(console,arguments);
		},
		log:function(){
			console.log.apply(console,arguments);
		},
		error:function(){
			if (arguments[4] instanceof Error) {
				var stack = arguments[4].stack;
				// stack = stack.replace(/\s+at\s+/,' at\n');
				console.info(stack);
			};
			console.error.apply(console,arguments);
		},
		info:function(){
			console.info.apply(console,arguments);
		},
		warning:function(){
			console.warning.apply(console,arguments);
		}
	});

	Logger.instance = function(){
		if (this._instance instanceof this) {
			return this._instance;
		};
		return this._instance = new this();
	};

	return Logger;
})