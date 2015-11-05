define('UIHeader', ['react', 'react-dom', 'ComponentBase', 'jsx.UIHeader'], function(React, ReactDOM, ComponentBase, UIHeader) {
	return ComponentBase.extend({
		initialDocumentElement:function(){
			this.$el = $('#header');
			
		},
		getDefaults:function(){
			return {
				show:true
			};
		},
		render:function(){
			
		}
	});
});