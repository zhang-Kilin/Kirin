define('UILayerList',['react', 'react-dom', 'jsx.UILayerList','Component'],function(React,ReactDOM,UILayerList,Component){
	var $super = Component.prototype;
	return Component.extend({
		initialize:function(options){
			var fade = (options || {}).fade,
				defaults = this.getDefaults();			
			fade = typeof fade === 'undefined' ? defaults.fade : fade;
			this._layoutOptions = {
				fade:fade,
				onhide:$.proxy(this._onhide,this),
				onshow:$.proxy(this._onshow,this)
			};
			$super.initialize.apply(this,arguments);
		},
		render: function() {
			$super.render.apply(this,arguments);
			this.Component = ReactDOM.render(<UILayerList {...this._layoutOptions}>{this.createElement()}</UILayerList>,this.$el[0]);
		},
		createElement:function(){},
		show: function() {
			$super.show.apply(this,arguments);
			this.Component.show();
		},
		hide: function() {
			$super.hide.apply(this,arguments);
			this.Component.hide();
		},
		_onhide:function(){
			this.trigger('hidden');
		},
		_onshow:function(){
			this.trigger('shown');
		}
	});
});