require(['UILoading'],function(UILoading){
	//实例化
	var loading = new UILoading({
		"fade": true,
		"backdrop":true,
		"keybord":true
	});

	//显示
	//3秒后自动给关闭
	loading.show('数据加载中',3,function(){
		alert('关闭啦');
	});

	//
	loading.on('hidden',function(){
		this.destroy();
	});

});