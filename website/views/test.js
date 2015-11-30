define(['react','react-dom','ViewBase'],function(React,ReactDOM,ViewBase){
	return ViewBase.extend({
		render:function(model){
			ReactDOM.render(React.createElement("h1", null, "TEST"),this.el);
		}
	});
});