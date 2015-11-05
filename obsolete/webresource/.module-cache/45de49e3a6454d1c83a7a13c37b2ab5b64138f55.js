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
				//@param {ReactElement | Array | string} 右侧工具栏，如果为string，则渲染系统提供的tool，如果为ReactElement，则直接进行渲染 
				toolbar:null,
				//@param {function} onback 返回按钮的回调函数
				onback:function(){}
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
			return React.createElement("a", {href: "javascript:;", className: "btn btn-info tool tool-back", onClick: this.props.onback}, 
						React.createElement("i", {className: "glyphicon glyphicon-menu-left"})
					);
		},
		createTitleContainer:function(){
			return React.createElement("h3", {className: "center-block"}, this.props.title);
		},
		createToolbarContainer:function(){
			return React.createElement("div", {className: "tool tool-bar"}, this.createToolbar());
		},
		createToolbar:function(){
			var toolbar = this.props.toolbar;
			if(!toolbar){return;}
			if(typeof toolbar === "string"){
				
			}
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