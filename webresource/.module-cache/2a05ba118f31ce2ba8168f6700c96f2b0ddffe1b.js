define('UIToast',['react-dom','jsx.UIToast','UILayer'],function(ReactDOM,UIToast,UILayer){
	var $super = UILayer.prototype;
	return UILayer.extend({
		createElement:function(){
			return React.createElement(UIModal, React.__spread({},  this.options), this.options.children);
		},
		hide: function() {
			$super.hide.apply(this,arguments);
			this.trigger('hidden.alert.component');
		},
		show: function(content,title,callback) {
			if(!content){
				return this;
			}
			if(_.isFunction(title)){
				callback = title;
				title = null;
			}
			_.extend(this.options,{
				children:content,
				title:title
			});
			this.render();
			this.once('hidden.alert.component',callback,this);
			$super.show.call(this);
		}
	});
});