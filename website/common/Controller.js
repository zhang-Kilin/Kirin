define(['ControllerBase','Logger','Url','ModelBase'],function(ControllerBase,Logger,Url,ModelBase){
	var navigateData = null;
	var Controller = ControllerBase.extend({
		initialize:function(context){
			this.on('executed',function(){
				if (!navigateData) {
					var navModel = new ModelBase(),
						self = this;
					navModel.fetch({
						url:'data/navigate.json',
						success:function(model,data){
							navigateData = data;
							self.model.set('navigate',data);
						}
					});
				};
			},this);
		},
		name:''
	});

	return Controller;
});