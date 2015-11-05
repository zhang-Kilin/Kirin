define('UISelect',['react','react-dom','jsx.UISelect','UILayerList'],function(React,ReactDOM,UISelect,UILayerList){
	var $super = UILayerList.prototype;
	return UILayerList.extend({
		createElement:function(){
			return React.createElement(UISelect, React.__spread({},  this.options), this.options.children);
		},
		_onchange:function(item){
			
		}
	});
});