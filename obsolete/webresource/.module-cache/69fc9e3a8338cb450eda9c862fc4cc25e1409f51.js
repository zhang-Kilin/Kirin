/* 
 * @description Loading动画
 * @author zhanghh@ctrip.com
 * @createtime 2015-10-26
 * @version 0.1
 * @modify 
 * 		zhanghh@ctrip 2015-10-26
 */
define('UILoading', ['react','UILayer'], function(React,UILayer) {
	var defaultProps = {
		//loading动画中需要加载的提示语
		content:'数据加载中',
		//是否开启动画
		fade:true,
		//是否有背景遮罩
		//取值范围：false | UIBackdrop的实例
		backdrop:false,
		//遮罩是否响应点击关闭loading事件
		keybord:false
	};
	var UILoading = React.createClass({displayName: "UILoading",
		getDefaultProps:function(){
			return _.extend({},defaultProps);
		},
		getInitialState:function(){
			return {};
		},
		render:function(){
			return React.createElement(UILayer, React.__spread({},  this.props), 
						React.createElement("div", {className: "loading"}, 
							React.createElement("div", {className: "spinner"}, 
								React.createElement("div", {className: "spinner-container container1"}, 
									React.createElement("div", {className: "circle1"}), 
									React.createElement("div", {className: "circle2"}), 
									React.createElement("div", {className: "circle3"}), 
									React.createElement("div", {className: "circle4"})
								), 
								React.createElement("div", {className: "spinner-container container2"}, 
									React.createElement("div", {className: "circle1"}), 
									React.createElement("div", {className: "circle2"}), 
									React.createElement("div", {className: "circle3"}), 
									React.createElement("div", {className: "circle4"})
								), 
								React.createElement("div", {className: "spinner-container container3"}, 
									React.createElement("div", {className: "circle1"}), 
									React.createElement("div", {className: "circle2"}), 
									React.createElement("div", {className: "circle3"}), 
									React.createElement("div", {className: "circle4"})
								)
							), 
							React.createElement("div", {className: "content text-muted"}, 
								React.createElement("small", null, this.props.content)
							)
						)
					);
		}
	});
	
	return UILoading;
});