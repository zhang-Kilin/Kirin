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
				marginTop:0,
				events:null,
				transitionDuration:'0ms',
				translateY:0
			};
		},
		componentWillMount:function(){
			this.formatParameters(this.props);			
			var touchStart = 'ontouchstart' in document ? 'onTouchStart' : 'onMouseDown',
				touchMove = 'ontouchmove' in document ? 'onTouchMove' : 'onMouseMove',
				touchEnd = 'ontouchend' in document ? 'onTouchEnd' : 'onMouseUp',
				touchCancel = 'ontouchcancel' in document ? 'onTouchCancel' : 'onMouseLeave',
				e = eval("({"+touchStart+":this.ontouchstart,"+touchMove+":this.ontouchmove,"+touchEnd+":this.ontouchend,"+touchCancel+":this.ontouchend})");
			this.setState({
				events:e
			});
		},
		componentWillReceiveProps:function(nextProps){
			this.formatParameters(nextProps);
		},
		render:function(){
			return React.createElement("div", React.__spread({className: "select"},  this.state.events), 
						React.createElement("ul", {style: {marginTop:this.state.marginTop+"px"}}, 
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
			
			this.maxMarginTop = 0;
			this.minMarginTop = -44 * (children.length - 1);
						
			this.setState({
				children:children,
				selectedIndex:selectedIndex,
				marginTop: -44 * selectedIndex
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
		ontouchstart:function(e){
			this.touch = 'start';
			var point = e.touches ? e.touches[0] : e;
			this.startClientY = point.pageY;
			console.log('start');
			e.stopPropagation();
			e.preventDefault();
			return false;
		},
		ontouchmove:function(e){
			if(this.touch === 'start'){
				var point = e.touches ? e.touches[0] : e,
					step = point.pageY - this.startClientY,
					marginTop = this.state.marginTop + step;
				marginTop = marginTop > this.maxMarginTop ? this.maxMarginTop : marginTop;
				marginTop = marginTop < this.minMarginTop ? this.minMarginTop : marginTop;
				this.startClientY = point.pageY;
				this.setState({
					marginTop:marginTop
				});
			}
			e.stopPropagation();
			e.preventDefault();
			return false;
		},
		ontouchend:function(e){
			if(this.touch === 'end'){
				return false;
			}
			this.touch = 'end';
			
			var marginTop = this.state.marginTop,
				index = Math.round(Math.abs(marginTop) / 44),
				changed = index != this.state.selectedIndex,
				item,
				targetMarginTop = -44 * index,
				state = {};
			if(changed){
				item = _.find(this.state.children,function(obj){
					return obj.selected;
				});
				item && delete item.selected;
				this.state.children[index].selected = true;
				state = {
					selectedIndex : index,
					children:this.state.children
				};
			}
			if(marginTop != targetMarginTop){
				state.marginTop = targetMarginTop;
				
			}
			
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		}
	});
});