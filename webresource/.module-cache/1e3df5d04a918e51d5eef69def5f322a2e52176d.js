define('UIHeader', ['react', 'react-dom', 'ComponentBase', 'jsx.UIHeader'], function(React, ReactDOM, ComponentBase, UIHeader) {
	return ComponentBase.extend({
		initialDocumentElement:function(){
			this.$el = $('#header');
			this.el = this.$el[0];
		},
		getDefaults:function(){
			return {
				show:true,
				title:'',
				toolbar:[],
				handles:{}
			};
		},
		render:function(){
			
		}
	});
});