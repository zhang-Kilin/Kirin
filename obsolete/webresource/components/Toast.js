define('Toast', ['react', 'react-dom', 'Component', 'jsx.UIToast'], function(React, ReactDOM, Component, UIToast) {
	var $super = Component.prototype;
	return Component.extend({
		initialize: function(options) {
			$super.initialize.apply(this, arguments);
			this.timer = null;
		},
		getDefaults: function() {
			var defaults = $super.getDefaults.apply(this, arguments);
			return _.extend(defaults, {
				backdrop: true,
				keybord: true,
				duration: 2
			});
		},
		render: function() {
			var factory = React.createFactory(UIToast);
			this.node = ReactDOM.render(factory(this.options), this.$el[0]);
			$super.render.apply(this, arguments);
			return this;
		},
		show: function(content, duration, callback) {
			if (!content) {
				return this;
			}
			if (typeof content === 'string') {
				content = {
					children: content
				};
			}
			$super.show.call(this, content);

			if (_.isFunction(duration)) {
				callback = duration;
				duration = this.options.duration;
			}
			callback && _.isFunction(callback) && this.once('hidden.toast.component', callback, this);
			if (duration && duration > 0) {
				this.timer = setTimeout($.proxy(this.hide, this), duration * 1000);
			}

			return this;
		},
		setProps: function(props) {
			this.node.setProps(props);
			return this;
		},
		hide: function() {
			clearTimeout(this.timer);
			$super.hide.apply(this, arguments);
			this.trigger('hidden.toast.component');
			return this;
		}
	});
});