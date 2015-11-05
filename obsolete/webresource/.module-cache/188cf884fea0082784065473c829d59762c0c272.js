/* 
 * @description 构建垂直、左右居中的容器
 * @author zhanghh@ctrip.com
 * @createtime 2015-10-27
 * @version 0.1
 * @modify
 * 		zhanghh@ctrip 2015-10-27
 */
define('UILayer',['react'],function(React){
	var defaultProps = {
		//是否显示
		show:false,
		//是否开启动画
		fade:true,
		//是否有背景遮罩
		//取值范围：false | UIBackdrop的实例
		backdrop:false,
		//遮罩是否响应点击关闭loading事件
		keybord:false
	};
	var UILayer = React.createClass({displayName: "UILayer",
		getDefaultProps:function(){
			return _.extend({},defaultProps);
		},
		getInitialState:function(){
			return {
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
				var node = this.getDOMNode(),
				width = $(node).width(),
				height = $(node).height();
				//垂直、水平居中
				this.setState({
					marginTop:-height/2+'px',
					marginLeft:-width/2+'px'
				});
				if(this.props.fade){
					setTimeout($.proxy(function(){
						this.setState({
							in:true
						});
					},this),UILayer.TRANSACTION_DURATION);
				}
			}else if(!this.props.show && prevProps.show){ //onHide
				//隐藏之后恢复默认设置
				this.setProps(defaultProps);
			}
		},
		render:function(){
			var cls = "layer" + (this.props.fade ? " fade" : ""),
				cls = cls + (this.props.show ? "" : " hide"),
				cls = cls + (this.state.in ? " in" : ""),
				style = {marginTop:this.state.marginTop,marginLeft:this.state.marginLeft};
			return React.createElement("div", {className: cls, style: style}, this.props.children);
		},
		hide:function(){
			this.setProps({show:false});
		},
		show:function(){
			this.props.backdrop && this.props.backdrop.setProps({
				show:this.props.show,
				fade:this.props.fade,
				click: this.props.keybord ? $.proxy(this.hide,this) : false
			});
		}
	});
	
	UILayer.TRANSACTION_DURATION = 250;
	
	return UILayer;
});