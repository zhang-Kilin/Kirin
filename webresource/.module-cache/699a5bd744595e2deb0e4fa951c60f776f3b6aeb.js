define('ComponentBase',[],function(){
	var e = _.extend({},Backbone.Event,{
		initialize: function(options) {
			var defaults = this.getDefaults();
			this.options = _.extend({}, defaults, options);
			this.initialDocumentElement();
			this.layerOptions = {
				fade:this.options.fade,
				onhide:$.proxy(this._onhide,this),
				onshow:$.proxy(this._onshow,this)
			};
			this.render();
		},
	});
	return Backbone.View.exend(e);
})