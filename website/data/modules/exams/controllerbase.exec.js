require(['ControllerBase'],function(ControllerBase){
	var Controller = ControllerBase.extend({
		//设置controller名称
		name:'controllerbase',
		//复写父类函数
		exec:function(){
			var self = this;
			//数据加载
			$.ajax({
				url:'data/modules/controllerbase.json',
				success:function(data){
					//设置model的值，系统将自动将该数据渲染到view中
					self.model.set('data',data);
				}
			});
			//返回自定义的view
			return this.view('module');
		}
	});
});