define('jsx.UISelect',['react'],function(React){
	/*
	 * children:[{
	 * 	text:'中国',
	 *  value:0,
	 *  selected:true
	 * },{
	 * 	text:'美国',
	 *  value:1
	 * },{
	 * 	text:'韩国',
	 *  value:2
	 * }
	 * ]
	 */
	return React.createClass({
		getDefaultProps:function(){
			return {
				onchange:function(){}
			};
		},
		getInitialState:function(){
			return {
				children:null,
				selectedIndex:0,
				translateY:0,
				events:null
			};
		},
		componentWillMount:function(){
			this.formatParameters(this.props);			
			var touchStart = 'ontouchstart' in document ? 'onTouchStart' : 'onMouseDown',
				touchMove = 'ontouchmove' in document ? 'onTouchMove' : 'onMouseMove',
				touchEnd = 'ontouchend' in document ? 'onTouchEnd' : 'onMouseUp',
				e = eval("({"+touchStart+":this.ontouchstart,"+touchMove+":this.ontouchmove,"+touchEnd+":this.ontouchend})");
			this.setState({
				events:e
			});
		},
		componentWillReceiveProps:function(nextProps){
			this.formatParameters(nextProps);
		},
		render:function(){
			return React.createElement("div", {className: "select"}, 
						React.createElement("ul", {style: {transform:"translateY("+this.state.translateY+"px)"}}, 
							this.createItems()
						), 
						React.createElement("div", {className: "mask"}
						), 
						React.createElement("div", {className: "line"}
						)
					);
		},
		formatParameters:function(props){
			var children = null,
				flag = false,
				selectedIndex = 0;
			if(props && props.children){
				children = [];
				_.each(props.children,function(item,index){
					children.push(_.extend({},item));
					if(item.selected && !flag){
						flag = true;
						selectedIndex = index;
					}
				});
				if(!flag && children.length > 0){
					children[0].selected = true;
				}
			}
			this.setState({
				children:children,
				selectedIndex:selectedIndex,
				translateY: -44 * selectedIndex
			});
		},
		createItems:function(){
			var results = [];
			if(this.state.children){
				_.each(this.state.children, $.proxy(function(item){
					results.push(React.createElement("li", {className: item.selected?"current":""}, item.text));
				},this));
			}
			return results;
		},
		ontouchstart:function(){},
		ontouchend:function(){},
		ontouchmove:function(){}
	});
});