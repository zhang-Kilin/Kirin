/* 
 * @description Toast提示框
 * @author zhanghh@ctrip.com
 * @createtime 2015-10-28
 * @version 0.1
 * @modify
 * 		zhanghh@ctrip 2015-10-28
 */
define('jsx.UIToast',['react','jsx.UILayer'],function(React,UILayer){
	var defaultProps = {
		//是否显示
		show:false,
		//是否开启动画
		fade:true,
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
						React.createElement("div", {className: "toast layer-container"}, 
							React.createElement("div", {className: "moadal-body"}, 
								this.props.children
							)
						)
					);
		}
	});
});