require(['Logger'],function(Logger){
	//实例化
	var logger = Logger.instance();

	var msg = "用户xxx购买了产品xxx";

	//
	logger.log(msg);

	//
	logger.info(msg);

	//
	logger.debug(msg);

	//
	logger.warning(msg);

	//
	logger.error(msg);

	//错误处理
	try{
		throw new Error('参数不能为空');
	}catch(e){
		logger.error(e);
	}
	
});