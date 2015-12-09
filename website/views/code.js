define(['react','react-dom','View'],function(React,ReactDOM,View){
	return View.extend({
		render:function(model){
			ReactDOM.render(React.createElement("div", null, 
								React.createElement("section", null, React.createElement("h2", null, model.path)), 
								React.createElement("article", null, React.createElement("pre", {className: model.type}, model.code))
							),this.el);
		}
	});
});