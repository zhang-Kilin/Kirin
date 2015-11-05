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
		componentDidUpdate:function(prevProps,prevState){
			if(this.props.show && !prevProps.show){ //onShow
				var node = this.getDOMNode(),
				width = $(node).width(),
				height = $(node).height();
				setTimeout($.proxy(function(){
//					//垂直、水平居中
//					this.setState({
//						marginTop:-height/2+'px',
//						marginLeft:-width/2+'px'
//					});
					$(this.getDOMNode()).css({
						"margin-top":-height/2+"px",
						"margin-left":-width/2+"px"
					});
					if(this.props.fade){
						setTimeout($.proxy(function(){
							this.setState({
								in:true
							});
						},this),250);
					}
				},this),10);
			}
		},
		render:function(){
			var cls = "layer" + (this.props.fade ? " fade" : ""),
				cls = cls + (this.props.show ? "" : " hide"),
				cls = cls + (this.state.in ? " in" : ""),
				style = {marginTop:this.state.marginTop,marginLeft:this.state.marginLeft};
			return React.createElement("div", {className: cls, style: style}, this.props.children);
		},
		
		show:function(options,callback){
			if(this.state.show){
				return this;
			}
			if(_.isFunction(options)){
				callback = options;
				options = null;
			}
			
			this.setProps(options);
			
			this.props.backdrop && this.props.backdrop.show({
				fade:this.props.fade,
				click: this.props.keybord ? $.proxy(this.hide,this) : false
			});
			
			this.setState({
				fade:false,
				show:true
			});
			
			var node = this.getDOMNode(),
				width = $(node).width(),
				height = $(node).height();
			//垂直居中
			this.setState({
				marginTop:-height/2+'px',
				marginLeft:-width/2+'px'
			});
			
			if(this.props.fade){
				setTimeout($.proxy(function(){
					this.setState({
						fade:true
					});
				},this),10);
			}
			
			if(_.isFunction(callback)){
				setTimeout($.proxy(callback,this),UILayer.TRANSACTION_DURATION);
			}
			
			return this;
		},
		hide:function(callback){
			if(!this.state.show){
				return this;
			}
			if(this.props.backdrop){
				this.props.backdrop.hide();
			}
			if(this.props.fade){
				this.setState({
					fade:false
				});
				setTimeout($.proxy(function(){
					this.setState({
						show:false
					});
					this.setDefaultProps();
				},this),UILayer.TRANSACTION_DURATION);
			}else{
				this.setState({
					fade:false,
					show:false
				});
				this.setDefaultProps();
			}
			
			if(_.isFunction(callback)){
				setTimeout($.proxy(callback,this),UILayer.TRANSACTION_DURATION);
			}
		},
		/* 恢复默认配置，用于Loading在隐藏之后的操作，不至于影响到后续的操作
		 */
		setDefaultProps:function(){
			this.setProps(defaultProps);
		}
	});
	
	UILayer.TRANSACTION_DURATION = 300;
	
	return UILayer;
});