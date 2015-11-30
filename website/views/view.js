define(['react','react-dom','View','jsx.Example'],function(React,ReactDOM,ViewBase,Example){
	var View = ViewBase.extend({
		render:function(model){
			ReactDOM.render(React.createElement("div", null, 
				_.map(model.data,function(item){
					item.children && (item.children = new Function(item.children)());
					return React.createElement(Example, React.__spread({},  item));
				})
			),this.el);
		}
	});
	return View;
});