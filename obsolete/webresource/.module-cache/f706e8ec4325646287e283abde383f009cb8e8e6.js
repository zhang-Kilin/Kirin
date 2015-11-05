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
	
	var UILayerList = React.createClass({displayName: "UILayerList",
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
			if(this.state.show && !prevState.show){ //onShow
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
				},this),UILayerList.TRANSACTION_DURATION);
			}else{
				this.setState({
					show:false
				});
				this.props.onhide && this.props.onhide();
			}
		},
		show:function(){
			if(this.props.fade){
				this.setState({
					fade:true,
					show:true
				});
				setTimeout($.proxy(function(){
					this.setState({							
						in:true
					});
					this.props.onshow && this.props.onshow();
				},this),UILayerList.TRANSACTION_DURATION);
			}else{
				this.setState({
					in:true,
					show:true
				});
				this.props.onshow && this.props.onshow();
			}
		}
	});
	UILayerList.TRANSACTION_DURATION = 250;
	return UILayerList;
});