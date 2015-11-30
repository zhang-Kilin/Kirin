require(['UIAlert'],function(UIAlert){
	//实例化
	var uialert = new UIAlert({
		"fade": true,
		"backdrop":true,
		"keybord":true,
		"buttons": [{
			"text": "知道了",
			"handle":function(){
				this.hide();
			}
		}]
	});

	//显示
	uialert.show('我们的支持人员会尽快的给您解决，请耐心等待，请勿重新提交申请。',function(){
		alert('关闭啦');
	});

	//事件监听
	uialert.on('hidden',function(){
		this.destroy();
	});
});