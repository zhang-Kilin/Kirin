define('UIHeaderContainer', ['react','UIToolbars'], function(React,UIToolbars) {
	var UIHeaderContainer = {
		getDefaultProps: function() {
			return {
				//@param {function} onshow callback
				onshow: null,
				//@param {function} onhide callback
				onhide: null,
				//@param {string} title 
				title:'',
				//@param {ReactElement | Object | Array | string} 右侧工具栏，如果为string，则渲染系统提供的tool，如果为ReactElement，则直接进行渲染
				//@example 
				//		1. {icon:'home',text:'首页',isMoreMenu:false,handle:function(){App.jump('/')}}
				//		2. 'home'
				//		3. ['home']
				//		4. [{icon:'home',text:'首页',isMoreMenu:false,handle:function(){App.jump('/')}}]
				//		5. <Components></Components>
				//		6. [<Components></Components>]				
				toolbar:null,
				//所有tool的回调函数
				handles:{
					//@param {function} onback 返回按钮的回调函数
					onback:function(){},
					//@param {function} onhome 首页按钮的回调函数
					onhome:function(){}
				}				
			};
		},
		getInitialState: function() {
			return {
				//控制View是否显示，取值：hide,show
				show: true
			};
		},
		componentDidUpdate:function(prevProps,prevState){
			var evt = '';
			if(prevState.show != this.state.show){
				evt = this.state.show ? 'onshow' :'onhide';
			}
			evt && this.props[evt] && this.props[evt]();
		},
		render:function(){
			var cls = this.state.show ? '' : 'hide';
			cls = 'header '+cls;
			return React.createElement("header", {className: cls}, 
						this.createBack(), 
						this.createToolbarContainer(), 
						this.createTitleContainer(), 
						React.createElement("div", {className: "clearfix"})
					);
		},
		isReactElement:function(obj){
			return obj && typeof obj.$$typeof === "symbol" && /react.element/i.test(obj.$$typeof.toString());
		},
		createBack:function(){
			return React.createElement("a", {href: "javascript:;", className: "btn btn-info tool tool-back", onClick: this.props.handles.onback}, 
						React.createElement("i", {className: "glyphicon glyphicon-menu-left"})
					);
		},
		createTitleContainer:function(){
			return React.createElement("h3", {className: "center-block"}, this.props.title);
		},
		createToolbarContainer:function(){
			return React.createElement("div", {className: "tool tool-bar"}, this.createToolbar());
		},
		formatToolbarParams:function(toolbar){
			var results = [],
				menuBars = [],
				icon,
				tool;
			if(!toolbar){return results;}
			if(typeof toolbar === "string"){
				results = results.concat(this.formatToolbarParams({
					icon:toolbar
				}));
			}else if(this.isReactElement(toolbar)){
				results.push(toolbar);
			}else if(_.isArray(toolbar)){
				_.each(toolbar, $.proxy(function(item){
					results = results.concat(this.formatToolbarParams(item));
				},this));
			}else if(Object.prototype.toString.call(toolbar) === '[object Object]'){
				icon = toolbar['icon'];
				if(!toolbar.hasOwnProperty('handle')){
					toolbar['handle'] = this.props.handles['on'+icon];
				}
				results.push(toolbar);
			}
			return results;
		},
		createToolbar:function(){
			var children = [],
				results = this.formatToolbarParams(this.props.toolbar),
				moreMenums = [],
				tools = [],
				tmp,
				max = 3;
			_.each(results,$.proxy(function(item){
				if(item.isMoreMenu){
					moreMenums.push(item);
				}else{
					tools.push(item);
				}
			},this));
			if(moreMenums.length || tools.length > max){
				max = 2;
			}
			while(tools.length > max){
				tmp = tools.pop();
				
				tmp.isMoreMenu = true;
				moreMenums = [tmp].concat(moreMenums);
			}
			_.each(tools,$.proxy(function(item){
				if(this.isReactElement(toolbar)){
					children.push(item);
				}else{
					children.push(UIToolbars.create(item));
				}
			},this));
			moreMenums.length && children.push(UIToolbars.createMenuList(moreMenums));
			return children;
		},
		show:function(){
			if(this.state.show){
				return;
			}
			this.setState({show:true});
		},
		hide:function(){
			if(!this.state.show){
				return;
			}
			this.setState({show:false});
		}
	};

	return React.createClass(UIHeaderContainer);
});