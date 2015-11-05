define('UISelect',['react','react-dom','jsx.UISelectGroup','UILayerList','jsx.UILayerList'],function(React,ReactDOM,UISelectGroup,UILayerList,JsxUILayerList){
	var $super = UILayerList.prototype;
	return UILayerList.extend({
//		initialize:function(){
//			$super.initialize.apply(this,arguments);
//		},
		getDefaults:function(){
			return _.extend($super.getDefaults.apply(this,arguments),{
				onchange:$.proxy(this._onchange,this),
				onitemchange:$.proxy(this._onitemchange,this),
			});
		},
		render:function(){
			$super.render.apply(this,arguments);
			var cls = React.createClass({displayName: "cls",
				render:function(){
					return React.createElement(JsxUILayerList, React.__spread({},  this.props.layerOptions, {ref: "UILayerList"}), 
								React.createElement(UISelectGroup, React.__spread({},  this.props.options, {ref: "UISelectGroup"}), this.props.children)
							);
				},
				show:function(){
					this.refs.UILayerList.show();
				},
				hide:function(){
					this.refs.UILayerList.hide();
				}
			});
			this.Component = ReactDOM.render(React.createElement(cls,{
						options:this.options,
						layerOptions:this._layoutOptions
					},this.options.children),this.$el[0]);
		},
		_onchange:function(item){
			this.trigger('change',item);
		},
		_onitemchange:function(){},
		value:function(){
			return this.Component.refs.UISelectGroup.value();
		}
	});
});