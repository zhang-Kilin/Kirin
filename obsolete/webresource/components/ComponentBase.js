define('ComponentBase', [], function(React, ReactDOM) {
	var view = _.extend({}, Backbone.Event, {
		initialize: function(options) {
			this.DEFAULTS = this.getDefaults();
			this.options = $.extend({}, this.DEFAULTS, options, true);
			this.status = 'init';
			this.props = null;
			this.initialDocumentElement();
		},
		getDefaults: function() {
			return {
				show: false,
				fade: true
			};
		},
		initialDocumentElement: function() {
			this.$el.appendTo('#components');
		},
		render: function() {},
		setProps: function(props) {},
		setState: function(state) {},
		_createProps: function(props) {
			return _.extend({}, props, {
				onshow: $.proxy(this._onshow, this),
				onhide: $.proxy(this._onhide, this)
			});
		},
		_onshow: function() {
			if (_.isFunction(this.props.onshow)) {
				this.props.onshow.call(this);k
			}
		},
		_onhide: function() {
			if (_.isFunction(this.props.onhide)) {
				this.props.onhide.call(this);
			}
			this.reset();
		},
		show: function(options) {
			if (this.status == 'init') {
				this.render();
				this.status = 'render';
			}
			if (options) {
				this.props = _.extend({}, options);

				options = this._createProps(this.props);

				this.setProps(options);
			}
			
			this.setState({
				show: true
			});
			return this;
		},
		hide: function() {
			if (this.status != 'render') {
				throw new Error('组件尚未被渲染或已经销毁，请先调用show进行渲染');
			}
			this.setState({
				show: false
			});
			return this;
		},
		_reset: function(options) {
			if (this.status != 'render') {
				throw new Error('组件尚未被渲染或已经销毁，请先调用show进行渲染');
			}
			this.setProps(options);

			return this;
		},
		reset: function() {
			this._reset(this.options);

			return this;
		},
		destroy: function() {
			this.status = 'destroy';
			this.$el.remove();
			return this;
		}
	});

	return Backbone.View.extend(view);
});