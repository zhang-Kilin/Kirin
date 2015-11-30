define('UISelectGroup',['react','react-dom','jsx.UISelectGroup','UILayerList','jsx.UILayerList'],function(React,ReactDOM,UISelectGroup,UILayerList,JsxUILayerList){
	var $super = UILayerList.prototype;
	return UILayerList.extend({
//		initialize:function(){
//			$super.initialize.apply(this,arguments);
//		},
		getDefaults:function(){
			return _.extend($super.getDefaults.apply(this,arguments),{
				oncancel:this.hide,
				onchange:this._onchange,
				onitemchange:this._onitemchange,
			});
		},
		render:function(){
			$super.render.apply(this,arguments);
			//清空，重新渲染
			this.$el.empty();
			var cls = React.createClass({
				render:function(){
					return <JsxUILayerList {...this.props.layerOptions} ref="UILayerList">
								<UISelectGroup {...this.props.options} ref="UISelectGroup">{this.props.options.children}</UISelectGroup>
							</JsxUILayerList>;
				},
				show:function(){
					this.refs.UILayerList.show();
				},
				hide:function(){
					this.refs.UILayerList.hide();
				}
			});
			//proxy
			this.options.oncancel = $.proxy(this.options.oncancel,this);
			this.options.onchange = $.proxy(this.options.onchange,this);
			this.options.onitemchange = $.proxy(this.options.onitemchange,this);
			
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
			_.each(itemResults,$.proxy(function(items,key){
				this.options.children[key] = items;
			},this));
			this.trigger('change',value);
			this.hide();
		},
		_onitemchange:function(item,name){
			this.trigger('itemchange',item,name);
		},
		value:function(){
			return this.Component.refs.UISelectGroup.value();
		},
		refresh:function(name,items){
			var opts = $.extend({},this.options, true),
				itemsResults = this.Component.refs.UISelectGroup.itemsResults;
			itemsResults[name] = items;
			opts.children = _.extend({},opts.children,itemsResults);
			this.Component.setProps({
						options:opts
					});
			return this;
		}
	});
});