define('UIToolbars', ['react'], function(React) {
	var UIToolbars = {
		HomeTool:null
	};
	var defaultProps = {
		handle:function(){}
	};
	UIToolbars.HomeTool = React.createClass({displayName: "HomeTool",
		getDefaultProps:function(){
			return {
				
				handle:function(){}
			}
		}
	})
	return UIToolbars;
});