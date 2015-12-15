define('UIList',['react','react-dom','UILayerList','jsx.UIList'],function(React,ReactDOM,UILayerList,UIList){
	var $super = UILayerList.prototype;
	return UILayerList.extend({
		initialize:function(){
			$super.initialize.apply(this,arguments);
			//proxy
			_.isFunction(this.options.onselect) && this.options.onselect.bind(this);
			_.isFunction(this.options.oncancel) && this.options.oncancel.bind(this);
			_.isFunction(this.options.renderItem) && this.options.renderItem.bind(this);
			// this.options.onselect = $.proxy(this.options.onselect,this);
			// this.options.oncancel = $.proxy(this.options.oncancel,this);
			// this.options.renderItem = $.proxy(this.options.renderItem,this);			
		},
		getDefaults:function(){
			var defaults = $super.getDefaults.apply(this,arguments);
			return _.extend(defaults,{
				onselect:this._onselect.bind(this),
				oncancel:this.hide.bind(this),
				renderItem:null
			});
		},
		createElement:function(){
			return <UIList {...this.options}>{this.options.children}</UIList>;
		},
		_onselect:function(item){
			this.trigger('select',item);
			// this.hide();
		}
	});
})