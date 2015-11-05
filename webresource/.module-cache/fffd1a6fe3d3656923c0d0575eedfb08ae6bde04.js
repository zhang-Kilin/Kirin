/* 
 * @description 构建垂直、左右居中的容器
 * @author zhanghh@ctrip.com
 * @createtime 2015-10-27
 * @version 0.1
 * @modify
 * 		zhanghh@ctrip 2015-10-27
 */
define('jsx.UILayer',['react'],function(React){
	var UILayer = React.createClass({displayName: "UILayer",
		getDefaultProps:function(){
			return {
				fade:true,
				onshow:function(){},
				onhide:function(){}
			};
		},
		getInitialState:function(){
			return {
				show:false,
				fade:false,
				in:false,
				marginTop:0,
				marginLeft:0
			};
		},
		componentWillMount:function(){
			$(window).on('resize',$.proxy(this.resize,this));
		},
		componentWillUnmount:function(){
			$(window).off('resize',$.proxy(this.resize,this));
		},
		componentDidMount:function(){
			this.props.show && this.show();
		},
		componentDidUpdate:function(prevProps,prevState){
			if(this.state.show && !prevState.show){
				this.resize();
			}else if(this.state.show){
				if(this.props.fade && !this.state.fade){
					this.setState({
						fade:true
					});
					setTimeout($.proxy(function(){
						this.setState({							
							in:true
						});
						this.props.onshow && this.props.onshow();
					},this),UILayer.TRANSACTION_DURATION);
				}else{
					this.setState({
						in:true
					});
					this.props.onshow && this.props.onshow();
				}
			}
		},
		render:function(){
			var cls = "layer" + (this.state.fade ? " fade" : ""),
				cls = cls + (this.state.show ? "" : " hide"),
				cls = cls + (this.state.in ? " in" : ""),
				style = {marginTop:this.state.marginTop,marginLeft:this.state.marginLeft};
			return React.createElement("div", {className: cls, style: style}, this.props.children);
		},
		show:function(){
			if(this.state.show){
				return ;
			}
			this.setState({
				show:true
			});
		},
		hide:function(){
			if(this.props.fade){
				this.setState({
					in:false
				});
				setTimeout($.proxy(function(){
					this.setState({
						show:false,
						fade:false
					});
					this.props.onhide && this.props.onhide();
				},this),UILayer.TRANSACTION_DURATION);
			}else{
				this.setState({
					in:false,
					show:false,
					fade:false
				});
				this.props.onhide && this.props.onhide();
			}
		},
		resize:function(){
			if(!this.state.show){
				return;
			}
			var node = this.getDOMNode(),
				width = $(node).width(),
				height = $(node).height();
			//垂直、水平居中
			this.setState({
				marginTop:-height/2+'px',
				marginLeft:-width/2+'px'
			});
		}
	});
	
	UILayer.TRANSACTION_DURATION = 250;
	
	return UILayer;
});