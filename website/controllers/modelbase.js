define(['ModuleController','ModelBase'],function(Controller,ModelBase){
	return Controller.extend({
		name:'modelbase',
		exec:function(){
			var model = new ModelBase(),
				self = this;
			model.fetch({
				url:'data/modules/modelbase.json',
				success:function(m,data){
					self.loadExamples(data);
					self.model.set('data',data);
				}
			});
			return this.view('module');
		}
	});
});