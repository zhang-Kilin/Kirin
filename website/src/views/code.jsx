define(['react','react-dom','View'],function(React,ReactDOM,View){
	return View.extend({
		render:function(model){
			ReactDOM.render(<div>
								<section><h2>{model.path}</h2></section>
								<article><pre className={model.type}>{model.code}</pre></article>
							</div>,this.el);
		}
	});
});