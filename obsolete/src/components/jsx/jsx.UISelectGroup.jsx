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
		oncancel:function(){},
		onitemchange:function(){}
	};
	var UISelectGroup = React.createClass({
		getDefaultProps: function() {
			return _.extend({},defaultProps);
		},
		getInitialState: function() {
			return {};
		},
		componentDidMount:function(){
		},
		shouldComponentUpdate:function(nextProps,nextState){
			this.refs["UILayerList"].setState(nextState);
		},
		render:function(){
			return <UILayerList {...this.props} ref="UILayerList">
						<div className="select-group">
							{this.createToolbar()}
							{this.createBody()}
						</div>
					</UILayerList>;
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
				_.each(this.props.children,$.proxy(function(item,index){
					this.results = this.results || [];
					this.results[index] = this.findDefaultResult(item);
					results.push(<div className="cell"><UISelect index={index} onchange={this.onitemchange}>{item}</UISelect></div>)
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
				delete item.selected;
			}
			return item;
		},
		cancel:function(){
			_.isFunction(this.props.oncancel) && this.props.oncancel();
		},
		ok:function(){
			_.isFunction(this.props.onchange) && this.props.onchange(this.results,this.props.children,this.props);
		},
		onitemchange:function(item,items,props){
			this.results[props.index] = item;
			_.isFunction(this.props.onitemchange) && this.props.onitemchange(item,props.index); 
		}
	});
	
	UISelectGroup.TRANSACTION_DURATION = 150;
	return UISelectGroup;
});