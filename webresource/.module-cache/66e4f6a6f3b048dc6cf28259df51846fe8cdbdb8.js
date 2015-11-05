/* 
 * @description 下拉选择框
 * @author zhanghh@ctrip.com
 * @createtime 2015-11-02
 * @version 0.1
 * @modify
 * 		zhanghh@ctrip 2015-11-02
 */
define('jsx.UISelectGroup', ['react','jsx.UISelect'], function(React,UISelect) {
	/*
	 * children:{
	 * 		country:[{text:'中国',value:1},{...}...],
	 * 		province:[{text:'陕西',value:1},...]
	 * 		...
	 * }
	 */
	var defaultProps = {
		toolbar:true,
		onchange: function(){},
		oncancel:function(){},
		onitemchange:function(){}
	};
	var UISelectGroup = React.createClass({displayName: "UISelectGroup",
		getDefaultProps: function() {
			return _.extend({},defaultProps);
		},
		getInitialState: function() {
			return {};
		},
		componentDidMount:function(){
		},
//		shouldComponentUpdate:function(nextProps,nextState){
//			this.refs["UILayerList"].setState(nextState);
//		},
		render:function(){
			return React.createElement("div", {className: "select-group"}, 
						this.createToolbar(), 
						this.createBody()
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
				_.each(this.props.children,$.proxy(function(item,key){
					this.results = this.results || {};
					this.results[key] = this.findDefaultResult(item);
					results.push(React.createElement("div", {className: "cell"}, React.createElement(UISelect, {name: key, onchange: this.onitemchange}, item)))
				},this));
			}
			return results;
		},
		findDefaultResult:function(items){
			var item = null;
			item = _.find(items,function(obj){
				return obj.selected;
			});
			if(!item && items.length > 0){
				item = items[0];
			}
			if(item){
				item = _.extend({},item);
//				delete item.selected;
			}
			return item;
		},
		cancel:function(){
			_.isFunction(this.props.oncancel) && this.props.oncancel();
		},
		ok:function(){
			_.isFunction(this.props.onchange) && this.props.onchange(this.results,this.itemsResults,this.props);
		},
		onitemchange:function(item,items,props){
			this.itemsResults = this.itemsResults || [];
			this.itemsResults[props.index] = items;
			this.results[props.index] = item;
			_.isFunction(this.props.onitemchange) && this.props.onitemchange(item,props.index,items,props); 
		},
		value:function(){
			return this.results;
		}
	});
	
	return UISelectGroup;
});