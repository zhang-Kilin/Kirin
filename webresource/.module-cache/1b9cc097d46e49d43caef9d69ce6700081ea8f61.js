define('UILayer',['react', 'react-dom', 'jsx.UILayer','ComponentBase'],function(React,ReactDOM,UILayer,ComponentBase){
	return ComponentBase.extend({
		getDefaults: function() {
			return {
				fade:true,
				
			};
		},
		render: function() {},
		show: function() {},
		hide: function() {}
	});
});