define('UIList',['react','react-dom','UILayerList','jsx.UIList'],function(React,ReactDOM,UILayerList,UIList){
	var $super = UILayerList.prototype;
	return UILayerList.extend({
		initialize:function(){
			$super.initialize.apply(this,arguments);
			//proxy
			this.options.onselect = $.proxy(this.options.onselect,this);
			this.options.oncancel = $.proxy(this.options.oncancel,this);
			this.options.renderItem = $.proxy(this.options.renderItem,this);			
		},
		getDefaults:function(){
			var defaults = $super.getDefaults.apply(this,arguments);
			return _.extend(defaults,{
				onselect:this._onselect,
				oncancel:this.hide,
				renderItem:null
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