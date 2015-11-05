define('UILayer',['react', 'react-dom', 'jsx.UILayer','ComponentBase'],function(React,ReactDOM,UILayer,ComponentBase){
	return ComponentBase.extend({
		getDefaults: function() {
			return {
				fade:true,
				onhide:$.proxy(this._onhide,this),
				onshow:$.proxy(this._onshow,this)
			};
		},
		render: function() {},
		show: function() {},
		hide: function() {}
	});
});