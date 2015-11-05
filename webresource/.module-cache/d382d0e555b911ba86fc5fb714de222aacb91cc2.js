define('UIHeader', ['react', 'react-dom', 'ComponentBase', 'jsx.UIHeader'], function(React, ReactDOM, ComponentBase, UIHeader) {
	return ComponentBase.extend({
		initialDocumentElement:function(){
			this.$el = $('#header');
			this.el = this.$el[0];
		},
		getDefaults:function(){
			return {
				render:null,
				show:true,
				title:'',
				toolbar:[],
				handles:{}
			};
		},
		render:function(){
			this.Component = ReactDOM.render(React.createElement(UIHeader, React.__spread({},  this.options)),this.$el[0]);
		},
		show:function(title,toolbar,handles){
			var props = {
				title:title,
				toolbar:toolbar || this.options.toolbar || [],
				handles:_.extend({}, this.options.handles, handles)
			};
			$.extend(this.options,{
				title:title,
				toolbar:toolbar,
				handles:handles
			},true);
			this.render();
			this.Component.show();
		},
		hide:function(){
			this.Component.hide();
		}
	});
});