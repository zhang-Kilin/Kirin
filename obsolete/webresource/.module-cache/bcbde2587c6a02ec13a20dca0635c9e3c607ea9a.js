define('UIToolbars', ['react'], function(React) {
	var UIToolbars = {};
	
	var defaultProps = {
			handle:function(){},
			isMoreMenu:false
		},
		props ={
			'home': {
				icon:'home',
				text:'首页'
			}
		};
		
	function createClass(propertys){
		return React.createClass({
			getDefaultProps:function(){
				return _.extend({},defaultProps,propertys);
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
	};
		
	_.each(props,function(item,key){
		UIToolbars[key] = createClass(item);
	});
	
	return _.extend(UIToolbars,{
		create:function(props){
			switch(props.icon){
				case 'home':
					return React.createElement(UIToolbars.home, React.__spread({},  props));
			}
		}
	});
});