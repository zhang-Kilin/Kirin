define('UILoading',['react','react-dom','jsx.UILoading','UILayer'],function(React,ReactDOM,UILoading,UILayer){
	var $super = UILayer.prototype;
	return UILayer.extend({
		createElement:function(){
			return React.createElement(UILoading, null, this.options.children);
		},
		hide: function() {
			this.timer && clearTimeout(this.timer);
			$super.hide.apply(this,arguments);
			this.trigger('hidden.loading.component');
		},
		show: function(content,duration,callback) {
			if(_.isFunction(content)){
				callback = content;
				duration = 0;
				content = null;
			}
			if(_.isFunction(duration)){
				callback = duration;
				duration = 0;
			}
			_.extend(this.options,{
				children:content
			});
			this.render();
			this.once('hidden.loading.component',callback,this);
			$super.show.call(this);
			if(duration && duration > 0){
				this.timer = setTimeout($.proxy(function(){
					this.hide();
				},this),duration * 1000);
			}
		}
	});
});