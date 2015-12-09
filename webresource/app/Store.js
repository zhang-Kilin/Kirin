/*
	实现递归保存和删除store数据

	set:function(subKey,item){}
	get:function(subKey){}
	remove:function(subKey){}

	For Example:
		set('Order.Shipping.ReceiveAddress','上海市长宁区')
		get('Order.Shipping') ==> {Order:{Shipping:{ReceiveAddress:'上海市长宁区'}}}
		remove('Order.Shipping') ==> {Order:{}}
*/
define('Store',['LocalStorageBase'],function(LocalStorageBase){
	var $super = LocalStorageBase.prototype;
	return LocalStorageBase.extend({
		//
		//@param {string} subKey 
		//@param {object} item
		set:function(subKey,item){
			if (subKey && typeof subKey === 'string' && typeof item !== 'undefined') {
				var arr = subKey.split('.'),
					origin = this.get() || {},
					obj = origin;
				if (!_.isObject(obj)) {
					throw Error('type error,can not set sub value');
				};
				for(var i=0;i<arr.length-1;i++){
					obj = obj[arr[i]] = obj[arr[i]] || {};
				}
				obj[arr[arr.length-1]] = item;

				subKey = origin;
			};
			return $super.set.call(this,subKey);
		},
		get:function(subKey){
			var obj = $super.get.call(this),
				arr;
			if (obj && subKey && typeof subKey === 'string') {
				arr = subKey.split('.');
				for (var i = 0; i < arr.length; i++) {
					obj = obj[arr[i]];
					if (!obj) {
						break;
					};
				};
			};
			return obj;
		},
		remove:function(subKey){
			if (subKey && typeof subKey === 'string') {
				var origin = this.get(),
					arr = subKey.split('.'),
					obj = origin;
				if (obj) {
					for (var i = 0; i < arr.length-1; i++) {
						obj = obj[arr[i]];
						if (!obj) {
							break;
						};
					};
					if (obj) {
						try{
							delete obj[arr[arr.length-1]];
							this.set(origin);
						}catch(e){}
					};
				};
			}else{
				$super.remove.call(this);
			}
			return this;
		}
	});
});