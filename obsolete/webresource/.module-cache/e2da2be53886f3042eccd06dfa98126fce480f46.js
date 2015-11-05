define('UIView', ['react'], function(React) {
	var UIView = {
		getDefaultProps: function() {
			return {
				onshow: null,
				onhide: null
			};
		},
		getInitialState: function() {
			return {
				//控制View是否显示，取值：hide,show
				status: 'hide'
			};
		},
		componentDidUpdate:function(prevProps,prevState){
			var evt = '';
			if(prevState.status != this.state.status){
				evt = this.state.status == 'show' ? 'onshow' :'onhide';
			}
			evt && this.props[evt] && this.props[evt](); 
		},
		render:function(){
			var cls = this.state.status == 'show' ? '' : 'hide';
			cls = 'view '+cls;
			return React.createElement("div", React.__spread({className: cls},  this.props), this.props.children);
		}
	};

	return React.createClass(UIView);
});