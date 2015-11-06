var path = require('path'),
	_ = require('underscore'),
	fs = require('file-system'),
	requirejs = require('requirejs'),
	CssDom = require('cssdom'),
	reacttools = require('react-tools');

var
//应用程序根目录
	webappPath
	//全局配置
	, config
	//dest打包后的输出目录
	, destPath
	//webresource资源目录
	, webresourcePath
	//requirejs打包的基目录
	, baseUrl;

module.exports = function(grunt) {
	webappPath = grunt.option('path');
	config = require(path.join(webappPath, 'gruntCfg.js'));
	config = _.extend({
		webresource:'',
		dest:'',
		config:'',
		paths: {},
		modules:[]
	}, config);
	webresourcePath = path.join(webappPath,config.webresource);
	destPath = path.join(webappPath,config.dest);
	config._paths = _.extend({},config.paths);

	grunt.registerTask('init',function(){
		_.extend(config.paths,readConfigPaths(path.join(webresourcePath,config.config)));
		_.extend(config.modules,readConfigModules());
	});

	grunt.registerTask('clear',function(){
		grunt.log.writeln('Running 删除dest目录');
		if(fs.existsSync(destPath)){
			fs.chmodSync(destPath,511);
			fs.rmdirSync(destPath);
		}
	});

	grunt.registerTask('jsx',function(){
		grunt.log.writeln('Running jsx transform');
		if(config.jsx){
			var src = path.join(webappPath,config.jsx.src),
				buildSrc = path.join(webappPath,config.jsx.build),
				ext;
			fs.recurseSync(src,config.jsx.filter,function(filepath, relative, filename){
				if(filename){
					grunt.log.writeln('build '+relative);
					ext = path.extname(relative);
					relative = relative.substr(0,relative.length - ext.length) + '.js';
					fs.copyFileSync(filepath,path.join(buildSrc,relative),{
						process:function(content){
							return reacttools.transform(content);
						}
					});
				}
			});
		}
	});

	grunt.registerTask('requirejs',function(){
		grunt.log.writeln('Running requirejs打包');
		var done = this.async(),
			dir = path.join(destPath,config.webresource),
			configName = config.config.replace(/\.js$/,''),
			options = {
				//打包输出根目录
				dir: dir,
				//源文件目录
				baseUrl:webresourcePath,
				/*
					"uglify：使用 UglifyJS 压缩代码，默认值；
					"uglify2"：使用 2.1.2+ 版本进行压缩；
					"closure"： 使用 Google's Closure Compiler 进行压缩合并，需要 Java 环境；
					"closure.keepLines"：使用 Closure Compiler 进行压缩合并并保留换行；
					"none"：不做压缩合并；
				*/
				optimize:'uglify2',
				paths:config.paths,
				modules:config.modules,

				uglify2: {
					mangle: {
						except: ['$super']
					},
					compress: {
						drop_console: true
					}
				},
				//打包之后的源文件是否要删除
				removeCombined: true,
				/*
					CSS 代码优化方式，可选的值有：
					"standard"：标准的压缩方式；
					"standard.keepLines"：保留换行；
					"standard.keepComments"：保留注释；
					"standard.keepComments.keepLines"：保留换行；
					"none"：不压缩；
				*/
				optimizeCss: 'standard',
				// 不是amd模块，只压缩
				skipModuleInsertion: false,
				onBuildWrite: function(moduleName, filepath, contents) {
					// grunt.log.writeln(moduleName, configName);

					if(moduleName == configName){
						// grunt.log.writeln(' ================ ');
						return '';
					}
					return contents;
				}
			};
		requirejs.optimize(options, function(buildResponse) {
			done();
		}, function(err) {
			grunt.fatal(err);
		});
	});

	grunt.registerTask('webres',function(){
		grunt.log.writeln('Running webres静态资源打包');
		var src = path.join(webappPath,config.dest,config.webresource),
			ext;
		fs.copySync(src,src,{
			noProcess:'**/*.{jpg,jpeg,png,gif,ttf}',
			process:function(content,filepath,relative){
				ext = path.extname(relative);
				if(ext === '.css'){
					grunt.log.writeln('compress '+filepath);
					content = new CssDom(content,filepath).stringify();
				}
				return content;
			}
		})
	});


	grunt.registerTask('build',['init','jsx']);

	grunt.registerTask('package',['init','clear','jsx','requirejs']);

}

function readConfigPaths(filePath){
	var content = fs.readFileSync(filePath,'utf8'),
		paths = {};

	content.replace(/paths['"]\s*:\s*({[\s\S]*?})/g,function(match,$1){
		$1 = new Function('return '+$1)();
		_.extend(paths,$1);
	});
	return paths;
}

function readConfigModules(){
	var results = [],
		mainJs = config.config.replace(/\.js$/,''),
		paths = config.paths,
		modules = config.modules;

	results.push({
		name:mainJs,
		include:_.keys(paths),
		exclude:_.keys(config._paths)
	});

	_.each(modules,function(item){
		results.push(item);
	});

	return results;
}