/* 
 * @description 背景遮罩
 * @author zhanghh@ctrip.com
 * @createtime 2015-10-26
 * @version 0.1
 * @modify
 * 		zhanghh@ctrip 2015-10-26
 */
define('jsx.UIBackdrop', ['react'], function(React) {
	var UIBackdrop = React.createClass({
		getDefaultProps: function() {
			return {
				fade: true,
				onshow:function(){},
				onhide:function(){},
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
		},
		render:function(){
			var cls = "modal-backdrop" + (this.state.fade ? " fade" : ""),
				cls = cls + (this.state.in ? " in" : ""),
				display = this.state.show ? "block" : "none";
			return <div className={cls} style={{display:display}} onClick={this.handleClick}></div>;
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
					if (_.isFunction(this.props.onshow)) {
						this.props.onshow();
					};
				},this),UIBackdrop.TRANSACTION_DURATION);
			}else{
				this.setState({
					show:true,
					in:true
				});
				if (_.isFunction(this.props.onshow)) {
					this.props.onshow();
				};
			}
		},
		hide:function(){
			if(this.props.fade){
				this.setState({in:false});
				setTimeout($.proxy(function(){
					this.setState({show:false});
					if (_.isFunction(this.props.onhide)) {
						this.props.onhide();
					};
				},this),UIBackdrop.TRANSACTION_DURATION);
			}else{
				this.setState({show:false,in:false,fade:false});
				if (_.isFunction(this.props.onhide)) {
					this.props.onhide();
				};
			}
		}
	});
	
	UIBackdrop.TRANSACTION_DURATION = 150;
	return UIBackdrop;
});