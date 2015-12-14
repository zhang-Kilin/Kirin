require(['jsx.UIModal','UILayer','react','react-dom'],function(UIModal,UILayer,React,ReactDOM){

	//配置项
	var options = {
		title:"Hello World",
		children:"这个是测试内容",
		buttons:[{
			text:"知道了",
			handle:function(){
				this.hide();
			}
		}]
	};

	//
	var Alert = UILayer.extend({
		initialize:function(){
			UILayer.__super__.initialize.apply(this,arguments);
			_.each(this.options.buttons,$.proxy(function(item){
				item.handle = $.proxy(item.handle,this);
			},this));
		},
		createElement:function(){
			return React.createElement(UIModal,this.options);
		}
	});

	//instance
	var alertModal = new Alert(options);

	//dispose
	alertModal.on('hidden',function(){
		this.destroy();
	});

	//show
	alertModal.show();
});