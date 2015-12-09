define('ViewContainer',[],function(){
	var ViewContainer = function(){
		//view渲染的形式
		//single:当心的view产生时，旧的view将被立即卸载
		//multi:旧的view将被隐藏起来，直到超过了最大容量
		this.renderType = 'single';
		//最大view的容量，超过了最大容量之后，会按被展示次数的权重顺序移除
		this.max = 20;
		//当前展示的view
		this.current = null;
		//view队列
		this.queue = [];
	};

	_.extend(ViewContainer.prototype,{
		//根据view的实例，如果队列中还有未释放的对象，则直接返回该对象
		//否则创建新的view实例，并存储与队列中
		//@param {string} url 当前url地址，view总是和url想对应
		//@param {constructor} viewClass 当前要创建view的构造函数
		create:function(url,viewClass){
			var setting = this.find(url,viewClass),
				view;
			if (setting) {
				view = setting.view;
			}else{
				view = new viewClass();
				setting = {
					url:url,
					constructor:view.constructor,
					view:view,
					active:0
				};
				this.push(setting);
			}
			return view;
		},
		//view入队，接受统一管理
		push:function(setting){
			this.bindEvents(setting);
			if (this.queue.length >= this.max) {
				//根据点击次数顺序排序
				this.queue.sort(function(item1,item2){
					return item1.active > item2.active ? 1 : -1;
				});
				//销毁第一个view
				this.queue[0].view.destroy();
			};

			this.queue.push(setting);
		},
		bindEvents:function(setting){
			var proxy = (function(self,setting){
				return {
					show:function(){
						self.onshow(setting);
					},
					destroy:function(){
						self.ondestroy(setting);
					}
				};
			})(this,setting);
			setting.view.on('show',proxy.show);
			setting.view.on('destroy',proxy.destroy);
		},
		onshow:function(setting){
			setting.active++;
			if (this.current) {
				if (this.renderType == 'single') {
					//单例模式下，需要将销毁的view移除
					this.current.view.destroy();
				}else{
					this.current.view.hide();
				};
			};
			this.current = setting;
		},
		ondestroy:function(setting){
			if (setting === this.queue[0]) {
				this.queue.shift();
			}else{
				//查找当前销毁对象所在的位置索引，移除当前对象
				var index = _.indexOf(this.queue,setting);
				if (index > 0) {
					this.queue = this.queue.slice(0,index).concat(this.queue.slice(index));
				};
			}
		},
		find:function(url,constructor){
			return _.find(this.queue,function(item){
				return item.url === url && item.constructor === constructor;
			});
		}
	});

	ViewContainer.instance = function(){
		if (this._instance instanceof this) {
			return this._instance;
		};
		return this._instance = new this;
	};
	return ViewContainer;
})