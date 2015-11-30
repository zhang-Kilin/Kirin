define(['Controller','ModelBase'],function(Controller,ModelBase){
	return Controller.extend({
		name:'index',
		exec:function(){
			var packageModel = new ModelBase(),
				releaseModel = new ModelBase(),
				modulesModel = new ModelBase(),
				self = this;
			packageModel.fetch({
				url:'data/package.json',
				success:function(model,data){
					$.get(data.modules,function(data){
						self.model.set('modules',data);
					});
					self.model.set('package',data);
				}
			});
			packageModel.fetch({
				url:'data/release.json',
				success:function(model,data){
					self.model.set('release',data);
				}
			});
			
			return this.view('index');
		}
	});
});