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
			'phone':{
				icon:'earphone',
				text:'联系我们'
			}
		};
		
	function createClass(propertys){
		return React.createClass({
			getDefaultProps:function(){
				return _.extend({},defaultProps,propertys);
			},
			render:function(){
				if(this.props.isMoreMenu){
					return this.createMoremenu();
				}
				return this.createButton();
			},
			createButton:function(){
				return React.createElement("a", {href: "javascript:;", className: "btn btn-info tool tool-btn", onClick: this.props.handle}, 
							React.createElement("i", {className: "glyphicon glyphicon-" + this.props.icon})
						);
			},
			createMoremenu:function(){
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
		getDefaultProps:function(){
			return {};
		},
		getInitialState: function() {
			return {
				//控制View是否显示，取值：hide,show
				show: false
			};
		},
		documentClickHandle:function(){
			this.setState({show:false});
		},
		componentDidMount:function(){
			$(document).on('click',$.proxy(this.documentClickHandle,this));
			$(this.getDOMNode()).find('.tool-btn').on('click',$.proxy(this.handle,this));
		},
		componentWillUnmount:function(){
			$(document).off('click',$.proxy(this.documentClickHandle,this));
		},
		handle:function(e){
			this.setState({
				show:!this.state.show
			});
			e.preventDefault();
			e.stopPropagation();
			return false;
		},
		stopPropagation:function(e){
			e.preventDefault();
			e.stopPropagation();
			return false;
		},
		render:function(){
			return React.createElement("div", {className: "moremenu-container"}, 
						React.createElement("a", {href: "javascript:;", className: "btn btn-info tool tool-btn"}, 
							React.createElement("i", {className: "glyphicon glyphicon-option-vertical"})
						), 
						React.createElement("div", {className: "moremenu"+(this.state.show?"":" hide")}, 							
							React.createElement("div", {className: "icon"}, 
								React.createElement("i", {className: "glyphicon glyphicon-triangle-top"})
							), 
							React.createElement("div", {className: "btn-group-vertical"}, 
								this.props.children
							)
						)
					);
		}
	});
	
	return _.extend(UIToolbars,{
		has:function(icon){
			return _.has(props,icon);
		},
		create:function(props){
			switch(props.icon){
				case 'home':
					return React.createElement(UIToolbars.home, React.__spread({},  props));
				case 'phone':
				case 'earphone':
					return React.createElement(UIToolbars.phone, React.__spread({},  props));
			}
		},
		createMenuList:function(props){
			var children = [];
			_.each(props,$.proxy(function(item){
				item.isMoreMenu = true;
				item = this.create(item);
				item && children.push(item);
			},this));
			return React.createElement(UIToolbars.moreMenuContainer, null, children);
		}
	});
});