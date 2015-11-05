define('UISelect',['react','react-dom','jsx.UISelect','UILayerList','jsx.UILayerList'],function(React,ReactDOM,UISelect,UILayerList,JsxUILayerList){
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
		render:function(){
			$super.render.apply(this,arguments);
			var cls = React.createClass({displayName: "cls",
				render:function(){
					return React.createElement(JsxUILayerList, React.__spread({},  this.props.layerOptions, {ref: "UILayerList"}), 
								React.createElement(UISelect, React.__spread({},  this.props.options, {ref: "UISelect"}), this.props.children)
							);
				},
				show:function(){
					this.refs.UILayerList.show();
				},
				hide:function(){
					this.refs.UILayerList.hide();
				}
			});
			return React.createElement(cls,{
						options:this.options,
						layerOptions:this._layerOptions
					},this.options.children);
		},
		createElement:function(){
			
		},
		_onchange:function(item){
			this.trigger('change',item);
		},
		value:function(){
			return this.Component.refs.UISelect.value();
		}
	});
});