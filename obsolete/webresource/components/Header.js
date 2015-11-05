define('Header',['react','react-dom','ComponentBase','jsx.UIHeaderContainer'],function(React,ReactDOM,ComponentBase,UIHeader){
	var $super = ComponentBase.prototype;
	return ComponentBase.extend({
//		initialize:function(options){
//			$super.initialize.apply(this,arguments);
//			_.extend(this.DEFAULTS,{
//				show:true,
//				title:'',
//				toolbar:[],
//				handles:{}
//			});
//			_.extend(this.options,this.DEFAULTS,options);
//			_.extend(this.options.handles,(options || {}).handles);
//			this.$el = $('#header');
//		},
		getDefaults:function(){
			var defaults = $super.getDefaults.apply(this,arguments);
			return $.extend(defaults,{
				show:true,
				title:'',
				toolbar:[],
				handles:{}
			},true);
		},
		initialDocumentElement:function(){
			this.$el = $('#header');
		},
		render:function(){
			var factory = React.createFactory(UIHeader);
			this.node = ReactDOM.render(factory(this.options),this.$el[0]);
			return this;
		},
		show:function(title,toolbar,handles){
			var props = {
				title:title,
				toolbar:toolbar || this.options.toolbar || [],
				handles:$.extend({}, this.options.handles, handles)
			};
			$super.show.call(this,props);
			return this;
		},
		setProps:function(props){
			this.node.setProps(props);
			$super.setProps.apply(this,arguments);
			return this;
		}
	});
});