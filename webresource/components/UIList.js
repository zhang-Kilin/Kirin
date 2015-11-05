define('UIList',['react','react-dom','UILayerList','jsx.UIList'],function(React,ReactDOM,UILayerList,UIList){
	var $super = UILayerList.prototype;
	return UILayerList.extend({
		getDefaults:function(){
			var defaults = $super.getDefaults.apply(this,arguments);
			return _.extend(defaults,{
				onselect:$.proxy(this._onselect,this),
				oncancel:$.proxy(this.hide,this)
			});
		},
		createElement:function(){
			return React.createElement(UIList, React.__spread({},  this.options), this.options.children);
		},
		_onselect:function(item){
			this.trigger('select',item);
			this.hide();
		}
	});
})