define('ViewBase',['UIHeader','UILoading','Application'],function(UIHeader,UILoading,App){
	var header = new UIHeader(),
		loading = new UILoading();

	var ViewBase = Backbone.View.extend({
		constructor:function(){
			//标记当前view是显示还是隐藏
			this.isShown = false;
			//标记当前view是否已经被销毁
			this.isDestroyed = false;
			//头部
			this.header = header;
			//loading对象
			this.loading = loading;

			this.header.show({
				handles:{
					onback:this.back
				}
			});

			Backbone.View.apply(this,arguments);
		},

		//预留给子类的渲染函数
		//@param {object} model 由controller加工的数据模型
		render:function(model){
			// this.$el.append('Hello world');
		},
		_render:function(model){
			this.model = model;
			if (!this.isDestroyed) {
				this.trigger('render',model);
			};
			this.render.apply(this,arguments);
			this.trigger('rendered',model);
		},
		show:function(){
			if (this.isShown || this.isDestroyed) {
				return this;
			};
			this.trigger('show');
			this.isShown = true;
			this.$el.addClass('view').appendTo('#viewport').show();
			this.trigger('shown');
			return this;
		},
		hide:function(){
			if (!this.isShown || this.isDestroyed) {
				return this;
			};
			this.trigger('hide');
			this.isShown = false;
			this.$el.hide();
			this.trigger('hidden');
			return this;
		},
		destroy:function(){
			if (this.isDestroyed) {
				return this;
			};
			this.trigger('destroy');
			this.isDestroyed = true;
			this.$el.remove();
			this.trigger('destroyed');
			return this;
		},
		setTDK:function(title,description,keywords){
			if (_.isObject(title)) {
				keywords = title.keywords;
				description = title.description;
				title = title.title;
			};
			var $des,des,$key,key,flag=false;
				
			if (title && document.title != title) {
				document.title = title;
				flag = true;
			};
			if (description) {
				$des = $('meta[name="description"]');
				des = $des.attr('content');
				description != des && (flag = true) && $des.attr('content',description);
			};
			if (keywords) {
				$key = $('meta[name="keywords"]');
				key = $key.attr('content');
				key != keywords && (flag = true) && $key.attr('content',keywords);
			};
			if (flag) {
				//ios微信浏览器bug，异步修改title无法正确显示，修正方案
				var $frm = $('<iframe src="/favicon.ico" />');
				$frm.on('load',function(){
					setTimeout(function(){
						$frm.off('load').remove();
					},0);
				}).appendTo(document.body);
			};

			return this;
		},
		navigate:function(url){
			// if (/^https?\:\/\//i.test(url)) {
			// 	return window.location.assign(url);
			// };
			// Backbone.history.navigate(url,{
			// 	replace:true,
			// 	trigger:true
			// });
			App.navigate(url);
			return this;
		},
		back:function(){
			App.back();
			return this;
		}
	});
	return ViewBase;
});