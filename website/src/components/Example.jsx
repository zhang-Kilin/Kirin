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
			return <div className="example">
						<div className="example-title">
							<h2>{this.props.title}</h2>
						</div>
						<p className="example-description" ref="description">
							
						</p>
						<div className="example-content">
							<div className="example-model">
								{this.props.children}
							</div>
							<div className="example-code">
								<pre>
{this.props.code}
								</pre>
							</div>
						</div>
						<div className="example-footer" onClick={this.toggle}>
							<a href="javascript:;" className="example-btn">show code</a>
						</div>
					</div>;
		},
		toggle:function(e){
			$(e.currentTarget).prev().find('.example-code').slideToggle(200);
		}
	});
});