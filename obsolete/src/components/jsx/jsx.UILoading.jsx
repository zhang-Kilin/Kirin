/* 
 * @description Loading动画
 * @author zhanghh@ctrip.com
 * @createtime 2015-10-26
 * @version 0.1
 * @modify 
 * 		zhanghh@ctrip 2015-10-26
 */
define('jsx.UILoading', ['react','jsx.UILayer'], function(React,UILayer) {
	var defaultProps = {
		//loading动画中需要加载的提示语
		children:'数据加载中',
		//是否开启动画
		fade:true
	};
	var UILoading = React.createClass({
		getDefaultProps:function(){
			return _.extend({},defaultProps);
		},
		getInitialState:function(){
			return {};
		},
		componentDidMount:function(){
			
		},
		render:function(){
			return <UILayer {...this.props}>
						<div className="layer-container loading">
							<div className="spinner">
								<div className="spinner-container container1">
									<div className="circle1"></div>
									<div className="circle2"></div>
									<div className="circle3"></div>
									<div className="circle4"></div>
								</div>
								<div className="spinner-container container2">
									<div className="circle1"></div>
									<div className="circle2"></div>
									<div className="circle3"></div>
									<div className="circle4"></div>
								</div>
								<div className="spinner-container container3">
									<div className="circle1"></div>
									<div className="circle2"></div>
									<div className="circle3"></div>
									<div className="circle4"></div>
								</div>
							</div>
							<div className="content text-muted">
								<small>{this.props.children}</small>
							</div>
						</div>
					</UILayer>;
		}
	});
	
	return UILoading;
});