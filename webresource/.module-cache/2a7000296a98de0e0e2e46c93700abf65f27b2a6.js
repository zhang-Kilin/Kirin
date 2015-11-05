define('UIAlert', ['react', 'react-dom', 'UILayer', 'jsx.UIModal'], function(React, ReactDOM, UILayer, UIModal) {
	var $super = UILayer.prototype;
	return UILayer.extend({
		getDefaults: function() {
			return _.extend($super.getDefaults.apply(this,arguments),{
				title:'',
				buttons: [{
					text: '确定',
					handle: $.proxy(this.hide, this)
				}]
			});
		},
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