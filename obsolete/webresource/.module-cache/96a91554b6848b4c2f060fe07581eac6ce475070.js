define('UI', [], function() {
	var components = {};
	var UI = {
		instanceComponent: function(name) {
			if (_.has(container, name)) {
				return container[name];
			}
			container[name] = $('<div />').appendTo(document.body)[0];
		}
	};
	return UI;
});