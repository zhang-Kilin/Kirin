require(['react','react-dom','UIHeader','Application'],function(React,ReactDOM,UIHeader,App){

	//实例化
	var header = new UIHeader({
		//设置header要渲染的容器
		render:'#header',
		//初始状态就显示
		show:true,
		//设定title
		title:'Components.UIHeader',
		//右侧toolbar
		toolbar:['home','share'],
		//事件处理
		handles:{
			//特殊的事件：back 响应Header左侧的返回按钮
			onback:function(){
				App.back();
			},
			//home
			onhome:function(){
				App.navigate('/');
			},
			//share
			onshare:function(){
				alert('share');
			}
		}
	});

	//show
	header.show('Components.UIHeader');

	//事件监听
	header.on('shown',function(){
		console.log('shown');
	});

	//show，动态更改Header的显示内容
	header.show('Components.UIHeader',['home'],{
		onhome:function(){
			alert('home');
		}
	});

	//show，动态更改Header的显示内容
	header.show({
		title:'Components.UIHeader',
		toolbar:['home'],
		handles:{
			onhome:function(){
				alert('home');
			}
		}
	});

	//自定义toolbar
	header.show({
		title:'Components.UIHeader',
		toolbar:[
			{
				//icon图表，详见http://v3.bootcss.com/components/#glyphicons
				'icon':'stats',
				//显示文本
				'text':'图表',
				//响应的处理函数
				'handle':function(){
					alert('图表');
				}
			}
		]
	});

	//隐藏
	header.hide();

	//销毁
	header.destroy();

});