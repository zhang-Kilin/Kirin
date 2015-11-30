module.exports = {
	//webresource目录，限制所有的web资源都将在此目录下，相对于应用程序根目录
	'webresource':'webresource',
	//打包后的输出目录，相对于应用程序根目录
	'dest':'dest',
	//jsx编译配置
	'jsx':{
		//源文件目录，相对于应用程序根目录
		'src':'src',
		//编译输出目录，相对于应用程序根目录
		'build':'webresource',
		//需要编译的文件筛选条件
		//默认为 **/*.*
		'filter':'**/*.jsx'
	},
	//require配置文件路径，相对于webresource目录
	'config':'kirin.js',
	//requirejs 依赖扩展，相对于webresource的路径
	'paths':{
		'require':'libs/require',
		'underscore':'libs/underscore',
		'jquery':'libs/jquery.min',
		'backbone':'libs/backbone',
		'react':'libs/react.min',
		'react-dom':'libs/react-dom.min',
		'date-util':'libs/date-util'
	},
	// //首页地址
	// 'index':'examples/test.html',
	//要重新打包的js文件
	'modules':[
		{
			//输出文件名称，打包之后的文件名，相对于dest/webresource目录
			'name':'libs',
			// true: name指定的文件如果不存在，则自动创建，并且将被自动引用到index指定的首页中
			// false: 只做打包处理，不会自动创建文件，不会自动引入index中
			'create':true,
			//要包含的文件，相对于webresource目录
			'include':[
				'libs/require',
				'libs/underscore',
				'libs/jquery.min',
				'libs/backbone',
				'libs/date-util',
				'react',
				'react-dom'
			]
		}
	]
};