define(['ControllerBase'],function(ControllerBase){
	return ControllerBase.extend({
		exec:function(p){
			console.log(p);
			return this.view('test');
		}
	});
});