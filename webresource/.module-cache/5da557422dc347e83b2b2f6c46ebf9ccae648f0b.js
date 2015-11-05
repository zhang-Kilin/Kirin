define('UISelect',['react','react-dom','jsx.UISelect','UILayerList'],function(React,ReactDOM,UISelect,UILayerList){
	var $super = UILayerList.prototype;
	return UILayerList.extend({
		initialize:function(){
			$super.initialize.apply(this,arguments);
		},
		getDefaults:function(){
			return _.extend($super.getDefaults.apply(this,arguments),{
				onchange:$.proxy(this._onchange,this)
			});
		},
		createElement:function(){
			var cls = React.createClass({displayName: "cls",
				render:function(){
					return React.createElement(UISelect, React.__spread({},  this.props, {ref: "Select"}), this.props.children);
				}
			});
			return React.createElement(cls,this.options,this.options.children);
		},
		_onchange:function(item){
			this.trigger('change',item);
		},
		value:function(){
			
		}
	});
});