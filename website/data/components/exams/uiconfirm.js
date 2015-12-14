require(['UIConfirm'],function(UIConfirm){
	//实例化
	var uialert = new UIConfirm({
		"fade": true,
		"backdrop":true,
		"keybord":true,
		"buttons": [{
			"text": "OK",
			"handle":function(){
				this._ok.apply(this,arguments);
			}
		},{
			"text": "Cancel",
			"handle":function(){
				this._cancel.apply(this,arguments);
			}
		}]
	});

	//显示
	uialert.show('确认要提交信息吗？','信息提交确认',function(){
		alert('已提交');
		this.hide();
	},function(){
		alert('已放弃提交');
		this.hide();
	});

	//事件监听
	uialert.on('hidden',function(){
		this.destroy();
	});

});