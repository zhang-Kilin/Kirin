/* 
 * @description Toast提示框
 * @author zhanghh@ctrip.com
 * @createtime 2015-10-28
 * @version 0.1
 * @modify
 * 		zhanghh@ctrip 2015-10-28
 */
define('UIToast',['react','UILayer'],function(React,UILayer){
	var defaultProps = {
		//是否显示
		show:false,
		//是否开启动画
		fade:true,
		//是否有背景遮罩
		//取值范围：false | UIBackdrop的实例
		backdrop:false,
		//遮罩是否响应点击关闭loading事件
		keybord:false,
		onkeybord:function(){},
		onshow:function(){},
		onhide:function(){}
	};
	
	return React.createClass({
		getDefaultProps:function(){
			return _.extend({},defaultProps);
		},
		getInitialState:function(){
			return {};
		},
		render:function(){
			return React.createElement(UILayer, React.__spread({},  this.props), 
						React.createElement("div", {className: "layer-container toast"}, 
							React.createElement("div", {className: "moadal-body  well"}, 
								this.props.children
							)
						)
					);
		}
	});
});