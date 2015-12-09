define(['ModuleController'],function(ModuleController){
	return ModuleController.extend({
		name:'logger',
		exec:function(){
			var self = this;
			$.ajax({
				url:'data/modules/logger.json',
				success:function(data){
					self.loadExamples(data);
					self.model.set('data',data);
				}
			});
			return this.view('module');
		}
	});
});