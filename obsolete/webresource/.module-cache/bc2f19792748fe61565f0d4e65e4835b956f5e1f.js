define('UI',[],function(){
	var container = {};
	return {
		createContainer:function(name){
			if(_.has(container, name)){
				return container[name];
			}
			container[name] = $('<div />').appendTo(document.body)[0];
		}
	};
});