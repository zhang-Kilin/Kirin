define(['Controller'],function(Controller){
	var ComponentController = Controller.extend({		
		loadExamples:function(data){
			var keys = _.keys(data),
				self = this;
			_.each(keys,function(key){
				if (key == 'example') {
					$.ajax({
						url:'data/components/exams/'+data.example.path,
						type:'get',
						async:false,
						dataType:'text',
						success:function(code){
							data.example.code = code;	
						}
					});
				}else if (_.isObject(data[key])) {
					self.loadExamples(data[key],data);
				};
			});
		}
	});

	return ComponentController;
});