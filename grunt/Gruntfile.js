var path = require('path'),
	_ = require('underscore'),
	fs = require('file-system'),
	requirejs = require('requirejs');

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
		paths: {}
	}, config);
	webresourcePath = path.join(webappPath,config.webresource);
	destPath = path.join(webappPath,config.dest);
	
	grunt.registerTask('init',function(){
		_.extend(config.paths,readConfigPaths(path.join(webresourcePath,config.config)));
	});

	grunt.registerTask('clear',function(){
		grunt.log.writeln('Running 删除dest目录');
		if(fs.existsSync(destPath)){
			fs.chmodSync(destPath,511);
			fs.rmdirSync(destPath);
		}
	});

	grunt.registerTask('requirejs',function(){
		grunt.log.writeln('Running requirejs打包');
		var done = grunt.async(),
			dir = path.join(destPath,config.webresource),
			options = {
				dir: dir,
				baseUrl:webresourcePath,
				optimize:'uglify2',
				paths:config.paths,
				uglify2: {
					mangle: {
						except: ['$super']
					},
					compress: {
						drop_console: true
					}
				},
				// 不是amd模块，只压缩
				skipModuleInsertion: false,
				onBuildWrite: function(moduleName, filepath, contents) {
					return contents;
				}
			};
		requirejs.optimize(options, function(buildResponse) {
			done();
		}, function(err) {
			grunt.fatal(err);
		});
	});

	grunt.registerTask('package',['init','clear','requirejs']);
}

function readConfigPaths(filePath){
	var content = fs.readFileSync(filePath,'utf8'),
		paths = {};
	content.replace(/paths['"]\s*:\s*({[\s\S]*?})/g,function(match,$1){
		$1 = new Function('return '+$1)();
		_.each($1,function(value,key){
			$1[key] = path.join(baseUrl,value).replace(/\\/g,'/');
		});
		_.extend(paths,$1);
	});
	return paths;
}
