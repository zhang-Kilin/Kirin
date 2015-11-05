/* 
 * @description Loading动画
 * @author zhanghh@ctrip.com
 * @createtime 2015-10-26
 * @version 0.1
 * @modify 
 * 		zhanghh@ctrip 2015-10-26
 */
define('jsx.UILoading', ['react'], function(React) {
	var UILoading = React.createClass({
		getDefaultProps:function(){
			return {
				//loading动画中需要加载的提示语
				children:'数据加载中'
			};
		},
		getInitialState:function(){
			return {};
		},
		componentDidMount:function(){
			
		},
		render:function(){
			return <div className="layer-container loading">
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
					</div>;
		}
	});
	
	return UILoading;
});