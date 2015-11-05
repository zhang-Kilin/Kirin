define('UIList',['react','react-dom','UILayerList','jsx.UIList'],function(React,ReactDOM,UILayerList,UIList){
	var $super = UILayerList.prototype;
	return UILayerList.extend({
		getDefaults:function(){
			var defaults = $super.getDefaults.apply(this,arguments);
			return _.extend(defaults,{
				onchange:$.proxy(this._onchange,this)
			});
		},
		createElement:function(){
			return React.createElement(UIList, React.__spread({},  this.options), this.options.children);
		}
	});
})