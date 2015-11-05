/* 
 * @description 构建垂直、左右居中的容器
 * @author zhanghh@ctrip.com
 * @createtime 2015-10-27
 * @version 0.1
 * @modify
 * 		zhanghh@ctrip 2015-10-27
 */
define('UILayer',['react'],function(React){
	var UILayer = React.createClass({displayName: "UILayer",
		getDefaultProps:function(){
			return {
				fade:true,
				backdrop:false,
				keybord:true
			};
		},
		getInitialState:function(){
			return {
				show:false,
				fade:false,
				marginTop:0,
				marginLeft:0
			};
		},
		render:function(){
			var cls = "layer" + (this.props.fade ? " fade" : ""),
				cls = cls + (this.state.show ? "" : "hide"),
				style = {marginTop:this.state.marginTop,marginLeft:this.state.marginLeft};
			return React.createElement("div", {className: cls, style: style}, this.props.children);
		},
		show:function(props,callback){},
		hide:function(callback){}
	});
	return UILayer;
});