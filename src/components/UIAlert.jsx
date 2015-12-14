define('UIAlert', ['react', 'react-dom', 'UILayer', 'jsx.UIModal'], function(React, ReactDOM, UILayer, UIModal) {
	var $super = UILayer.prototype;
	return UILayer.extend({
		initialize:function(){
			$super.initialize.apply(this,arguments);
			_.each(this.options.buttons,$.proxy(function(item){
				item.handle = $.proxy(item.handle,this);
			},this));
		},
		getDefaults: function() {
			return _.extend($super.getDefaults.apply(this,arguments),{
				buttons: [{
					text: '知道了',
					handle: function(){
						this.hide();
					}
				}]
			});
		},
		createElement:function(){
			return <UIModal {...this.options}>{this.options.children}</UIModal>;
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