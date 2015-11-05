define('UIBackdrop',['react','react-dom','jsx.UIBackdrop','ComponentBase'],function(React,ReactDOM,UIBackdrop,ComponentBase){
	return ComponentBase.extend({
		getDefaults:function(){
			return {
				fade:true
			}
		},
		render:function(){
			this.Component = ReactDOM.render(<UIBackdrop {...this.options} />,this.$el[0]);
		},
		show:function(){
			this.Component.show();
		},
		hide:function(){
			this.Component.hide();
		}
	});
})