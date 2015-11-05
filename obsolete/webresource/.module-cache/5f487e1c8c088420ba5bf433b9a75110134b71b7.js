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
			createHomeMoremenu:function(){
				return React.createElement("a", {href: "javascript:;", class: "btn btn-default", onClick: this.props.handle}, 
							React.createElement("i", {className: "glyphicon glyphicon-" + this.props.icon}), this.props.text
						);
			}
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
		},
		createMenuList:function(props){
			var children = [];
			_.each(props,function(item){
				
			});
			return React.createElement("div", {class: "moremenu"}, 
						React.createElement("div", {class: "icon"}, 
							React.createElement("i", {class: "glyphicon glyphicon-triangle-top"})
						), 
						React.createElement("div", {class: "btn-group-vertical"}, 
							children
						)
					);
		}
	});
});