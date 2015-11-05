define('UIHeaderContainer', ['react'], function(React) {
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
				show: false
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
			cls = 'view '+cls;
			return React.createElement("div", React.__spread({className: cls},  this.props), this.props.children);
		}
	};

	return React.createClass(UIHeaderContainer);
});