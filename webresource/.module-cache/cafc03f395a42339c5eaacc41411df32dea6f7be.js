define('UIAlert', ['react', 'react-dom', 'jsx.UILayer', 'jsx.UIModal'], function(React, ReactDOM, UILayer, UIModal) {
	return Backbone.View.extend({
		initialize: function(options) {
			var defaults = this.getDefaults();
			this.options = _.extend({}, defaults, options);
			this.initialDocumentElement();
			this.render();
		},
		getDefaults: function() {
			return {
				buttons: [{
					text: '确定',
					handle: $.proxy(this.hide, this)
				}]
			};
		},
		initialDocumentElement: function() {
			this.$el.appendTo($('#components'));
		},
		render: function() {
			
			this.Component = ReactDOM.render(this.createElement(), this.$el[0]);
		},
		createElement:function(){
			return React.createElement(UILayer, null, 
						React.createElement(UIModal, React.__spread({},  this.options, {ref: "UIModal"}))
					);
		},
		hide: function() {
			this.Component.refs.UILayer.hide();
		},
		show: function() {
			this.Component.refs.UILayer.show();
		}
	});
});