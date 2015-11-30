define(['ModuleController'],function(ModuleController){
	return ModuleController.extend({
		name:'controllerbase',
		exec:function(){
			var self = this;
			$.ajax({
				url:'data/modules/controllerbase.json',
				success:function(data){
					self.loadExamples(data);
					self.model.set('data',data);
				},
				error:function(e){
					console.log(e);
				}
			});
			return this.view('module');
		}
	});
});