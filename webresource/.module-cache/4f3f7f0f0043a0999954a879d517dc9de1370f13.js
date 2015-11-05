define('Component', ['react-dom', 'UIBackdrop', 'ComponentBase'], function(ReactDOM, UIBackdrop, ComponentBase) {
	return ComponentBase.extend({
		getDefaults: function() {
			return {
				fade: true,
				backdrop:false,
				keybord:false
			};
		},
		render:function(){}
	});
});