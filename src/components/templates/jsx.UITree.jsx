/* 数据可无线递归
	children:[
		{
			text:'礼品卡',
			children:[
				{
					text:'礼品卡订单数据',
					children:[
						{
							text:'按订单状态查询'
						}
					]
				},{
					text:'礼品卡账户情况',
					children:[
						{
							text:'按卡类型查询'
						},{
							text:'按项目性质查询'
						}
					]
				}
			]
		},{
			text:'存款证明',
			children:[
				{
					text:'按订单类型查询'
				},{
					text:'按订单状态查询'
				}
			]
		},{
			text:'送心意',
			children:[
				{
					text:'按订单类型查询'
				}
			]
		}
	]
*/
define('jsx.UITree',['react','react-dom'],function(React,ReactDOM){
	var UITree = React.createClass({
		getDefaultProps:function(){
			return {
				unexpand:function(item){},
				expand:function(item){},
				callback:function(item){}
			};
		},
		getInitialState:function(){
			return {};
		},
		componentWillMount:function(){
			this.initParams(this.props.children);
		},
		componentReceiveProps:function(nextProps){
			this.initParams(nextProps.children);
		},
		render:function(){
			return <div className="tree" onClick={this.command}>
						<ul>{this.createItems(this.state.data)}</ul>
					</div>;
		},
		initParams:function(children){
			var id = 0,
				map = {},
				extend = function(data){
					return _.map(data,function(item){
						var obj = _.extend({
							id:++id
						},item);
						if (item.children) {
							obj.children = extend(item.children);
						};
						map[obj.id] = obj;
						return obj;
					});
				};

			this.setState({
				data:extend(children),
				map:map
			});
		},
		createItems:function(data){
			return _.map(data,$.proxy(function(item){
				if (item.children && item.children.length > 0) {
					return this.createLimb(item);
				};
				return this.createLeaf(item);
			},this));
		},
		createLimb:function(obj){
			var results = [],
				expand = obj.expand,
				cls = expand ? 'bottom' : 'right';
			results.push(<li className="limb">
							<a href="javascript:;">
								<i className={"glyphicon glyphicon-triangle-"+cls} data-cmd={"expand-"+obj.id}></i>
								<span data-cmd={"link-"+obj.id}>{obj.text}</span>
							</a>
							<ul style={{display:expand?"block":"none"}}>
								{this.createItems(obj.children)}
							</ul>
						</li>);
			return results;
		},
		createLeaf:function(obj){
			return <li className="leaf">
						<a href="javascript:;" data-cmd={"link-"+obj.id}>{obj.text}</a>
					</li>;
		},
		command:function(e){
			var attr = $(e.target).attr('data-cmd'),
				arr,
				cmd,
				id,
				fn;
			if (attr) {
				arr = attr.split('-');
				cmd = arr[0];
				id = arr[1];
				switch(cmd){
					case 'expand':
						fn = this.expand;
						break;
					case 'link':
						fn = this.link;
						break;
				}
			};
			if(fn){
				fn(id);
			}
		},
		expand:function(id){
			var item = this.state.map[id],
				fn;
			if (item) {
				fn = item.expand ? 'unexpand' : 'expand';
				item.expand = !item.expand;
			};
			this.setState({
				data:this.state.data
			});
			if (fn && _.isFunction(this.props[fn])) {
				this.props[fn].call(this,item);
			};
		},
		link:function(id){
			var item = this.state.map[id];
			if (item) {
				if (_.isFunction(this.props.callback)) {
					this.props.callback.call(this,item);
				};
			};
		}
	});

	return UITree;
});