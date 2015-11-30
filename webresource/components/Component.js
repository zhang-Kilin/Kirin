define('Component', ['react-dom', 'UIBackdrop', 'ComponentBase'], function(ReactDOM, UIBackdrop, ComponentBase) {
	var $super = ComponentBase.prototype;
	return ComponentBase.extend({
		initialize:function(){
			this.on('hidden',function(){
				this.$el.hide();
			},this);
			$super.initialize.apply(this,arguments);
		},
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
		},
		show:function(){
			this.trigger('show');
			this.backdrop && this.backdrop.show();
			this.$el.show();

			// return $super.show.apply(this,arguments);
		},
		hide:function(){
			this.trigger('hide');
			this.backdrop && this.backdrop.hide();
			// return $super.hide.apply(this,arguments);
		},
		destroy:function(){
			this.backdrop && this.backdrop.destroy();
			return $super.destroy.apply(this,arguments);
		}
	});
});