define(['react','react-dom','ViewBase'],function(React,ReactDOM,ViewBase){
	return ViewBase.extend({
		render:function(model){
			ReactDOM.render(<h1>TEST</h1>,this.el);
		}
	});
});