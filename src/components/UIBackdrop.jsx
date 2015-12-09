define('UIBackdrop',['react','react-dom','jsx.UIBackdrop','ComponentBase'],function(React,ReactDOM,UIBackdrop,ComponentBase){
	var $super = ComponentBase.prototype;
	return ComponentBase.extend({
		initialize:function(){			
			this.on('show',function(){
				this.$el.show();
			},this);

			this.on('hidden',function(){
				this.$el.hide();
			},this);

			$super.initialize.apply(this,arguments);
		},
		getDefaults:function(){
			return {
				fade:true,
				onshow:$.proxy(this._show,this),
				onhide:$.proxy(this._hide,this)
			}
		},
		render:function(){
			this.Component = ReactDOM.render(<UIBackdrop {...this.options} />,this.el);
		},
		_show:function(){
			this.trigger('shown');
		},
		_hide:function(){
			this.trigger('hidden');
		},
		show:function(){
			this.trigger('show');			
			this.Component.show();
			return this;
		},
		hide:function(){
			this.trigger('hide');
			this.Component.hide();
			return this;
		}
	});
})