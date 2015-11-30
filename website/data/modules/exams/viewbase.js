require(['ViewBase','react','react-dom'],function(ViewBase,React,ReactDOM){
	//继承生成一个新的View
	//使用React进行视图渲染
	var View = ViewBase.extend({
		render:function(model){
			ReactDOM.render(<h1>{model.content}</h1>,this.el);
		}
	});
	//实例化
	var view = new View();

	//事件监听
	view.on('show',function(){
		console.log('show',view.isShown,view.isDestroyed);
	});
	view.on('shown',function(){
		console.log('shown',view.isShown,view.isDestroyed);
	});
	view.on('render',function(){
		console.log('render',view.isShown,view.isDestroyed);
	});
	view.on('rendered',function(){
		console.log('rendered',view.isShown,view.isDestroyed);
	});
	view.on('hide',function(){
		console.log('hide',view.isShown,view.isDestroyed);
	});
	view.on('hidden',function(){
		console.log('hidden',view.isShown,view.isDestroyed);
	});
	view.on('destroy',function(){
		console.log('destroy',view.isShown,view.isDestroyed);
	});
	view.on('destroyed',function(){
		console.log('destroyed',view.isShown,view.isDestroyed);
	});

	//显示
	//output:show false false
	//output:shown true false
	view.show();

	//渲染
	//output:render true false
	//output:rendered true false
	view._render({
		content:'Hello Kirin'
	});

	//渲染，不会触发render相关的事件
	view.render({
		content:'Hello Kirin'
	});	

	//隐藏
	//output:hide true false
	//output:hidden false false
	view.hide();

	//销毁
	//output:destroy false false
	//output:destroyed false true
	view.destroy();
});