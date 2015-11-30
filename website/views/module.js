define(['react','react-dom','View','Url'],function(React,ReactDOM,View,Url){
	return View.extend({
		render:function(model){
			ReactDOM.render(React.createElement("div", null, 
								this.createElement(model.data)
							),this.el);
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
		createSeeElement:function(model){
			if (!model || !model.see) {
				return;
			};
			var see = new Url(model.see).href;
			return React.createElement("article", null, 
						React.createElement("dl", {className: "details"}, 
						    React.createElement("dt", {className: "tag-see"}, "See:"), 
						    React.createElement("dd", {className: "tag-see"}, 
						        React.createElement("ul", null, 
						            React.createElement("li", null, React.createElement("a", {href: see, target: "_blank"}, see))
						        )
						    )
						)
					);
		},
		createHeaderElement:function(model){
			if (!model) {
				return;
			};
			return [
					React.createElement("section", null, React.createElement("header", null, React.createElement("h2", null, model ? model.name : ''))),
					React.createElement("article", null, 
						React.createElement("div", {className: "container-overview"}, 
							React.createElement("div", {className: "description"}, 
								this.createDescriptionElement(model.file.description), " ", React.createElement("strong", null, React.createElement("a", {href: "javascript:;", onClick: $.proxy(this.navCode,this)}, "查看源码"))
							)
						), 
						React.createElement("dl", {className: "details"})
					)
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
							results.push(React.createElement("strong", null, React.createElement("a", {href: "javascript:;", "data-link": param, onClick: $.proxy(this.link,this)}, des)));
							break;
						default:
							results.push(React.createElement(tag,null,arr[i+2]));
							break;
					}
					i+=3;
				}else{
					results.push(React.createElement("span", null, arr[i]));
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
				return React.createElement("article", null, 
							React.createElement("h3", {className: "subsection-title"}, key), 
							React.createElement("dl", null, this.createMembersElements(model.apis[key]))
						);
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
				React.createElement("dt", null, 
					React.createElement("div", {className: "nameContainer"}, 
						React.createElement("h4", {className: "name"}, 
							this.createQualifierElement(api), 
							name, 
							React.createElement("span", {className: "signature"}, api.arguments), 
							this.createReturnTypeElement(api)
						)
					)
				),
				React.createElement("dd", null, 
					React.createElement("div", {className: "description"}, 
						React.createElement("p", null, this.createDescriptionElement(api.description))
					), 
					this.createDefaultValueElement(api), 
					this.createParameterElements(api.parameters)
				),
				this.createCodeElement(api.example)
			];
		},
		createQualifierElement:function(api){
			if (!api.qualifier) {
				return;
			};
			return React.createElement("span", {className: "type-signature static"}, api.qualifier);
		},
		createReturnTypeElement:function(api){
			if (!api.returnType) {
				return;
			};
			return React.createElement("span", {className: "type-signature type " + api.returnType}, api.returnType);
		},
		createDefaultValueElement:function(api){
			if (!_.has(api,'default')) {
				return;
			};
			return React.createElement("dl", {className: "details"}, 
						React.createElement("dt", {className: "tag-default"}, "Default Value:"), 
						React.createElement("dd", {className: "tag-default"}, 
							React.createElement("ul", {className: "dummy"}, React.createElement("li", null, React.createElement("code", null, JSON.stringify(api.default))))
						)
					);
		},
		createParameterElements:function(parameter){
			if (!parameter) {
				return;
			};
			return React.createElement("table", {className: "params"}, 
						React.createElement("tr", null, 
							React.createElement("th", null, "Name"), 
							React.createElement("th", null, "Type"), 
							React.createElement("th", {className: "last"}, "Description")
						), 
						this.createParameterBodyElements(parameter)
					);
		},
		createParameterBodyElements:function(parameter){
			var keys = _.keys(parameter);
			return _.map(keys,$.proxy(function(key){
				return React.createElement("tr", null, 
							React.createElement("td", {className: "name"}, React.createElement("code", null, key)), 
							React.createElement("td", {className: "type"}, React.createElement("span", {className: "param-type"}, parameter[key].type)), 
							React.createElement("td", {className: "description last"}, 
								React.createElement("p", null, this.createDescriptionElement(parameter[key].description)), 
								this.createParameterElements(parameter[key].parameters)
							)
						);
			},this));
		},
		createCodeElement:function(example){
			if (!example) {
				return;
			};
			var title;
			if (example.exec) {
				title = React.createElement("h3", null, 
							"Example",  
							React.createElement("a", {className: "run btn btn-success btn-sm", href: "javascript:;", "data-code": example.code, onClick: $.proxy(this.execCode,this)}, "Run"), 
							React.createElement("div", {className: "clearfix"})
						);
			}else{
				title = React.createElement("h3", null, "Example");
			};
			return [React.createElement("div", {className: "example-code-container"}, 
						title, 
						React.createElement("pre", {className: example.type}, example.code)
					)];
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