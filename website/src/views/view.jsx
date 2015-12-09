define(['react','react-dom','View','jsx.Example'],function(React,ReactDOM,ViewBase,Example){
	var View = ViewBase.extend({
		render:function(model){
			ReactDOM.render(<div>{
				_.map(model.data,function(item){
					item.children && (item.children = new Function(item.children)());
					return <Example {...item}></Example>;
				})
			}</div>,this.el);
		}
	});
	return View;
});