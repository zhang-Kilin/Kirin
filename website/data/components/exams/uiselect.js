require(['UISelect'],function(UISelect){
	//实例化
	var select = new UISelect({
		children:[
			{text:'中国',value:0},
			{text:'韩国',value:1},
			{text:'朝鲜',value:2},
			{text:'蒙古',value:3},
			{text:'俄罗斯',value:4,selected:true},
			{text:'巴基斯坦',value:5},
			{text:'土库曼斯坦',value:6},
			{text:'乌兹别克斯坦',value:7},
			{text:'印度',value:8},
			{text:'尼泊尔',value:9}
		]
	});

	//监听change事件
	select.on('change',function(item){
		console.log(item.text);
		//关闭
		//this.hide();
	});

	//
	select.on('hidden',function(){
		this.destroy();
	});

	//获取当前select的值
	//output:"俄罗斯"
	console.log(select.value().text);

	//显示select
	select.show();
	
});