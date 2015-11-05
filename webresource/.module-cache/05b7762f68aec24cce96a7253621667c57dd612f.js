define('UIToast',['react-dom','jsx.UIModal','UILayer'],function(ReactDOM,UIModal,UILayer){
	var $super = UILayer.prototype;
	return UILayer.extend({
		getDefaults: function() {
			return _.extend($super.getDefaults.apply(this,arguments),{
				title:'',
				fade:true,
				backdrop:true,
				buttons: [{
					text: '知道了',
					handle: $.proxy(this.hide, this)
				}]
			});
		},
		createElement:function(){
			return React.createElement(UIModal, React.__spread({},  this.options), this.options.children);
		},
		hide: function() {
			$super.hide.apply(this,arguments);
			this.trigger('hidden.alert.component');
		},
		show: function(content,title,callback) {
			if(!content){
				return this;
			}
			if(_.isFunction(title)){
				callback = title;
				title = null;
			}
			_.extend(this.options,{
				children:content,
				title:title
			});
			this.render();
			this.once('hidden.alert.component',callback,this);
			$super.show.call(this);
		}
	});
});