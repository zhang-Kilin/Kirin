/* 
 * @description 模态窗体
 * @author zhanghh@ctrip.com
 * @createtime 2015-10-27
 * @version 0.1
 * @modify
 * 		zhanghh@ctrip 2015-10-27
 */
define('UIModal',['react','UILayer'],function(React,UILayer){
	var defaultProps = {
		//是否显示
		show:false,
		//是否开启动画
		fade:true,
		//是否有背景遮罩
		//取值范围：false | UIBackdrop的实例
		backdrop:false,
		//遮罩是否响应点击关闭loading事件
		keybord:false,
		onkeybord:function(){},
		onshow:function(){},
		onhide:function(){}
	};
});