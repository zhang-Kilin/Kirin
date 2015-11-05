define('UIToolbars', ['react'], function(React) {
	var UIToolbars = {
		HomeTool:null
	};
	var defaultProps = {
		handle:function(){}
	};
	UIToolbars.HomeTool = React.createClass({displayName: "HomeTool",
		getDefaultProps:function(){
			return _.extend({},defaultProps,{
				icon:'home',
				text:'首页'
			});
		},
		render:function(){
			
		}
	})
	return UIToolbars;
});