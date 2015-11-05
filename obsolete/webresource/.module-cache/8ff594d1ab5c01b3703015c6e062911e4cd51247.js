define('UI', [], function() {
	var components = {};
	var UI = {
		instanceComponent: function(name) {
			if (_.has(components, name)) {
				return components[name];
			}
			container[name] = $('<div />').appendTo(document.body)[0];
		}
	};
	return UI;
});