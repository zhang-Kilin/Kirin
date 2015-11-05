define('UIToolbars', ['react'], function(React) {
	var UIToolbars = {
		/*
		 * props = {
		 * 	handle:function(){},
		 *  isMoreMenu:false,
		 *  icon:'home',
		 *  text:'首页'
		 * }
		 */
		home:null
	};
	var defaultProps = {
		handle:function(){},
		isMoreMenu:false
	};
	UIToolbars.home = React.createClass({displayName: "home",
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
		createHomeButton:function(){
			return React.createElement("a", {href: "javascript:;", className: "btn btn-info tool tool-btn", onClick: this.props.handle}, 
						React.createElement("i", {className: "glyphicon glyphicon-" + this.props.icon})
					);
		},
		createHomeMoremenu:function(){}
	});
	return {
		create:function(props){
			
		}
	};
});