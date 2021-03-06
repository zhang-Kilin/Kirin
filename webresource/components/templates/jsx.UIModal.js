/* 
 * @description 模态窗体
 * @author zhanghh@ctrip.com
 * @createtime 2015-10-27
 * @version 0.1
 * @modify
 * 		zhanghh@ctrip 2015-10-27
 */
define('jsx.UIModal',['react'],function(React){
	return React.createClass({
		getDefaultProps:function(){
			return {
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
				]
			};
		},
		getInitialState:function(){
			return {};
		},
		render:function(){
			return React.createElement("div", {className: "layer-container ui-modal"}, 
						this.createHeader(), 
						React.createElement("div", {className: "modal-body"}, 
							this.props.children
						), 
						this.createFooter()
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
			return _.map(this.props.buttons,function(item){
				var fn = (function(i){
					return function(e){
						_.isFunction(i.handle) && i.handle(e);
					}
				})(item);
				return React.createElement("a", {href: "javascript:;", className: "btn btn-default", onClick: fn}, item.text);
			});
		}
	})
});