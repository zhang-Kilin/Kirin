define(['ModuleController'],function(ModuleController){
	return ModuleController.extend({
		name:'url',
		exec:function(){
			var self = this;
			$.ajax({
				url:'data/modules/url.json',
				success:function(data){
					self.loadExamples(data);
					self.model.set('data',data);
				}
			});
			return this.view('module');
		}
	});
});