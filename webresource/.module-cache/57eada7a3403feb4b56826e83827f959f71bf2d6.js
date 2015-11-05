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
			var cls = React.createClass({displayName: "cls",
				render:function(){
					return React.createElement(UILayer, React.__spread({},  this.props.layerOptions, {ref: "UILayer"}), 
								React.createElement(UIModal, React.__spread({},  this.props.modalOptions, {ref: "UIModal"}))
							);
				}
			});
//			return <UILayer {...this.layerOptions}>
//						<UIModal {...this.options}></UIModal>
//					</UILayer>;
			return React.createElement(cls,{
				layerOptions:this.layerOptions,
				modalOptions:this.options
			});
		},
		hide: function() {
//			this.Component.hide();
			this.Component.refs.UILayer.hide();
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
//			this.Component.refs.UIModal.setProps({
//				children:content,
//				title:title
//			});
//			this.Component.show();
			this.Component.refs.UILayer.show();
		},
		_onhide:function(){},
		_onshow:function(){}
	});
	
	return Backbone.View.extend(e);
});