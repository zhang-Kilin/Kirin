/* 
 * @description 构建垂直、左右居中的容器
 * @author zhanghh@ctrip.com
 * @createtime 2015-10-27
 * @version 0.1
 * @modify
 * 		zhanghh@ctrip 2015-10-27
 */
define('jsx.UILayer',['react'],function(React){
	var defaultProps = {
		//是否显示
		show:false,
		//是否开启动画
		fade:true,
//		//是否有背景遮罩
//		//取值范围：false | UIBackdrop的实例
//		backdrop:false,
//		//遮罩是否响应点击关闭loading事件
//		keybord:false,
//		onkeybord:function(){},
		onshow:function(){},
		onhide:function(){}
	};
	var UILayer = React.createClass({displayName: "UILayer",
		getDefaultProps:function(){
			return _.extend({},defaultProps);
		},
		getInitialState:function(){
			return {
				show:false,
				in:false,
				marginTop:0,
				marginLeft:0
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
			var cls = "layer" + (this.props.fade ? " fade" : ""),
				cls = cls + (this.props.show || this.state.show ? "" : " hide"),
				cls = cls + (this.state.in ? " in" : ""),
				style = {marginTop:this.state.marginTop,marginLeft:this.state.marginLeft};
			return React.createElement("div", {className: cls, style: style}, this.props.children);
		},
		hide:function(){
//			this.props.backdrop && this.props.backdrop.setProps({
//				show:false
//			});
			this.setState({
				in:false
			});
			if(this.props.fade){
				setTimeout($.proxy(function(){
					this.setState({
						show:false
					});
					this.props.onhide && this.props.onhide();
				},this),UILayer.TRANSACTION_DURATION);
			}else{
				this.setState({
					show:false
				});
				this.props.onhide && this.props.onhide();
			}
		},
		show:function(){
//			this.props.backdrop && this.props.backdrop.setProps({
//				show:this.props.show,
//				fade:this.props.fade,
//				click: this.props.keybord ? $.proxy(this.keybord,this) : false
//			});
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
		}
//		,
//		keybord:function(){
//			this.props.keybord && this.props.onkeybord();
//		}
	});
	
	UILayer.TRANSACTION_DURATION = 250;
	
	return UILayer;
});