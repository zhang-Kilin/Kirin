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
			},
			'share':{
				icon:'share',
				text:'分享'
			},
			'edit':{
				icon:'edit',
				text:'编辑'
			},
			'login':{
				icon:'log-in',
				text:'登录'
			},
			'logout':{
				icon:'log-out',
				text:'注销'
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
				return React.createElement("a", {href: "javascript:;", className: "btn btn-info tool tool-btn", title: this.props.text, onClick: this.props.handle}, 
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
	
	function isReactElement(obj){
		return obj && typeof obj.$$typeof === "symbol" && /react.element/i.test(obj.$$typeof.toString());
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
			var children = [];
			_.each(this.props.children,$.proxy(function(item){
				if(isReactElement(item)){
					children.push(item);
				}else{
					item.isMoreMenu = true;
					item = UIToolbars.create(item);
					item && children.push(item);
				}
			},this));
			return React.createElement("div", {className: "moremenu-container"}, 
						React.createElement("a", {href: "javascript:;", className: "btn btn-info tool tool-btn"}, 
							React.createElement("i", {className: "glyphicon glyphicon-option-vertical"})
						), 
						React.createElement("div", {className: "moremenu"+(this.state.show?"":" hide")}, 							
							React.createElement("div", {className: "icon"}, 
								React.createElement("i", {className: "glyphicon glyphicon-triangle-top"})
							), 
							React.createElement("div", {className: "btn-group-vertical"}, 
								children
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
				case 'phone':
				case 'earphone':
					props.icon = 'earphone';
					return React.createElement(UIToolbars.phone, React.__spread({},  props));
				case 'login':
				case 'log-in':
					props.icon = 'log-in';
					return React.createElement(UIToolbars.login, React.__spread({},  props));
				case 'logout':
				case 'log-out':
					props.icon = 'log-out';
					return React.createElement(UIToolbars.out, React.__spread({},  props));
				default:
					return React.createElement(UIToolbars[props.icon],React.__spread({},  props));
			}
		},
		createMenuList:function(props){
			return React.createElement(UIToolbars.moreMenuContainer, null, props);
		}
	});
});