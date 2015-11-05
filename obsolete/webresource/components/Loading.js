define('Loading', ['react', 'react-dom', 'Component', 'jsx.UILoading'], function(React, ReactDOM, Component, UILoading) {
	var $super = Component.prototype;

	var view = Component.extend({
		initialize:function(){
			$super.initialize.apply(this,arguments);
			this.timer = null;
		},
		render: function() {
			var factory = React.createFactory(UILoading);
			this.node = ReactDOM.render(factory(this.options), this.$el[0]);
			return this;
		},
		show: function(options, duration, callback) {
			if (_.isFunction(duration)) {
				callback = duration;
				duration = null;
			}
			if (_.isFunction(options)) {
				callback = options;
				options = duration = null;
			} else if (options && !isNaN(options) && options > 0) {
				duration = options;
				options = null;
			}
			
			$super.show.apply(this, arguments);
			
			if(_.isFunction(callback)){
				this.once('hidden.loading.component',callback,this);
			}
			if(duration && duration > 0){
				this.timer = setTimeout($.proxy(this.hide,this),duration);
			}
			return this;
		},
		setProps: function(props) {
			this.node.setProps(props);
			return this;
		},
		hide:function(){
			clearTimeout(this.timer);
			$super.hide.apply(this,arguments);
			this.trigger('hidden.loading.component');
			return this;
		}
	});
	return view;
});