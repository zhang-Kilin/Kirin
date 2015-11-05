define('Component', ['ComponentBase', 'Backdrop'], function(ComponentBase, Backdrop) {
	var $super = ComponentBase.prototype;
	return ComponentBase.extend({
		getDefaults:function(){
			var defaults = $super.getDefaults.apply(this,arguments);
			return _.extend(defaults,{
				backdrop: true,
				keybord: true,
				onkeybord:$.proxy(this.hide, this)
			});
		},
		show:function(){
			$super.show.apply(this,arguments);
			
			if(this.props.backdrop || this.options.backdrop){
				if(!this.backdrop){
					this.backdrop = new Backdrop();
				}
				
				var fade = typeof this.props.fade === 'undefined' ? this.options.fade : this.props.fade,
					keybord = typeof this.props.keybord === 'undefined' ? this.options.keybord : this.props.keybord,
					onkeybord = keybord ? this.props.onkeybord || this.options.onkeybord : false;
				
				this.backdrop.show({
					fade: fade,
					show: this.props.show,
					click: onkeybord
				});
			}
			return this;
		},
		hide: function() {
			$super.hide.apply(this, arguments);
			this.backdrop && this.backdrop.hide();
			return this;
		}
	});
});