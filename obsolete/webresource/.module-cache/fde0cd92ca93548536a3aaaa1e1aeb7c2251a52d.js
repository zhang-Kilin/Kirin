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
		title:'',
		buttons:[
			{
				text:'确定',
				handle:function(){}
			},
			{
				text:'取消',
				handle:function(){}
			}
		],
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
			var props = _.extend({},this.props);
			delete props.title;
			delete props.buttons;
			
			return React.createElement(UILayer, React.__spread({},  props), 
						React.createElement("div", {className: "layer-container ui-modal"}, 
							this.createHeader(), 
							React.createElement("div", {className: "moadal-body"}, 
								this.props.children
							), 
							this.createFooter()
						)
					);
		},
		createHeader:function(){
			if(this.props.title){
				return React.createElement("div", {className: "modal-header"}, 
							React.createElement("h4", null, this.props.title)
						);
			}
		},
		createFooter:function(){			
			if(this.props.buttons && this.props.buttons.length){
				return React.createElement("div", {className: "modal-footer"}, 
							React.createElement("div", {className: "btn-group btn-group-justified"}, 							
								this.createButtons()
							)
						);
			}
		},
		createButtons:function(){
			var results = [];
			_.each(this.props.buttons,function(item){
				results.push(React.createElement("a", {href: "javascript:;", className: "btn btn-default", onClick: item.handle}, item.text));
			});
			return results;
		}
	})
});