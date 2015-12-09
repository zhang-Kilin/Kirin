define(['react','react-dom','ViewBase','Application','jsx.UITree'],function(React,ReactDOM,ViewBase,App,UITree){
	var View = ViewBase.extend({
		initialize:function(){
			this.on('render',function(model){
				if (this.isShown) {
					var data = model.HEAD;
					data && this.setTDK(data.title,data.description,data.keywords);
					data && this.header.show(data.header);
				};

				this.renderNavigator(model);
			},this);

			this.on('rendered',function(){
				this.$el.find('pre').each(function(i,block){
					hljs.highlightBlock(block);
				});
			},this);
		},
		renderNavigator:function(model){
			var title;
			if (model && model.package) {
				title = model.package.name + model.package.version;
			};
			if (model && model.navigate) {
				ReactDOM.render(
					React.createElement('div',null,
						React.createElement('h2',null,title),
						React.createElement(UITree,{callback:this.nav},model.navigate)
					),$('#navigate')[0]);
				// ReactDOM.render(<div>
				// 					<h2>{title}</h2>
				// 					<UITree {...{callback:this.nav}}>{model.navigate}</UITree>
				// 				</div>,
				// 				$('#navigate')[0]);
			};
		},
		nav:function(item){
			item.link && App.navigate(item.link);
		}
	});
	return View;
});