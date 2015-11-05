define('Alert', ['react', 'react-dom', 'Component', 'jsx.UIModal'], function(React, ReactDOM, Component, UIModal) {
	var $super = Component.prototype;

	var view = Component.extend({
		getDefaults:function(){
			var defaults = $super.getDefaults.apply(this,arguments);
			return _.extend(defaults,{
				backdrop: true,
				keybord: true,
				buttons: [{
					text: '知道了',
					handle: $.proxy(this.hide, this)
				}]
			});
		},
		render: function() {
			var factory = React.createFactory(UIModal);
			this.node = ReactDOM.render(factory(this.options), this.$el[0]);
			return this;
		},
		show: function(content, callback) {
			if(typeof content === 'string'){
				content = {
					children:content
				};
			}
			$super.show.call(this, content);
			callback && _.isFunction(callback) && this.once('hidden.alert.component', callback, this);
			return this;
		},
		setProps: function(props) {
			this.node.setProps(props);
			$super.setProps.apply(this, arguments);
			return this;
		},
		hide: function() {
			this.trigger('hidden.alert.component');
			$super.hide.apply(this, arguments);
			return this;
		}
	});
	return view;
});