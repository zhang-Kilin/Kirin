define('Backdrop', ['react', 'react-dom', 'ComponentBase', 'jsx.UIBackdrop'], function(React, ReactDOM, ComponentBase, UIBackdrop) {
	var $super = ComponentBase.prototype;
	var view = ComponentBase.extend({
		render: function() {
			var factory = React.createFactory(UIBackdrop);
			this.node = ReactDOM.render(factory(this.options), this.$el[0]);
			return this;
		},
		setProps: function(props) {
			this.node.setProps(props);
			return this;
		},
		setState:function(state){
			this.node.setState(state);
			return this;
		}
	});

	return view;
});