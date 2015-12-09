// define([],function(){
// 	return {
// 		//key:url_schema，配置规则详见 http://www.css88.com/doc/backbone/#Router
// 		//value:controller name，默认取controllers目录的文件名
// 		'':'index',
// 		'index':'index'
// 	};
// });
define([],function(){
	// return {
	// 	'':'index',
	// 	'index':'index',
	// 	'index/:page':'index'
	// };

	return {
		'index':{
			url_schema:['','index','/','index/:page'],
			controller:'index'
		}
	}
})