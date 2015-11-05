define('UIAlert', ['react', 'react-dom', 'UILayer', 'jsx.UIModal'], function(React, ReactDOM, UILayer, UIModal) {
	var $super = UILayer.prototype;
	return UILayer.extend({
		getDefaults: function() {
			return _.extend($super.getDefaults.apply(this,arguments),{
				buttons: [{
					text: '知道了',
					handle: $.proxy(this.hide, this)
				}]
			});
		},
//		render: function() {
//			this.options.children = this.createElement();
//			$super.render.apply(this,arguments);
//		},
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
			this.Component.show();
			this.once('hidden.alert.component',callback,this);
		},
		_onhide:function(){
			this.trigger('hidden');
		},
		_onshow:function(){
			this.trigger('shown');
		}
	});
});