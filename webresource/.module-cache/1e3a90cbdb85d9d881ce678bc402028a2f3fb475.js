define('UILayer',['react', 'react-dom', 'jsx.UILayer','ComponentBase'],function(React,ReactDOM,UILayer,ComponentBase){
	return ComponentBase.extend({
		getDefaults: function() {
			return {
				fade:true,
				onhide:$.proxy(this._onhide,this),
				onshow:$.proxy(this._onshow,this)
			};
		},
		render: function() {
			this.Component = ReactDOM.render(React.createElement(UILayer, React.__spread({},  this.options)),this.$el[0]);
		},
		show: function() {
			this.Component.show();
		},
		hide: function() {
			this.Component.hide();
		},
		_onhide:function(){
			this.trigger('hidden');
		},
		_onshow:function(){
			this.trigger('shown');
		}
	});
});