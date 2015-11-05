define('UISelectGroup',['react','react-dom','jsx.UISelectGroup','UILayerList','jsx.UILayerList'],function(React,ReactDOM,UISelectGroup,UILayerList,JsxUILayerList){
	var $super = UILayerList.prototype;
	return UILayerList.extend({
//		initialize:function(){
//			$super.initialize.apply(this,arguments);
//		},
		getDefaults:function(){
			return _.extend($super.getDefaults.apply(this,arguments),{
				oncancel:$.proxy(this.hide,this),
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
		show:function(){
			$super.show.apply(this,arguments);
			this.once('cancel.selectgroup.component',this.render,this);
			return this;
		},
		hide:function(){
			$super.hide.apply(this,arguments);
			this.trigger('cancel.selectgroup.component');
			return this;
		},
		_onchange:function(value,itemResults){
			this.off('cancel.selectgroup.component');
			_.each(itemResults,$.proxy(function(items,index){
				this.options.children[index] = items;
			},this));			
			this.trigger('change',value);
			this.hide();
		},
		_onitemchange:function(item,index){
			this.trigger('itemchange',item,index);
		},
		value:function(){
			return this.Component.refs.UISelectGroup.value();
		},
		refresh:function(index,items){
			var children = _.extend({},this.options.children);
			this.options.children[index] = items;
			this.Component.setProps({
						options:this.options,
						layerOptions:this._layoutOptions
					});
			return this;
		}
	});
});