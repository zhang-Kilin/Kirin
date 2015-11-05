define('jsx.UIList',['react','jsx.UILayerList'],function(React,UILayerList){
	//children:['数据1','数据2']
	//children:[{text:'数据1',value:1},{text:'数据2',value:2}]
	var UIList = React.createClass({displayName: "UIList",
		getDefaultProps:function(){
			return {
				cancelText:'取消',
				onselect:function(){},
				oncancel:function(){}
			};
		},
		render:function(){
			return React.createElement(UILayerList, React.__spread({},  this.props), 
						React.createElement("div", {className: "btn-group-vertical", onClick: this.selectHandle}, 
							this.createItems()
						), 
						React.createElement("div", {className: "layerlist-footer btn-group btn-group-justified", onClick: this.cancelHandel}, 
							React.createElement("a", {href: "javascript:;", className: "btn btn-lg btn-warning"}, this.props.calcelText)
						)
					);
		},
		cancelHandle:function(){
			_.isFunction(this.props.oncancel) && this.props.oncancel();
		},
		selectHandle:function(e){
			var index = $(e.target).attr('data-index');
			if(index){
				index = parseInt(index);
				_.isFunction(this.props.onselect) && this.props.onselect(this.props.children[index]);
			}
		},
		createItems:function(){
			var results = [];
			if(this.props.children && this.props.children.length){
				_.each(this.props.children,function(item,i){
					results.push(React.createElement("a", {href: "javascript:;", "data-index": i, className: "btn btn-lg btn-default"}, typeof item === 'string'? item : item.text));
				});
			}
			return results;
		}
	});
	
	return UIList;
});