/* 
 * @description 下拉选择框
 * @author zhanghh@ctrip.com
 * @createtime 2015-11-02
 * @version 0.1
 * @modify
 * 		zhanghh@ctrip 2015-11-02
 */
define('jsx.UISelectGroup', ['react','jsx.UILayerList','jsx.UISelect'], function(React,UILayerList,UISelect) {
	/*
	 * children:[
	 * 		[{text:'中国',value:1},{...}...],
	 * 		...
	 * ]
	 */
	var defaultProps = {
		fade: true,
		show:false,
		toolbar:true,
		onchange: function(){},
		oncancel:function(){}
	};
	var UISelectGroup = React.createClass({displayName: "UISelectGroup",
		getDefaultProps: function() {
			return _.extend({},defaultProps);
		},
		getInitialState: function() {
			return {};
		},
		render:function(){
			return React.createElement(UILayerList, React.__spread({},  this.props), 
						React.createElement("div", {className: "select-group"}, 
							this.createToolbar(), 
							this.createBody()
						)
					);
		},
		createToolbar:function(){
			if(this.props.toolbar){
				return React.createElement("div", {className: "toolbar"}, 
							React.createElement("a", {href: "javascript:;", className: "btn btn-warning btn-sm", onClick: this.ok}, "确定"), 
							React.createElement("a", {href: "javascript:;", className: "btn btn-default btn-sm", onClick: this.cancel}, "取消")
						);
			}
		},
		createBody:function(){
			return React.createElement("div", {className: "body"}, 
						this.createItems()
					);
		},
		createItems:function(){
			var results = [];
			if(this.props.children){
				_.each(this.props.children,function(item,index){
					results.push(React.createElement("div", {className: "cell"}, React.createElement(UISelect, {index: index, onchange: this.onitemchange}, item)))
				});
			}
			return results;
		},
		cancel:function(){
			
		},
		ok:function(){},
		onitemchange:function(item,items,props){
			console.log(item);
		}
	});
	
	UISelectGroup.TRANSACTION_DURATION = 150;
	return UISelectGroup;
});