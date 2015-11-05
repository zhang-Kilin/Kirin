define('UIToolbars', ['react'], function(React) {
	var UIToolbars = {
		HomeTool:null
	};
	var defaultProps = {
		handle:function(){},
		isMoreMenu:false
	};
	UIToolbars.HomeTool = React.createClass({displayName: "HomeTool",
		getDefaultProps:function(){
			return _.extend({},defaultProps,{
				icon:'home',
				text:'首页'
			});
		},
		render:function(){
			if(this.props.isMoreMenu){
				return this.createHomeMoremenu();
			}
			return this.createHomeButton();
		},
		createHomeButton:function(){},
		createHomeMoremenu:function(){}
	})
	return UIToolbars;
});