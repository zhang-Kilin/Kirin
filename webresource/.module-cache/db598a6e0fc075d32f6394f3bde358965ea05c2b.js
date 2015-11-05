/* 
 * @description Toast提示框
 * @author zhanghh@ctrip.com
 * @createtime 2015-10-28
 * @version 0.1
 * @modify
 * 		zhanghh@ctrip 2015-10-28
 */
define('jsx.UIToast',['react'],function(React){
	return React.createClass({
		getDefaultProps:function(){
			return {};
		},
		getInitialState:function(){
			return {};
		},
		render:function(){
			return React.createElement("div", {className: "toast layer-container"}, 
						React.createElement("div", {className: "moadal-body"}, 
							this.props.children
						)
					);
		}
	});
});