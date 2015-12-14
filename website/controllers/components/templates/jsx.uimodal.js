define(['ComponentController','ModelBase'],function(Controller,ModelBase){
	return Controller.extend({
		name:'jsx.uimodal',
		exec:function(){
			var model = new ModelBase(),
				self = this;
			model.fetch({
				url:'data/components/templates/jsx.uimodal.json',
				success:function(m,data){
					self.loadExamples(data);
					self.model.set('data',data);
				}
			});
			return this.view('module');
		}
	});
});