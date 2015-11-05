define('UIToast',['react','react-dom','jsx.UIToast','UILayer'],function(React,ReactDOM,UIToast,UILayer){
	var $super = UILayer.prototype;
	return UILayer.extend({
		createElement:function(){
			return React.createElement(UIToast, null, this.options.children);
		},
		hide: function() {
			this.timer && clearTimeout(this.timer);
			$super.hide.apply(this,arguments);
			this.trigger('hidden.alert.component');
		},
		show: function(content,duration,callback) {
			if(!content){
				return this;
			}
			if(_.isFunction(duration)){
				callback = duration;
				duration = null;
			}
			duration = duration || 2;
			
			_.extend(this.options,{
				children:content
			});
			this.render();
			this.once('hidden.toast.component',callback,this);
			$super.show.call(this);
			this.timer = setTimeout($.proxy(function(){
				this.hide();
			},this),duration * 1000);
		}
	});
});