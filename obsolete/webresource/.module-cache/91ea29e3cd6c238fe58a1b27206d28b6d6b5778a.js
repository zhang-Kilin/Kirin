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
			},
			'option-vertical':{
				icon:'option-vertical'
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
				return React.createElement("a", {href: "javascript:;", className: "btn btn-default", onClick: this.props.handle}, 
							React.createElement("i", {className: "glyphicon glyphicon-" + this.props.icon}), this.props.text
						);
			}
		});
	};
		
	_.each(props,function(item,key){
		UIToolbars[key] = createClass(item);
	});
	
	UIToolbars.moreMenuContainer = React.createClass({displayName: "moreMenuContainer",
		getInitialState: function() {
			return {
				//控制View是否显示，取值：hide,show
				show: false
			};
		},
		handle:function(){
			this.setState({
				show:!this.state.show
			});
		},
		render:function(){
			return React.createElement("a", {href: "javascript:;", className: "btn btn-info tool tool-btn", onClick: this.handle}, 
						React.createElement("i", {className: "glyphicon glyphicon-option-vertical"}), 
						React.createElement("div", {className: "moremenu"+(this.state.show?"":" hide")}, 							
							this.props.children
						)
					);
		}
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
			_.each(props,$.proxy(function(item){
				item = this.create(item);
				item && children.push(item);
			},this));
			return React.createElement("div", null, 
						React.createElement("a", {href: "javascript:;", className: "btn btn-info tool tool-btn"}, 
							React.createElement("i", {className: "glyphicon glyphicon-option-vertical"})
						), 						
						React.createElement("div", {className: "moremenu"}, 							
							React.createElement("div", {className: "icon"}, 
								React.createElement("i", {className: "glyphicon glyphicon-triangle-top"})
							), 
							React.createElement("div", {className: "btn-group-vertical"}, 
								React.createElement("a", {href: "javascript:;", className: "btn btn-default"}, "首页")
							)
						)
					);
		}
	});
});