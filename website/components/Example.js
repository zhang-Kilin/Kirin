define(['react','react-dom'],function(React,ReactDOM){
	return React.createClass({
		getDefaultProps:function(){
			return {
				title:'',
				description:'',
				code:''
			};
		},
		componentDidMount:function(){
			$(this.refs.description).html(this.props.description);
			var fn = new Function(this.props.code);
			fn();
		},
		render:function(){
			return React.createElement("div", {className: "example"}, 
						React.createElement("div", {className: "example-title"}, 
							React.createElement("h2", null, this.props.title)
						), 
						React.createElement("p", {className: "example-description", ref: "description"}
							
						), 
						React.createElement("div", {className: "example-content"}, 
							React.createElement("div", {className: "example-model"}, 
								this.props.children
							), 
							React.createElement("div", {className: "example-code"}, 
								React.createElement("pre", null, 
this.props.code
								)
							)
						), 
						React.createElement("div", {className: "example-footer", onClick: this.toggle}, 
							React.createElement("a", {href: "javascript:;", className: "example-btn"}, "show code")
						)
					);
		},
		toggle:function(e){
			$(e.currentTarget).prev().find('.example-code').slideToggle(200);
		}
	});
});