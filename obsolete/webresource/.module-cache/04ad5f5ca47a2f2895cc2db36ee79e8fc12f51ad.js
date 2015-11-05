/* 
 * @description Loading动画
 * @author zhanghh@ctrip.com
 * @createtime 2015-10-26
 * @version 0.1
 * @modify 
 * 		zhanghh@ctrip 2015-10-26
 */
define('UILoading', ['react'], function(React) {
	var defaultProps = {//loading动画中需要加载的提示语
				content:'数据加载中',
				//是否开启动画
				fade:true,
				//是否有背景遮罩
				//取值范围：false | UIBackdrop的实例
				backdrop:false,
				//遮罩是否响应点击关闭loading事件
				keybord:false};
	var UILoading = React.createClass({displayName: "UILoading",
		getDefaultProps:function(){
			return {
				
			};
		},
		getInitialState:function(){
			return {
				show:false,
				fade:false
			};
		},
		render:function(){
			var cls ="loading" + (this.props.fade ? " fade" : "");
				cls += this.state.fade ? " in" : "",
				display = this.state.show ? "block" : "none";
			return React.createElement("div", {className: cls, style: {display:display}}, 
						React.createElement("div", {className: "spinner"}, 
							React.createElement("div", {className: "spinner-container container1"}, 
								React.createElement("div", {className: "circle1"}), 
								React.createElement("div", {className: "circle2"}), 
								React.createElement("div", {className: "circle3"}), 
								React.createElement("div", {className: "circle4"})
							), 
							React.createElement("div", {className: "spinner-container container2"}, 
								React.createElement("div", {className: "circle1"}), 
								React.createElement("div", {className: "circle2"}), 
								React.createElement("div", {className: "circle3"}), 
								React.createElement("div", {className: "circle4"})
							), 
							React.createElement("div", {className: "spinner-container container3"}, 
								React.createElement("div", {className: "circle1"}), 
								React.createElement("div", {className: "circle2"}), 
								React.createElement("div", {className: "circle3"}), 
								React.createElement("div", {className: "circle4"})
							)
						), 
						React.createElement("div", {className: "content text-muted"}, 
							React.createElement("small", null, this.props.content)
						)
					);
		},
		/* 显示loading动画
		 * @param {Object} options 配置项
		 * @param {function} callback loading显示之后的回调函数
		 * @param {int} duration loading动画显示之后duration毫秒，之后自动hide
		 */
		show:function(options,callback,duration){
			if(this.state.show){
				return this;
			}
			if(callback && !isNaN(callback)){
				duration = callback;
				callback = null;
			}
			if(_.isFunction(options)){
				callback = options;
				options = null;
			}else if(options && !isNaN(options)){
				duration = options;
				callback = options = null;
			}
			
			if(options){
				this.setProps(options);
			}
			
			if(this.props.backdrop){				
				this.props.backdrop.show({
					fade:this.props.fade,
					click: this.props.keybord ? $.proxy(this.hide,this) : false
				});
			}
			
			this.setState({
				fade:false,
				show:true
			});
			if(this.props.fade){
				setTimeout($.proxy(function(){
					this.setState({
						fade:true
					});
				},this),10);
			}
			
			if(_.isFunction(callback)){
				setTimeout($.proxy(callback,this),UILoading.TRANSACTION_DURATION);
			}
			
			if(duration && duration > 0){
				setTimeout($.proxy(this.hide,this),duration);
			}
			
			return this;
		},
		/* 隐藏loading动画
		 * @param {function} callback loading隐藏之后的回调函数
		 */
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
				},this),UILoading.TRANSACTION_DURATION);
			}else{
				this.setState({
					fade:false,
					show:false
				});
			}
			
			if(_.isFunction(callback)){
				setTimeout($.proxy(callback,this),UILoading.TRANSACTION_DURATION);
			}
		}
	});
	
	UILoading.TRANSACTION_DURATION = 300;
	UILoading.BACKDROP_TRANSACTION_DURATION = 150;
	
	return UILoading;
});