/* 
 * @description 底部弹窗容器
 * @author zhanghh@ctrip.com
 * @createtime 2015-10-28
 * @version 0.1
 * @modify
 * 		zhanghh@ctrip 2015-10-28
 */
define('jsx.UILayerList',['react'],function(React){
	var defaultProps = {
		//是否显示
		show:false,
		//是否开启动画
		fade:true,
		onshow:function(){},
		onhide:function(){}
	};
	
	return React.createClass({
		getDefaultProps:function(){
			return _.extend({},defaultProps);
		},
		getInitialState:function(){
			return {
				show:false,
				fade:false,
				in:false
			};
		},
		componentDidMount:function(){
			this.props.show && this.show();
		},
		componentDidUpdate:function(prevProps,prevState){
			if(this.props.show && !prevProps.show){ //onShow
				this.show();
			}else if(!this.props.show && prevProps.show){ //onHide
				this.hide();
			}
		},
		render:function(){
			var cls = "layerlist" + (this.state.fade ? " fade" : ""),
				cls = cls + (this.state.show ? "" : " hide"),
				cls = cls + (this.state.in ? " in" : "");
			return React.createElement("div", {className: cls}, this.props.children);
		},
		hide:function(){
			this.setState({
				in:false
			});
			if(this.props.fade){
				setTimeout($.proxy(function(){
					this.setState({
						show:false,
						fade:false
					});
					this.props.onhide && this.props.onhide();
				},this),UILayer.TRANSACTION_DURATION);
			}else{
				this.setState({
					show:false,
					fade:false
				});
				this.props.onhide && this.props.onhide();
			}
		},
		show:function(){
			this.props.backdrop && this.props.backdrop.setProps({
				show:this.props.show,
				fade:this.props.fade,
				click: this.props.keybord ? $.proxy(this.keybord,this) : false
			});
			var node = this.getDOMNode(),
				width = $(node).width(),
				height = $(node).height();
			//垂直、水平居中
			this.setState({
				show:true,
				marginTop:-height/2+'px',
				marginLeft:-width/2+'px'
			});
			if(this.props.fade){
				setTimeout($.proxy(function(){
					this.setState({
						in:true
					});
					this.props.onshow && this.props.onshow();
				},this),UILayer.TRANSACTION_DURATION);
			}
		},
		keybord:function(){
			this.props.keybord && this.props.onkeybord();
		}
	});
});