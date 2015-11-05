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
				events:null,
				transitionDuration:'0ms'
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
						React.createElement("ul", {style: {transform:"translateY("+this.state.translateY+"px)",transitionDuration:this.state.transitionDuration}}, 
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
			
			this.maxTranslateY = 0;
			this.minTranslateY = -44 * (children.length - 1);
						
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
		ontouchstart:function(e){
			this.touch = 'start';
			this.startClientY = e.clientY;
			console.log('start');
			e.stopPropagation();
			e.preventDefault();
			return false;
		},
		ontouchmove:function(e){
			if(this.touch === 'start'){
				var step = e.clientY - this.startClientY,
					translateY = this.state.translateY + step;
				translateY = translateY > this.maxTranslateY ? this.maxTranslateY : translateY;
				translateY = translateY < this.minTranslateY ? this.minTranslateY : translateY;
				this.startClientY = e.clientY;
				this.setState({
					translateY:translateY,
					transitionDuration:'100ms'
				});
				console.log(step + '   '+this.state.translateY);
			}
			e.stopPropagation();
			e.preventDefault();
			return false;
		},
		ontouchend:function(e){
			this.touch = 'end';
			console.log('end');
			e.stopPropagation();
			e.preventDefault();
			return false;
		}
	});
});