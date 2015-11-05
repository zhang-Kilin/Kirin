define('UIHeaderContainer', ['react'], function(React) {
	var UIHeaderContainer = {
		getDefaultProps: function() {
			return {
				//@param {function} onshow callback
				onshow: null,
				//
				onhide: null,
				title:'',
				toolbar:null,
				onBackHandle:function(){}
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
						this.createToolbar(), 
						this.createTitleContainer(), 
						React.createElement("div", {className: "clearfix"})
					);
		},
		createBack:function(){
			return React.createElement("a", {href: "javascript:;", className: "btn btn-info tool tool-back", onClick: this.props.onBackHandle}, 
						React.createElement("i", {className: "glyphicon glyphicon-menu-left"})
					);
		},
		createTitleContainer:function(){
			return React.createElement("h3", {className: "center-block"}, this.props.title);
		},
		createToolbar:function(){
			return React.createElement("div", {className: "tool tool-bar"}, this.props.toolbar);
		}
	};

	return React.createClass(UIHeaderContainer);
});