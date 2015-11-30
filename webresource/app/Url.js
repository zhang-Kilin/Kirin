/*
	url的代理类
	api: param
	
	属性：
		hash: "",//#index
		host: "",//"localhost:8089"
		hostname: "",//"localhost"
		href: "",//"http://localhost:8089/index.html"
		origin: "",//"http://localhost:8089"
		pathname: "",///index.html"
		relativepath:"",// index.html
		root:"/",// /website/
		port: "",//"8089"
		protocol: "",//"http:",
		search:""//?p=123&h=5

	//读取当前url对象中的参数
	//@param {string} name 参数名
	//@example 
	//	var url = new Url('http://localhost:8089/index.html?t=7897#tfds');
	//	var t = url.param('t');
	//	t ==> 7897
	param:function(name){}
*/
define('Url',[],function(){
	//
	var Url = function(path){
		var result = {
				hash: "",//#index
				host: "",//"localhost:8089"
				hostname: "",//"localhost"
				href: "",//"http://localhost:8089/website/index.html"
				origin: "",//"http://localhost:8089"
				pathname: "",// /website/index.html"
				relativepath:"",// index.html
				root:"/",// /website/
				port: "",//"8089"
				protocol: "",//"http:",
				search:""//?p=123&h=5
			},
			App = require('Application'),
			arr,
			index,
			match;

		if (!/^https?\:\/\//i.test(path)) {
			path = path || '';
			path = Url.resolve(path);
			if (window && window.location) {
				path = window.location.origin + path;
			};
		};
		result.root = App.root;
		result.href = path;
		if (/\#/.test(path)) {
			index = path.indexOf('#');
			result.hash = path.substr(index);
			path = path.substring(0,index);
		}
		if (/\?/.test(path)) {
			index = path.indexOf('?');
			result.search = path.substr(index);
			path = path.substring(0,index);
		};
		// arr = arr[0].split('?');
		// result.search = arr[1] ? '?'+arr[1] : '';
		match = path.match(/(?:(https?):\/\/([^\/]+))?(.+)/i);
		if (match) {
			result.host = match[2] || '';
			result.protocol = match[1] ? match[1] + ':' : '';
			result.pathname = match[3];
			result.origin = result.protocol + '://' + result.host;
			arr = result.host.split(':');
			result.hostname = arr[0] || '';
			result.port = arr[1] || '';
		}else{
			result.pathname = path;
		}

		result.relativepath = result.pathname.substr(result.root.length);

		_.extend(this,result);
		result = arr = match = null;
	};

	//读取当前url对象中的参数，如果name参数为空，则读取所有参数列表
	//@param {string} name 参数名
	//@example 
	//	var url = new Url('http://localhost:8089/index.html?t=7897#tfds');
	//	var t = url.param('t');
	//	t ==> 7897
	Url.prototype.param = function(name){
		if (!this._params) {
			//参数解析
			this._params = {};
			if (this.search) {
				arr = this.search.substr(1).split('&');
				_.each(arr,$.proxy(function(item){
					match = item.split('=');
					this._params[match[0]] = match[1] || '';
				},this));
			};
		};
		return name ? this._params[name] : this._params;
	};

	//根据给定的相对地址，计算实际地址
	//@param {string} relativePath 相对的url地址
	//@example 'index' ==> '/index'
	Url.resolve = function(relativePath){
		var root = require('Application').root,
			baseArr,
			arr,
			url = relativePath;
		if (url.indexOf(root) == 0) {
			return url.substr(root.length - 1);
		} else if (url.indexOf('/') == 0) {
			return url;
		}

		url = root + url;
		arr = url.split('/');
		baseArr = [];
		_.each(arr, function(value) {
			switch (value) {
				case '..':
					baseArr.pop();
					break;
				case '.':
					break;
				default:
					baseArr.push(value);
					break;
			}
		});
		url = baseArr.join('/');
		return url.indexOf('/') == 0 ? url : '/' + url;
	};

	// Url.root = '/';

	return Url;
})