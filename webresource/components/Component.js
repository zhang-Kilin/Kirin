define('Component', ['react-dom', 'UIBackdrop', 'ComponentBase'], function(ReactDOM, UIBackdrop, ComponentBase) {
	return ComponentBase.extend({
		getDefaults: function() {
			return {
				fade: true,
				backdrop:true,
				keybord:true
			};
		},
		render:function(){
			if(this.options.backdrop && !this.backdrop){
				this.backdrop = new UIBackdrop({
					fade:this.options.fade,
					click:$.proxy(this.hide,this)
				});
			}
		},
		show:function(){
			this.backdrop && this.backdrop.show();
		},
		hide:function(){
			this.backdrop && this.backdrop.hide();
		}
	});
});