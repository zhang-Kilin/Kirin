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
	var UISelectGroup = React.createClass({
		getDefaultProps: function() {
			return {
				toolbar:true,
				onchange: function(){},
				oncancel:function(){},
				onitemchange:function(){}
			};
		},
		getInitialState: function() {
			return {};
		},
		componentDidMount:function(){
		},
		componentWillReceiveProps:function(nextProps){
			
		},
//		shouldComponentUpdate:function(nextProps,nextState){
//			this.refs["UILayerList"].setState(nextState);
//		},
		render:function(){
			return <div className="select-group">
						{this.createToolbar()}
						{this.createBody()}
					</div>;
		},
		createToolbar:function(){
			if(this.props.toolbar){
				return <div className="toolbar">
							<a href="javascript:;" className="btn btn-warning btn-sm" onClick={this.ok}>确定</a>
							<a href="javascript:;" className="btn btn-default btn-sm" onClick={this.cancel}>取消</a>
						</div>;
			}
		},
		createBody:function(){
			return <div className="body">
						{this.createItems()}
					</div>;
		},
		createItems:function(){
			var results = [];
			if(this.props.children){
				_.each(this.props.children,$.proxy(function(item,key){
					this.results = this.results || {};
					this.results[key] = this.findDefaultResult(item);
					results.push(<div className="cell"><UISelect name={key} onchange={this.onitemchange}>{item}</UISelect></div>)
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
			this.itemsResults = this.itemsResults || {};
			this.itemsResults[props.name] = items;
			this.results[props.name] = item;
			_.isFunction(this.props.onitemchange) && this.props.onitemchange(item,props.name,items,props); 
		},
		value:function(){
			return this.results;
		}
	});
	
	return UISelectGroup;
});