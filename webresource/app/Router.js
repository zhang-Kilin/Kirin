define('Router',['Url','Logger','Engines','ControllerBase'],function(Url,Logger,Engines,ControllerBase){

	var Router = Backbone.Router.extend({
		proxy:function(name,route){
			return function(){
				var args = Array.prototype.slice.call(arguments),
					context = {
						app:require('Application'),
						router:this,
						route:_.extend({name:name},route),
						url:new Url(Backbone.history.getFragment())
					};
				args = [route.controller,context].concat(args);
				ControllerBase.execute.apply(ControllerBase,args);
			};
		},
		// Manually bind a single named route to a callback. For example:
	    //
	    //      this.route('index', {
		// 			url_schema:['','index','/','index/:page'],
		// 			controller:'index'	
	    //		});
	    //
	    route: function (name, route) {
	    	var url_schema = typeof route.url_schema === 'string' ? [route.url_schema] : route.url_schema,
	    		controller = _.isFunction(route.controller) ? route.controller : this.proxy(name,route),
	    		router = this;
	    	_.each(url_schema,$.proxy(function(item){
	    		if (!_.isRegExp(item)) {
	    			item = this._routeToRegExp(item);
	    		}
	    		Backbone.history.route(item, function (fragment) {
			        var args = router._extractParameters(item, fragment);
			        controller && controller.apply(router, args);
			        router.trigger.apply(router, ['route:' + name].concat(args).concat([item,route]));
			        router.trigger('route', name, args, item, route);
			        Backbone.history.trigger('route', router, name, args, item, route);
		    	});
	    	},this));

	    	return this;
	    },
		// Bind all defined routes to `Backbone.history`. We have to reverse the
	    // order of the routes here to support behavior where the most general
	    // routes can be defined at the bottom of the route map.
	    // @example
	    // routes = {
	    //		'index':{
		// 			url_schema:['','index','/','index/:page'],
		// 			controller:'index'
		// 		}
    	// }
	    _bindRoutes: function () {
	    	if (!this.routes) return;
	    	this.routes = _.result(this, 'routes');
	    	var name, 
	    		routes = _.keys(this.routes),
	    		route;
	    	while ((name = routes.pop()) != null) {
	    		route = this.routes[name];
	        	this.route(name,route);
	    	}
	    },
	    // Given a route, and a URL fragment that it matches, return the array of
	    // extracted decoded parameters. Empty or unmatched parameters will be
	    // treated as `null` to normalize cross-browser behavior.
	    _extractParameters: function (route, fragment) {
	    	var url = new Url(fragment);
		    var params = route.exec(url.relativepath).slice(1);
		    return _.map(params, function (param) {
	        	return param ? decodeURIComponent(param) : null;
		    });
	    }
	});

	Router.proxy = Router.prototype.proxy;

	Router.default = {
		'default':{
			'url_schema':'*path',
			'controller':function(path){
				if (!path) {
					Logger.instance().warning('没有匹配的路由器:'+window.location.href);
					return;
				};
				//
				var controller = path.replace(/^\//,'');
				Router.proxy('default',{
					'url_schema':'*path',
					controller:controller
				}).call(this);
			}
		}
	};
	return Router;
});