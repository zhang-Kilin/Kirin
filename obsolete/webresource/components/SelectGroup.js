define('SelectGroup', ['react', 'react-dom', 'Component', 'jsx.UISelectGroup'], function(React, ReactDOM, Component, UISelectGroup) {
	var $super = Component.prototype;
	return Component.extend({
		getDefaults: function() {
			var defaults = $super.getDefaults.apply(this, arguments);
			return _.extend(defaults, {
				fade: true,
				backdrop: true,
				keybord: true,
				toolbar: true,
				onitemchange: $.proxy(this._onitemchange, this),
				onchange: $.proxy(this._onchange, this),
				oncancel: $.proxy(this.hide, this)
			});
		},
		render: function() {
			var factory = React.createFactory(UISelectGroup);
			this.node = ReactDOM.render(factory(this.options), this.$el[0]);
		},
		show: function(items, onchange, onitemchange) {
			var opts = {};
			if(_.isFunction(items)){
				onitemchange = onchange;
				onchange = items
				items = null;
			}else{
				opts.children = items;
			}
			
			$super.show.call(this, opts);
			_.isFunction(onchange) && this.on('change.selectgroup.component', onchange, this);
			_.isFunction(onitemchange) && this.on('itemchange.selectgroup.component', onitemchange, this);
			return this;
		},
		setProps: function(props) {
			this.node.setProps(props);
			return this;
		},
		setState:function(state){
			this.node.setState(state);
			return this;
		},
		_onchange: function(items) {
			this.trigger('change.selectgroup.component', items);
		},
		_onitemchange: function(item, index) {
			var children = this.props.children || this.props.children;			
			this.trigger('itemchange.selectgroup.component', item, index);
		},
		hide: function() {
			this.off('change.selectgroup.component');
			this.off('itemchange.selectgroup.component');
			$super.hide.apply(this, arguments);
			return this;
		}
	})
});