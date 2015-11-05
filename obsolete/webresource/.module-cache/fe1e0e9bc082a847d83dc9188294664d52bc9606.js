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
			return React.createElement("header", React.__spread({className: cls},  this.props), 
						this.createBack(), 
						this.createToolbarContainer(), 
						this.createTitleContainer(), 
						React.createElement("div", {className: "clearfix"})
					);
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
			return React.createElement("div", {className: "tool tool-bar"}, this.createToolbar(this.props.toolbar));
		},
		createToolbar:function(toolbar){
			var results = [],
				menuBars = [],
				icon,
				tool;
			if(!toolbar){return results;}
			if(typeof toolbar === "string"){
				results = results.concat(this.createToolbar({
					icon:toolbar
				}));
			}else if(typeof toolbar.$$typeof === "symbol" && /react/i.test(toolbar.$$typeof.toString())){
				results.push(toolbar);
			}else if(_.isArray(toolbar)){
				_each($.proxy(function(item){
					results = results.concat(this.createToolbar(item));
				},this));
			}else if(Object.prototype.toString.call(toolbar) === '[object Object]'){
				icon = toolbar['icon'];
				if(!toolbar.hasOwnProperty('handle')){
					toolbar['handle'] = this.props.handles['on'+icon];
				}
				if(toolbar.isMoreMenu){
					menuBars.push(toolbar);
				}else{
					tool = UIToolbars.create(toolbar);
				 	tool && results.push(tool);
				 }
			}
			if(menuBars.length){
				results.push(UIToolbars.createMenuList(menuBars));
			}
			return results;
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