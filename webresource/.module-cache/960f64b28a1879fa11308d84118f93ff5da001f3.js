/* 
 * @description Loading动画
 * @author zhanghh@ctrip.com
 * @createtime 2015-10-26
 * @version 0.1
 * @modify 
 * 		zhanghh@ctrip 2015-10-26
 */
define('jsx.UILoading', ['react','jsx.UILayer'], function(React,UILayer) {
	var UILoading = React.createClass({displayName: "UILoading",
		getDefaultProps:function(){
			return {
				//loading动画中需要加载的提示语
				children:'数据加载中'
			};
		},
		getInitialState:function(){
			return {};
		},
		componentDidMount:function(){
			
		},
		render:function(){
			return React.createElement(UILayer, React.__spread({},  this.props), 
						React.createElement("div", {className: "layer-container loading"}, 
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
								React.createElement("small", null, this.props.children)
							)
						)
					);
		}
	});
	
	return UILoading;
});