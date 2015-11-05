define('UIConfirm', ['react', 'react-dom', 'UILayer', 'jsx.UIModal'], function(React, ReactDOM, UILayer, UIModal) {
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
			return <UIModal {...this.options}>{this.options.children}</UIModal>;
		},
		hide: function() {
			this.off('cancel.confirm.component');
			this.off('ok.confirm.component');
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
			cancelcallback = cancelcallback || this.hide;
			_.extend(this.options,{
				children:content,
				title:title
			});
			this.render();
			this.on('cancel.confirm.component',cancelcallback,this);
			this.on('ok.confirm.component',okcallback,this);
			$super.show.call(this);
		},
		_ok:function(){
			this.trigger('ok.confirm.component');
		},
		_cancel:function(){
			this.trigger('cancel.confirm.component');
		}
	});
});