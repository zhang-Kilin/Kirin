define('UIAlert', ['react', 'react-dom', 'UILayer', 'jsx.UIModal'], function(React, ReactDOM, UILayer, UIModal) {
	var $super = UILayer.prototype;
	return UILayer.extend({
		getDefaults: function() {
			return _.extend($super.getDefaults.apply(this,arguments),{
				buttons: [{
					text: '确定',
					handle: $.proxy(this._ok, this)
				},{
					text: '取消',
					handle: $.proxy(this._cancel, this)
				}]
			});
		},
		createElement:function(){
			return React.createElement(UIModal, React.__spread({},  this.options), this.options.children);
		},
		hide: function() {
			$super.hide.apply(this,arguments);
		},
		show: function(content,title,okcallback,cancelcallback) {
			if(!content){
				return this;
			}
			if(_.isFunction(title)){
				cancelcallback = okcallback;
				okcallback = title;
				title = null;
			}
			_.extend(this.options,{
				children:content,
				title:title
			});
			this.render();
			this.on('hidden.alert.component',cancelcallback,this);
			$super.show.call(this);
		},
		_ok:function(){},
		_cancel:function(){
			this.trigger('cancel.confirm.component');
			this.hide();
		}
	});
});