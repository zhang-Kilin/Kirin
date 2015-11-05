define('UIHeaderContainer', ['react'], function(React) {
	var UITitle = React.createClass({displayName: "UITitle",
		getDefaultProps:function(){
			return {
				title:''
			};
		},
		render:function(){
			
		}
	});
	var UIHeaderContainer = {
		getDefaultProps: function() {
			return {
				onshow: null,
				onhide: null
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
			cls = 'header bg-info '+cls;
			return React.createElement("header", React.__spread({className: cls},  this.props), this.props.children);
		}
	};

	return React.createClass(UIHeaderContainer);
});