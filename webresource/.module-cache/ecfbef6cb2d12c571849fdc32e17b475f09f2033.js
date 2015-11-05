define('UILayer',['react', 'react-dom', 'jsx.UILayer','Component'],function(React,ReactDOM,UILayer,Component){
	var $super = Component.prototype;
	return Component.extend({
		initialize:function(){
			$super.initialize.apply(this,arguments);
			this._layoutOptions = {
				fade:this.options.fade,
				onhide:$.proxy(this._onhide,this),
				onshow:$.proxy(this._onshow,this)
			}; 
		},
		render: function() {
			$super.render.apply(this,arguments);
			this.Component = ReactDOM.render(React.createElement(UILayer, React.__spread({},  this._layoutOptions), this.createElement()),this.$el[0]);
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