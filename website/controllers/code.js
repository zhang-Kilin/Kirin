define(['Controller','ModelBase'],function(Controller,ModelBase){
	return Controller.extend({
		name:'code',
		exec:function(name,path,type){
			path = decodeURIComponent(path);
			var url = '/webresource/'+path,
				self = this;
			$.ajax({
				url:url,
				type:'get',
				dateType:'text',
				success:function(code){
					self.model.set('path',path);
					self.model.set('type',type);
					self.model.set('code',code);
				}
			});
			return this.view('code');
		}
	});
});