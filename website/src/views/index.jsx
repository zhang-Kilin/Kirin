define(['react','react-dom','View'],function(React,ReactDOM,View){
	return View.extend({
		render:function(model){
			ReactDOM.render(<section>
								{this.createPackageElement(model)}
								{this.createReleaseElement(model)}
								{this.createModulesElement(model)}
								{this.createFileListElement(model)}
							</section>,this.el);
		},
		createFileListElement:function(model){
			var files = [],children,author,title=this.getTitle(model);
			model && model.package && (files = model.package.files,author=model.package.author);
			children = _.map(files,function(item){
				return <section>
							<h2>{item.path}</h2>
							<article>
								<div className="container-overview">
									<div className="description">
										{item.description}										
									</div>
									<dl className="details">
										<dt className="tag-version">Version:</dt>
										<dd className="tag-version">
											<ul className="dummy">
												<li>{item.version}</li>
											</ul>
										</dd>
										<dt className="tag-version">Updatetime:</dt>
										<dd className="tag-version">
											<ul className="dummy">
												<li>{item.updatetime}</li>
											</ul>
										</dd>
										<dt className="tag-version">Author:</dt>
										<dd className="tag-version">
											<ul className="dummy">
												<li>{item.author || author}</li>
											</ul>
										</dd>
									</dl>
								</div>
							</article>
						</section>;
			});
			return <div className="filelist">
						<h2>{title} 文件列表</h2>
						{children}
					</div>;
		},
		createModulesElement:function(model){
			var modules = '',
				title = this.getTitle(model);
			model && (modules = model.modules);
			return [
					<h2>{title} 模块列表</h2>,
					<pre className="javascript">{modules}</pre>
					];
		},
		createReleaseElement:function(model){
			var release = [],
				title = this.getTitle(model),
				results = [];
			model && (release = model.release);
			results = _.map(release,$.proxy(function(item){
				return <li>
							<span className="title">{item.title}</span>
							{this.createReleaseOLChildren(item.children)}
						</li>;
			},this));
			return <article className="readme">
						<h1>{title} 升级列表</h1>
						<ol>{results}</ol>
					</article>;
		},
		createReleaseOLChildren:function(children){
			return _.map(children,function(item){
				return <blockquote>
							<p>{item}</p>
						</blockquote>;
			});
		},
		createPackageElement:function(model){
			var package,
				title = this.getTitle(model);
			model && (package = model.package);
			if (!package) {
				return;
			};
			return <article className="readme">
						<h1>{title}</h1>
						<h4>Version:</h4>
						<ul className="dummy">
							<li>
								<p>{package.version}</p>
							</li>
						</ul>
						<h4>Author:</h4>
						<ul className="dummy">
							<li>
								<p>{package.author}</p>
							</li>
						</ul>
						<blockquote>
							<p>{package.description}</p>
						</blockquote>
					</article>;
		},
		getTitle:function(model){
			var title;
			if (model && model.package) {
				title = model.package.name + model.package.version;
			};
			return title || '';
		}
	});
});