define(['react','react-dom','View'],function(React,ReactDOM,View){
	return View.extend({
		render:function(model){
			ReactDOM.render(React.createElement("section", null, 
								this.createPackageElement(model), 
								this.createReleaseElement(model), 
								this.createModulesElement(model), 
								this.createFileListElement(model)
							),this.el);
		},
		createFileListElement:function(model){
			var files = [],children,author,title=this.getTitle(model);
			model && model.package && (files = model.package.files,author=model.package.author);
			children = _.map(files,function(item){
				return React.createElement("section", null, 
							React.createElement("h2", null, item.path), 
							React.createElement("article", null, 
								React.createElement("div", {className: "container-overview"}, 
									React.createElement("div", {className: "description"}, 
										item.description										
									), 
									React.createElement("dl", {className: "details"}, 
										React.createElement("dt", {className: "tag-version"}, "Version:"), 
										React.createElement("dd", {className: "tag-version"}, 
											React.createElement("ul", {className: "dummy"}, 
												React.createElement("li", null, item.version)
											)
										), 
										React.createElement("dt", {className: "tag-version"}, "Updatetime:"), 
										React.createElement("dd", {className: "tag-version"}, 
											React.createElement("ul", {className: "dummy"}, 
												React.createElement("li", null, item.updatetime)
											)
										), 
										React.createElement("dt", {className: "tag-version"}, "Author:"), 
										React.createElement("dd", {className: "tag-version"}, 
											React.createElement("ul", {className: "dummy"}, 
												React.createElement("li", null, item.author || author)
											)
										)
									)
								)
							)
						);
			});
			return React.createElement("div", {className: "filelist"}, 
						React.createElement("h2", null, title, " 文件列表"), 
						children
					);
		},
		createModulesElement:function(model){
			var modules = '',
				title = this.getTitle(model);
			model && (modules = model.modules);
			return [
					React.createElement("h2", null, title, " 模块列表"),
					React.createElement("pre", {className: "javascript"}, modules)
					];
		},
		createReleaseElement:function(model){
			var release = [],
				title = this.getTitle(model),
				results = [];
			model && (release = model.release);
			results = _.map(release,$.proxy(function(item){
				return React.createElement("li", null, 
							React.createElement("span", {className: "title"}, item.title), 
							this.createReleaseOLChildren(item.children)
						);
			},this));
			return React.createElement("article", {className: "readme"}, 
						React.createElement("h1", null, title, " 升级列表"), 
						React.createElement("ol", null, results)
					);
		},
		createReleaseOLChildren:function(children){
			return _.map(children,function(item){
				return React.createElement("blockquote", null, 
							React.createElement("p", null, item)
						);
			});
		},
		createPackageElement:function(model){
			var package,
				title = this.getTitle(model);
			model && (package = model.package);
			if (!package) {
				return;
			};
			return React.createElement("article", {className: "readme"}, 
						React.createElement("h1", null, title), 
						React.createElement("h4", null, "Version:"), 
						React.createElement("ul", {className: "dummy"}, 
							React.createElement("li", null, 
								React.createElement("p", null, package.version)
							)
						), 
						React.createElement("h4", null, "Author:"), 
						React.createElement("ul", {className: "dummy"}, 
							React.createElement("li", null, 
								React.createElement("p", null, package.author)
							)
						), 
						React.createElement("blockquote", null, 
							React.createElement("p", null, package.description)
						)
					);
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