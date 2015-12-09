define(['ComponentController','ModelBase'],function(Controller,ModelBase){
	return Controller.extend({
		name:'componentbase',
		exec:function(){
			var model = new ModelBase(),
				self = this;
			model.fetch({
				url:'data/components/componentbase.json',
				success:function(m,data){
					self.loadExamples(data);
					self.model.set('data',data);
				}
			});
			return this.view('module');
		}
	});
});