define('Confirm', ['Alert'], function(Alert) {
	var $super = Alert.prototype;
	return Alert.extend({
//		initialize: function(options) {
//			$super.initialize.apply(this, arguments);
//			this.DEFAULTS = _.extend({}, this.DEFAULTS, {
//				buttons: [{
//					text: '确认',
//					handle: $.proxy(this._onOKAction, this)
//				}, {
//					text: '取消',
//					handle: $.proxy(this._onCancelAction, this)
//				}],
//				onkeybord: $.proxy(this._onKeybord, this)
//			});
//			this.options = _.extend({}, this.options, this.DEFAULTS, options);
//		},
		getDefaults: function() {
			var defaults = $super.getDefaults.apply(this, arguments);
			return $.extend(defaults, {
				buttons: [{
					text: '确认',
					handle: $.proxy(this._onOKAction, this)
				}, {
					text: '取消',
					handle: $.proxy(this._onCancelAction, this)
				}],
				onkeybord: $.proxy(this._onKeybord, this)
			}, true);
		},
		_onOKAction: function() {
			this.trigger('ok.confirm.component');
		},
		_onCancelAction: function() {
			this.trigger('cancel.confirm.component');
		},
		_onKeybord: function() {
			this._onCancelAction();
			this.hide();
		},
		show: function(content, okHandle, cancelHandle) {
			$super.show.call(this, content, function() {
				this.off('ok.confirm.component');
				this.off('cancel.confirm.component');
			});
			cancelHandle && _.isFunction(cancelHandle) && this.on('cancel.confirm.component', cancelHandle, this);
			okHandle && _.isFunction(okHandle) && this.on('ok.confirm.component', okHandle, this);
		}
	});
});