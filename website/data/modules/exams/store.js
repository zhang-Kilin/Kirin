require(['Store'],function(Store){
	var CustomStore = Store.extend({
		key:'CUSTOM',
		expires:'1M'
	});

	//实例化
	var customStore = CustomStore.instance();

	//直接缓存数据到本地
	customStore.set({
		User:{
			ReceiveAddress:{
				Mobile:'13000000000'
			},
			Email:'zhang_7150@163.com'
		}
	});

	//读取本地缓存
	//output:User
	console.log(customStore.get());

	//按subKey读取
	//output:13000000000
	console.log(customStore.get('User.ReceiveAddress.Mobile'));

	//使用subKey缓存数据
	customStore.set('User.ReceiveAddress.Mobile','13111111111');

	//按subKey读取
	//output:13111111111
	console.log(customStore.get('User.ReceiveAddress.Mobile'));

	//读取ReceiveAddress
	//output:ReceiveAddress
	console.log(customStore.get('User.ReceiveAddress'));

	//移除subKey下的缓存
	customStore.remove('User.ReceiveAddress');

	//按subKey读取
	//output:null
	console.log(customStore.get('User.ReceiveAddress.Mobile'));
});