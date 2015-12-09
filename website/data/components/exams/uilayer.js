require(['react','react-dom','UILayer'],function(React,ReactDOM,UILayer){
	var CustomComponent = UILayer.extend({
		//jsx
		// createElement:function(){
		// 	return <div className="well" style={{width:"300px",height:"200px",background:"#fff"}}>
		// 				<h1>我是自定义的UILayer</h1>
		// 			</div>;
		// }
		
		//js
		createElement:function(){
			return React.createElement('div',
						{className:"well",style:{width:"300px",height:"200px",background:"#fff"}},
						React.createElement('h1',null,'我是自定义的UILayer')
					);
		}
	});

	//实例化
	var customComponent = new CustomComponent();

	//事件监听
	customComponent.on('hidden',function(){
		this.destroy();
	});

	//显示
	customComponent.show();
});