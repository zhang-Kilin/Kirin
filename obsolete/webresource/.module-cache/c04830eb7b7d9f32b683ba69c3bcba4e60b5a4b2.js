/* 
 * @description 背景遮罩
 * @author zhanghh@ctrip.com
 * @createtime 2015-10-26
 * @version 0.1
 * @modify
 * 		zhanghh@ctrip 2015-10-26
 */
define('UIBackdrop', ['react'], function(React) {
	var UIBackdrop = React.createClass({displayName: "UIBackdrop",
		getDefaultProps: function() {
			return {
				fade: true
			};
		},
		getInitialState: function() {
			return {
				show: false,
				fade: false
			};
		},
		render:function(){
			var cls = "modal-backdrop" + (this.props.fade ? " fade" : ""),
				cls = cls + (this.state.fade ? " in" : ""),
				cls = cls + (this.state.show ? "" : " hide");
			return React.createElement("div", {className: cls});
		},
		show:function(options){
			if(this.state.show){
				return this;
			}
			this.setProps(options);
			
			this.setState({
				show:true,
				fade:false
			});
			
			if(this.props.fade){
				setTimeout($.proxy(function(){
					this.setState({
						fade:true
					});
				},this),10);
			}else{
				this.setState({
					fade:true
				});
			}
			return this;
		},
		hide:function(){
			if(!this.state.show){
				return this;
			}
			this.setState({
				fade:false
			});
			if(this.props.fade){
				setTimeout($.proxy(function(){
					this.setState({
						show:false
					});
				},this),UIBackdrop.TRANSACTION_DURATION);
			}else{
				this.setState({
					show:false
				});
			}
		}
	});
	
	UIBackdrop.TRANSACTION_DURATION = 150;
	return UIBackdrop;
});