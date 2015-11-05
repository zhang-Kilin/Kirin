/* 
 * @description 视图容器
 * @author zhanghh@ctrip.com
 * @createtime 2015-10-23
 * @version 0.1
 * @modify 
 * 		zhanghh@ctrip 2015-10-23
 */
define('jsx.UIViewContainer', ['react'], function(React) {
	var UIViewContainer = {
		getDefaultProps: function() {
			return {
				onshow: null,
				onhide: null
			};
		},
		getInitialState: function() {
			return {
				//控制View是否显示，取值：hide,show
				show: false
			};
		},
		componentDidUpdate:function(prevProps,prevState){
			var evt = '';
			if(prevState.show != this.state.show){
				evt = this.state.show ? 'onshow' :'onhide';
			}
			evt && this.props[evt] && this.props[evt](); 
		},
		render:function(){
			var cls = this.state.show ? '' : 'hide';
			cls = 'view '+cls;
			return <div className={cls} {...this.props}>{this.props.children}</div>;
		}
	};

	return React.createClass(UIViewContainer);
});