define('List', ['Component', 'react', 'react-dom', 'jsx.UIList'], function(Component, React, ReactDOM, UILIst) {
	var $super = Component.prototype;
	return Component.extend({
		getDefaults:function(){
			var defaults = $super.getDefaults.apply(this,arguments);
			return _.extend(defaults,{
				backdrop: true,
				keybord: true,
				onselect: $.proxy(this._selectAction, this),
				oncancel: $.proxy(this._cancelAction, this)
			});
		},
		render: function() {
			var factory = React.createFactory(UILIst);
			this.node = React.render(factory(this.options), this.$el[0]);
			$super.render.apply(this,arguments);
		},
		show: function(items, selectHandle, cancelHandle) {
			items = {
				children:items
			};
			$super.show.call(this,items);
			_.isFunction(selectHandle) && this.on('select.list.component',selectHandle,this);
			_.isFunction(cancelHandle) && this.on('cancel.list.component',cancelHandle,this);
			return this;
		},
		hide:function(){
			$super.hide.apply(this,arguments);
			this.off('select.list.component');
			this.off('cancel.list.component');
			return this;
		},
		setProps:function(props){
			$super.setProps.apply(this,arguments);
			this.node.setProps(props);
			return this;
		},
		_selectAction: function(item) {
			this.trigger('select.list.component',item);
		},
		_cancelAction: function() {
			this.trigger('cancel.list.component');
			this.hide();
		}
	});
});