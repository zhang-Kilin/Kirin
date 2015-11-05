define('UIBackdrop',['react','react-dom','jsx.UIBackdrop','UIComponentBase'],function(React,ReactDOM,UIBackdrop,ComponentBase){
	return ComponentBase.extend({
		getDefaults:function(){
			return {
				fade:true
			}
		},
		render:function(){
			this.Component = ReactDOM.render(React.createElement(UIBackdrop, React.__spread({},  this.options)))
		}
	});
})