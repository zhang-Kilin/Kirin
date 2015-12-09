define('UIHeader', ['react', 'react-dom', 'ComponentBase', 'jsx.UIHeader'], function(React, ReactDOM, ComponentBase, UIHeader) {
	return ComponentBase.extend({
		initialDocumentElement:function(){
			this.$el = this.options.render ? $(this.options.render) : $('#header');
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
			if (_.isObject(title)) {
				handles = title.handles;
				toolbar = title.toolbar;
				title = title.title;
			};
			
			var props = {
				title:title,
				toolbar:toolbar || this.options.toolbar || [],
				handles:_.extend({}, this.options.handles, handles)
			};
			$.extend(true,this.options,{
				show:true,
				title:title,
				toolbar:toolbar,
				handles:handles
			});
			this.render();
			// this.Component.show();
			this.trigger('shown');
		},
		hide:function(){
			this.Component.hide();
			this.trigger('hidden');
		}
	});
});