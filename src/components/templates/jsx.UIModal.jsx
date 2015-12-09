/* 
 * @description 模态窗体
 * @author zhanghh@ctrip.com
 * @createtime 2015-10-27
 * @version 0.1
 * @modify
 * 		zhanghh@ctrip 2015-10-27
 */
define('jsx.UIModal',['react'],function(React){
	return React.createClass({
		getDefaultProps:function(){
			return {
				title:'',
				buttons:[
					{
						text:'确定',
						handle:function(){}
					},
					{
						text:'取消',
						handle:function(){}
					}
				]
			};
		},
		getInitialState:function(){
			return {};
		},
		render:function(){
			return <div className="layer-container ui-modal">
						{this.createHeader()}
						<div className="moadal-body">
							{this.props.children}
						</div>
						{this.createFooter()}
					</div>;
		},
		createHeader:function(){
			if(this.props.title){
				return <div className="modal-header">
							<h4>{this.props.title}</h4>
						</div>;
			}
		},
		createFooter:function(){
			if(this.props.buttons && this.props.buttons.length){
				return <div className="modal-footer">
							<div className="btn-group btn-group-justified">							
								{this.createButtons()}
							</div>
						</div>;
			}
		},
		createButtons:function(){
			return _.map(this.props.buttons,function(item){
				return <a href="javascript:;" className="btn btn-default" onClick={item.handle}>{item.text}</a>;
			});
		}
	})
});