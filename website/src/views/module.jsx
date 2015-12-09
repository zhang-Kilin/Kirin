define(['react','react-dom','View','Url'],function(React,ReactDOM,View,Url){
	return View.extend({
		render:function(model){
			ReactDOM.render(<div>
								{this.createElement(model.data)}
							</div>,this.el);
		},
		createElement:function(model){
			if (!model) {
				return;
			};
			var keys = _.keys(model),
				results = [];
			_.each(keys,$.proxy(function(key){
				switch(key){
					case "name":
						results = results.concat(this.createHeaderElement(model));
						break;
					case "see":
						results = results.concat(this.createSeeElement(model));
						break;
					case "img":
						results = results.concat(this.createImgElement(model));
						break;
					case "apis":
						results = results.concat(this.createApiElements(model));
						break;
					case "example":
						var exam = this.createCodeElement(model[key]);
						exam && (results = results.concat(exam));
						break;
				}
			},this));
			return results;
		},
		createImgElement:function(model){
			if (!model || !model.img) {
				return;
			};
			var url = new Url(model.img);
			return [<img src={url.href} />];
		},
		createSeeElement:function(model){
			if (!model || !model.see) {
				return;
			};
			var see = new Url(model.see).href;
			return [<article>
						<dl className="details">
						    <dt className="tag-see">See:</dt>
						    <dd className="tag-see">
						        <ul>
						            <li><a href={see} target="_blank">{see}</a></li>
						        </ul>
						    </dd>
						</dl>
					</article>];
		},
		createHeaderElement:function(model){
			if (!model) {
				return;
			};
			return [
					<section><header><h2>{model ? model.name : ''}</h2></header></section>,
					<article>
						<div className="container-overview">
							<div className="description">
								{this.createDescriptionElement(model.file.description)} <strong><a href="javascript:;" onClick={$.proxy(this.navCode,this)}>查看源码</a></strong>
							</div>
						</div>
						<dl className="details"></dl>
					</article>
				];
		},
		createDescriptionElement:function(description){
			if (!description) {
				return;
			};
			var //linkReg = /\[link=([^\]]+)\](.+?)\[\/link\]/ig,
				linkReg = /\[([^\]]+?)(?:\=([^\]]+))*?\](.+?)\[\/([^\]]+)\]/ig,
				arr = description.split(linkReg),
				results = [],
				param,
				tag,
				des;
			for (var i = 0; i < arr.length; i++) {
				if (i % 5 == 1) {
					tag = arr[i];
					switch(tag){
						case 'link':
							param = arr[i+1];
							des = arr[i+2];
							results.push(<strong><a href="javascript:;" data-link={param} onClick={$.proxy(this.link,this)}>{des}</a></strong>);
							break;
						default:
							results.push(React.createElement(tag,null,arr[i+2]));
							break;
					}
					i+=3;
				}else{
					results.push(<span>{arr[i]}</span>);
				}
			};
			return results;
		},
		createApiElements:function(model){
			if (!model) {
				return;
			};
			var keys = _.keys(model.apis),
				results;
			return _.map(keys,$.proxy(function(key){
				return <article>
							<h3 className="subsection-title">{key}</h3>
							<dl>{this.createMembersElements(model.apis[key])}</dl>
						</article>;
			},this));
		},
		createMembersElements:function(member){
			var results = [],
				keys = _.keys(member),
				exam;
			_.each(keys,$.proxy(function(key){
				results = results.concat(this.createApiBodyElements(key,member[key]));
				exam = this.createCodeElement(member.example);
				exam && (results = results.concat(exam));
				exam = null;
			},this));
			return results;
		},
		createApiBodyElements:function(name,api){
			return [
				<dt>
					<div className="nameContainer">
						<h4 className="name">
							{this.createQualifierElement(api)}
							{name}
							<span className="signature">{api.arguments}</span>
							{this.createReturnTypeElement(api)}
						</h4>
					</div>
				</dt>,
				<dd>
					<div className="description">
						<p>{this.createDescriptionElement(api.description)}</p>
					</div>
					{this.createDefaultValueElement(api)}
					{this.createParameterElements(api.parameters)}
				</dd>,
				this.createCodeElement(api.example)
			];
		},
		createQualifierElement:function(api){
			if (!api.qualifier) {
				return;
			};
			return <span className="type-signature static">{api.qualifier}</span>;
		},
		createReturnTypeElement:function(api){
			if (!api.returnType) {
				return;
			};
			return <span className={"type-signature type " + api.returnType}>{api.returnType}</span>;
		},
		createDefaultValueElement:function(api){
			if (!_.has(api,'default')) {
				return;
			};
			return <dl className="details">
						<dt className="tag-default">Default Value:</dt>
						<dd className="tag-default">
							<ul className="dummy"><li><code>{JSON.stringify(api.default)}</code></li></ul>
						</dd>
					</dl>;
		},
		createParameterElements:function(parameter){
			if (!parameter) {
				return;
			};
			return <table className="params">
						<tr>
							<th>Name</th>
							<th>Type</th>
							<th className="last">Description</th>
						</tr>
						{this.createParameterBodyElements(parameter)}
					</table>;
		},
		createParameterBodyElements:function(parameter){
			var keys = _.keys(parameter);
			return _.map(keys,$.proxy(function(key){
				return <tr>
							<td className="name"><code>{key}</code></td>
							<td className="type"><span className="param-type">{parameter[key].type}</span></td>
							<td className="description last">
								<p>{this.createDescriptionElement(parameter[key].description)}</p>
								{this.createParameterElements(parameter[key].parameters)}
							</td>
						</tr>;
			},this));
		},
		createCodeElement:function(example){
			if (!example) {
				return;
			};
			var title;
			if (example.exec) {
				title = <h3>
							Example 
							<a className="run btn btn-success btn-sm" href="javascript:;" data-code={example.code} onClick={$.proxy(this.execCode,this)}>Run</a>
							<div className="clearfix"></div>
						</h3>;
			}else{
				title = <h3>Example</h3>;
			};
			return [<div className="example-code-container">
						{title}
						<pre className={example.type}>{example.code}</pre>
					</div>];
		},
		execCode:function(e){
			var code = $(e.currentTarget).attr('data-code');
			if (code) {
				eval(code);
			};
		},
		link:function(e){
			var link = $(e.currentTarget).attr('data-link');
			if (link) {
				this.navigate(link);
			};
		},
		navCode:function(){
			var data = this.model.data,
				name = data.name,
				path = data.file.path,
				type = 'javascript';
			this.navigate('code?name='+name+'&path='+encodeURIComponent(path)+'&type='+type);
		}
	});
});