define('UIAlert', ['react', 'react-dom', 'jsx.UILayer', 'jsx.UIModal'], function(React, ReactDOM, UILayer, UIModal) {
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
		getDefaults: function() {
			return {
				buttons: [{
					text: '知道了',
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
			return React.createElement(UILayer, React.__spread({},  this.layerOptions), 
						React.createElement(UIModal, React.__spread({},  this.options))
					);
		},
		hide: function() {
			this.Component.hide();
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
			this.Component.show();
			this.once('hidden.alert.component',callback,this);
		},
		_onhide:function(){},
		_onshow:function(){}
	});
	
	return Backbone.View.extend(e);
});