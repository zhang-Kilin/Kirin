/* 
 * @description 背景遮罩
 * @author zhanghh@ctrip.com
 * @createtime 2015-10-26
 * @version 0.1
 * @modify
 * 		zhanghh@ctrip 2015-10-26
 */
define('jsx.UIBackdrop', ['react'], function(React) {
	var UIBackdrop = React.createClass({displayName: "UIBackdrop",
		getDefaultProps: function() {
			return {
				fade: true,
				click: function(){}
			};
		},
		getInitialState: function() {
			return {
				in:false,
				show:false,
				fade:false
			};
		},
		componentDidMount:function(){
			this.props.show && this.show();
		},
		componentDidUpdate:function(prevProps,prevState){
			console.log(prevState,this.state);
//			if(!this.state.show && prevState.show){
//				this.hide();
//			}else if(this.state.show && !prevState.show){
//				this.show();
//			}
		},
		shouldComponentUpdate:function(nextProps,nextState){
			
		},
		render:function(){
			var cls = "modal-backdrop" + (this.state.fade ? " fade" : ""),
				cls = cls + (this.state.in ? " in" : ""),
				display = this.state.show ? "block" : "none";
			return React.createElement("div", {className: cls, style: {display:display}, onClick: this.handleClick});
		},
		handleClick:function(){
			if(_.isFunction(this.props.click)){
				this.props.click();
			}
		},
		show:function(){
			if(this.props.fade){
				this.setState({
					show:true,
					fade:true
				});
				setTimeout($.proxy(function(){
					this.setState({
						in:true
					});
				},this),UIBackdrop.TRANSACTION_DURATION);
			}else{
				this.setState({
					show:true,
					in:true
				});
			}
		},
		hide:function(){
			if(this.props.fade){
				this.setState({in:false,fade:false});
				setTimeout($.proxy(function(){
					this.setState({show:false});
				},this),UIBackdrop.TRANSACTION_DURATION);
			}else{
				this.setState({show:false,in:false,fade:false});
			}
		}
	});
	
	UIBackdrop.TRANSACTION_DURATION = 150;
	return UIBackdrop;
});