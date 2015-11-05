/* 
 * @description 模态窗体
 * @author zhanghh@ctrip.com
 * @createtime 2015-10-27
 * @version 0.1
 * @modify
 * 		zhanghh@ctrip 2015-10-27
 */
define('UIModal',['react','UILayer'],function(React,UILayer){
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
			return React.createElement(UILayer, null, 
						React.createElement("div", {class: "ui-modal"}, 
							React.createElement("div", {class: "modal-header"}, 
								React.createElement("h4", null, "title")
							), 
							React.createElement("div", {class: "moadal-body"}, 
								React.createElement("p", null, "hello world")
							), 
							React.createElement("div", {class: "modal-footer"}, 
								React.createElement("div", {class: "btn-group btn-group-justified"}, 							
									React.createElement("a", {href: "javascript:;", class: "btn btn-default"}, "确定"), 
									React.createElement("a", {href: "javascript:;", class: "btn btn-default"}, "取消")
								)
							)
						)
					);
		}
	})
});