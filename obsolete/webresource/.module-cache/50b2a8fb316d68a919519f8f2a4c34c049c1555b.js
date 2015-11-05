define('UIToolbars', ['react'], function(React) {
	var UIToolbars = {};
	
	var defaultProps = {
			handle:function(){},
			isMoreMenu:false
		},
		props ={
			'home': {
				alias:['home'],
				icon:'home',
				text:'首页'
			},
			'earphone':{
				alias:['phone','earphone'],
				icon:'earphone',
				text:'联系我们'
			},
			'share':{
				alias:['share'],
				icon:'share',
				text:'分享'
			},
			'edit':{
				alias:['edit'],
				icon:'edit',
				text:'编辑'
			},
			'log-in':{
				alias:['login','log-in'],
				icon:'log-in',
				text:'登录'
			},
			'log-out':{
				alias:['logout','log-out'],
				icon:'log-out',
				text:'注销'
			},
			'cog':{
				alias:['setting','cog'],
				icon:'cog',
				text:'设置'
			},
			'refresh':{
				alias:['refresh'],
				icon:'refresh',
				text:'刷新'
			},
			'user':{
				alias:['user'],
				icon:'user',
				text:'用户中心'
			},
			'trash':{
				alias:['delete','trash','remove','del'],
				icon:'trash',
				text:'删除'
			},
			'barcode':{
				alias:['barcode'],
				icon:'barcode',
				text:'扫码'
			},
			'qrcode':{
				alias:['qrcode'],
				icon:'qrcode',
				text:'扫码'
			},
			'heart':{
				alias:['heart'],
				icon:'heart',
				text:'赞一个'
			},
			'search':{
				alias:['search'],
				icon:'search',
				text:'搜索'
			},
			'star-empty':{
				alias:['favorite','star-empty'],
				icon:'star-empty',
				text:'收藏'
			},
			'print':{
				alias:['print'],
				icon:'print',
				text:'打印'
			},
			'envelope':{
				alias:['envelope','message','msg','email','mail'],
				icon:'envelope',
				text:'信息'
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
		isReactElement:function(obj){
			return obj && typeof obj.$$typeof === "symbol" && /react.element/i.test(obj.$$typeof.toString());
		},
		create:function(options){
			var icon = options.icon,
				obj;
			if(!_.has(props,icon)){
				obj = _.find(props,function(item,key){
					return _.indexOf(item.alias,icon) >= 0;
				});
				if(!obj){
					return;
				}
				options.icon = obj.icon;
			}
			return React.createElement(UIToolbars[options.icon],React.__spread({},  options));
//			switch(props.icon){
//				case 'phone':
//				case 'earphone':
//					props.icon = 'earphone';
//					return <UIToolbars.phone {...props}></UIToolbars.phone>;
//				case 'login':
//				case 'log-in':
//					props.icon = 'log-in';
//					return <UIToolbars.login {...props}></UIToolbars.login>;
//				case 'logout':
//				case 'log-out':
//					props.icon = 'log-out';
//					return <UIToolbars.logout {...props}></UIToolbars.logout>;
//				case 'setting':
//				case 'cog':
//					props.icon = 'cog';
//					return <UIToolbars.setting {...props}></UIToolbars.setting>;
//				case 'trash':
//				case 'delete':
//				case 'remove':
//				case 'del':
//					props.icon = 'trash';
//					return <UIToolbars.delete {...props}></UIToolbars.delete>;
//				case 'favorite':
//				case 'star-empty':
//					props.icon = 'star-empty';
//					return <UIToolbars.favorite {...props}></UIToolbars.favorite>;
//				case 'envelope':
//				case 'message':
//				case 'msg':
//				case 'email':
//				case 'mail':
//					props.icon = 'envelope';
//					return <UIToolbars.envelope {...props}></UIToolbars.envelope>;
//				default:
//					return React.createElement(UIToolbars[props.icon],React.__spread({},  props));
//			}
		},
		createMenuList:function(props){
			var children = [];
			_.each(props,$.proxy(function(item){
				if(this.isReactElement(item)){
					children.push(item);
				}else{
					item.isMoreMenu = true;
					item = this.create(item);
					item && children.push(item);
				}
			},this));
			return React.createElement(UIToolbars.moreMenuContainer, null, children);
		}
	});
});