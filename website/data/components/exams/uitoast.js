require(['UIToast'],function(UIToast){
	//实例化
	var toast = new UIToast({
		//是否开启动画效果
		fade: true,
		//是否有半透明遮罩
		backdrop: true,
		//遮罩是否响应点击关闭事件
		keybord: true
	});

	//
	toast.on('hidden',function(){
		this.destroy();
	});

	//显示
	//3秒后自动关闭
	toast.show('我们的支持人员会尽快的给您解决，请耐心等待，请勿重新提交申请。',3,function(){
		alert('关闭啦');
	});

});