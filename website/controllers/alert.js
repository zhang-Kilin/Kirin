define(['Controller'],function(Controller){
	return Controller.extend({
		initialize:function(){
			this.model.set('HEAD',{
				title:'Alert',
				description:'Alert',
				keywords:'Alert',
				header:'Alert'
			});
		},
		// exec:function(){
		// 	this.redirect('test',7758);
		// },
		name:'alert',
		service:'data/alert.json'
	});
});