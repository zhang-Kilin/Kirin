/* 
 * @description 背景遮罩
 * @author zhanghh@ctrip.com
 * @createtime 2015-10-26
 * @version 0.1
 * @modify
 * 		zhanghh@ctrip 2015-10-26
 */
define('UIBackdrop', ['react'], function(React) {
	var defaultProps = {
		fade: true,
		show:false,
		click: function(){}
	};
	var UIBackdrop = React.createClass({displayName: "UIBackdrop",
		getDefaultProps: function() {
			return _.extend({},defaultProps);
		},
		getInitialState: function() {
			return {};
		},
		componentDidMount:function(){
			this.props.show && this.show();
		},
		componentDidUpdate:function(prevProps,prevState){
			if(this.props.show && !prevProps.show){ //onShow
				this.show();
			}else if(!this.props.show && prevProps.show){ //onHide
				this.setProps(defaultProps);
			}
		},
		render:function(){
			var cls = "modal-backdrop" + (this.props.fade ? " fade" : ""),
				cls = cls + (this.props.fade ? " in" : ""),
				display = this.props.show ? "block" : "none";
			return React.createElement("div", {className: cls, style: {display:display}, onClick: this.handleClick});
		},
		handleClick:function(){
			if(_.isFunction(this.props.click)){
				this.props.click();
			}
			this.setProps({
				click:defaultProps.click
			});
		},
		show:function(){
			if(this.props.fade){
				setTimeout($.proxy(function(){
					this.setState({
						in:true
					});
				},this),UIBackdrop.TRANSACTION_DURATION);
			}
		}
	});
	
	UIBackdrop.TRANSACTION_DURATION = 150;
	return UIBackdrop;
});