require(['react','react-dom','UILayerList'],function(React,ReactDOM,UILayerList){
	//自定义组件
	var CustomComponent = UILayerList.extend({
		//jsx
		// createElement:function(){
		// 	return <ul className="list-group">
	// 					<li className="list-group-item">Cras justo odio</li>
	// 				  	<li className="list-group-item">Dapibus ac facilisis in</li>
	// 				  	<li className="list-group-item">Morbi leo risus</li>
	// 				  	<li className="list-group-item">Porta ac consectetur ac</li>
	// 				  	<li className="list-group-item">Vestibulum at eros</li>
	// 				</ul>;
	//  }

		//js
		createElement:function(){
			return React.createElement('ul',{className:"list-group"},
						React.createElement('li',{className:"list-group-item"},"Cras justo odio"),
						React.createElement('li',{className:"list-group-item"},"Dapibus ac facilisis in"),
						React.createElement('li',{className:"list-group-item"},"Morbi leo risus"),
						React.createElement('li',{className:"list-group-item"},"Porta ac consectetur ac"),
						React.createElement('li',{className:"list-group-item"},"Vestibulum at eros")
					);
		}
	});

	//实例化
	var component = new CustomComponent();

	//事件监听
	component.on('hidden',function(){
		this.destroy();
	});

	//显示
	component.show();
});