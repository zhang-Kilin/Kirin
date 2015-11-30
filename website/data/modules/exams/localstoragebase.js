require(['LocalStorageBase'],function(LocalStorageBase){
	//继承生成OrderStore，用于存储订单信息
	var OrderStore = LocalStorageBase.extend({
		key:'ORDER',
		expires:'7d'
	});

	//获取实例
	var orderStore = OrderStore.instance();

	var order = {
		OrderNumber:'12345678',
		Mobile:'13000000000',
		OrderAmount:150
	};
	//缓存订单信息到本地
	orderStore.set(order);

	//读取本地缓存
	//output:order
	console.log(orderStore.get());

	//移除本地缓存
	orderStore.remove();

	//读取本地缓存
	//output:null
	console.log(orderStore.get());
});