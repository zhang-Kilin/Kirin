define('Select', ['react', 'react-dom', 'Component', 'jsx.UILayerList', 'jsx.UISelect'], function(React, ReactDOM, Component, UILayerList, UISelect) {
	var $super = Component.prototype;
	return Component.extend({
		render: function() {
			var factory = React.createFactory(UILayerList);
			this.node = ReactDOM.render(factory(this.options), this.$el[0]);
		},
		show: function(items, onchange) {
			var opts = {};
			if(_.isFunction(items)){
				onchange = items;
			}else{
				items = this.createSelectElement(items);
				opts.children = items;
			}
			$super.show.call(this, opts);
			_.isFunction(onchange) && this.on('change.select.component', onchange, this);
			return this;
		},
		createSelectElement: function(items) {
			return React.createElement(UISelect, {
				onchange: $.proxy(this._onchange, this)
			}, items);
		},
		setProps: function(props) {
			this.node.setProps(props);
			return this;
		},
		_onchange: function(item) {
			this.trigger('change.select.component', item);
		},
		hide:function(){
			this.off('change.select.component');
			$super.hide.apply(this,arguments);
			return this;
		}
	})
});