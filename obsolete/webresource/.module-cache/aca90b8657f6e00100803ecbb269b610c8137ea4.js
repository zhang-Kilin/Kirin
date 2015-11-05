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
			var cls = "modal-backdrop" + this.props.fade ? " fade" : "";
			return React.createElement("div", {className: cls});
		},
		show:function(){},
		hide:function(){}
	});

	return UIBackdrop;
});