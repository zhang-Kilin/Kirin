define(['ComponentController','ModelBase'],function(Controller,ModelBase){
	return Controller.extend({
		name:'jsx.uicalendar',
		exec:function(){
			var model = new ModelBase(),
				self = this;
			model.fetch({
				url:'data/components/templates/jsx.uicalendar.json',
				success:function(m,data){
					self.loadExamples(data);
					self.model.set('data',data);
				}
			});
			return this.view('module');
		}
	});
});