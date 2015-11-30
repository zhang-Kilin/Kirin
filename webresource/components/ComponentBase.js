define('ComponentBase', [], function() {
	var e = _.extend({}, Backbone.Event, {
		initialize: function(options) {
			var defaults = this.getDefaults();
			this.options = _.extend({}, defaults, options);
			this.initialDocumentElement();
			this.render();
		},
		getDefaults: function() {
			return {};
		},
		initialDocumentElement: function() {
			this.$el.appendTo($('#components'));
		},
		render: function() {},
		show:function(){
			this.trigger('show');
			this.$el.show();
			this.trigger('shown');
			return this;
		},
		hide:function(){
			this.trigger('hide');
			this.$el.hide();
			this.trigger('hidden');
			return this;
		},
		destroy:function(){
			this.trigger('destroy');
			this.$el.remove();
			this.trigger('destroyed');
		}
	});
	return Backbone.View.extend(e);
})