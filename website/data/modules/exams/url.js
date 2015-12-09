require(['Url'],function(Url){
	//定义一个相对路径
	var relativePath = "index.html?p=123#index";

	//解析为实际路径
	//output:/website/index.html?p=123#index
	console.log(Url.resolve(relativePath));

	//实例化Url对象
	var url = new Url(relativePath);

	//output:#index
	console.log(url.hash);

	//output:localhost:8089
	console.log(url.host);

	//output:localhost
	console.log(url.hostname);

	//output:http://localhost:8089/website/index.html?p=123#index
	console.log(url.href);

	//output:http://localhost:8089
	console.log(url.origin);

	//output:/website/index.html
	console.log(url.pathname);

	//output:index.html
	console.log(url.relativepath);

	//output:/website/
	console.log(url.root);

	//output:8089
	console.log(url.port);

	//output:http:
	console.log(url.protocol);

	//output:?p=123
	console.log(url.search);
	
	//output:123
	console.log(url.param('p'));

	//读取所有参数列表
	//output:{p:'123'}
	console.log(url.param());
});