define('Component', ['react-dom', 'UIBackdrop', 'ComponentBase'], function(ReactDOM, UIBackdrop, ComponentBase) {
	return ComponentBase.extend({
		getDefaults: function() {
			return {
				fade: true,
				backdrop:false,
				keybord:false
			};
		},
		render:function(){
			if(this.options.backdrop){
				this.backdrop = new UIBackdrop({
					fade:this.options.fade,
					click:$.proxy(this.hide,this)
				});
			}
		}
	});
});