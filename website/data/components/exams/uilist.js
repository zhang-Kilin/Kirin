require(['UIList'],function(UIList){
	//实例化
	var list = new UIList({
		children:[
			{text:'中国',value:0},
			{text:'韩国',value:1},
			{text:'朝鲜',value:2},
			{text:'蒙古',value:3},
			{text:'俄罗斯',value:4},
			{text:'巴基斯坦',value:5},
			{text:'土库曼斯坦',value:6},
			{text:'乌兹别克斯坦',value:7},
			{text:'印度',value:8},
			{text:'尼泊尔',value:9}
		]
	});

	//监听select事件
	list.on('select',function(item){
		alert(item.text);
	});

	//
	list.on('hidden',function(){
		this.destroy();
	});

	//显示List
	list.show();
	
});