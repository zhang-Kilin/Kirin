define(['ModuleController','ModelBase'],function(Controller,ModelBase){
	return Controller.extend({
		name:'application',
		exec:function(){
			var model = new ModelBase(),
				self = this;
			model.fetch({
				url:'data/modules/application.json',
				success:function(m,data){
					self.loadExamples(data);
					self.model.set('data',data);
				}
			});
			return this.view('module');
		}
	});
});