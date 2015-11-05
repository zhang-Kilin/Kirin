define('ComponentBase',[],function(){
	var e = _.extend({},Backbone.Event,{
		initialize: function(options) {
			var defaults = this.getDefaults();
			this.options = _.extend({}, defaults, options);
			this.initialDocumentElement();
			this.render();
		},
		getDefaults:function(){
			return {};
		},
		initialDocumentElement:function(){
			this.$el.appendTo($('#components'));
		}
	});
	return Backbone.View.exend(e);
})