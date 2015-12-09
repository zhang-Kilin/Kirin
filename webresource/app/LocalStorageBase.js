/*******************
 * LocalStorageBase
 * 作为对本地缓存localStorage的封装
 * 预留3个api : set,get,remove
 *
 * 保存数据到localStorage
 * @param item {object} 要保存到本地的数据
 * set:function(item){}
 *
 * 读取当前本地缓存数据
 * get:function(){}
 *
 * //移除本地缓存
 * remove:function(){}
 * 
 * //静态方法，获取当前store的唯一实例
 * instance:function(){return _instance;}
 *
 * exam:
 * 		var OrderStore = LocalStorageBase.extend({key:'ORDER',expires:'7D'})
 * 		var store = new OrderStore();
 * 		store.set({OrderNumber:'12345878',OrderID:12345678})
 * 		var order = store.get();
 * 		store.remove();
 */
define('LocalStorageBase',[],function(){
	var LocalStorageBase = function(){
		var options = _.extend({},LocalStorageBase.DEFAULTS,this);
		_.extend(this,options);
	};
	//保存数据到localStorage
 	//@param item {object} 要保存到本地的数据 
	LocalStorageBase.prototype.set = function(item){
		item = this._createItem(item);
		item = JSON.stringify(item);
		localStorage.setItem(this.key,item);
		return this;
	};

	//读取当前本地缓存数据
	LocalStorageBase.prototype.get = function(){
		var item = localStorage.getItem(this.key);
		if (!item) {
			return null;
		};
		item = JSON.parse(item);
		if (item.expires < new Date().getTime()) {
			setTimeout($.proxy(function(){
				this.remove();
			},this),0);
			return null;
		};
		return item.value;
	};

	LocalStorageBase.prototype.remove = function(){
		localStorage.removeItem(this.key);
		return this;
	};

	LocalStorageBase.prototype._createItem = function(item){
		expires = getExpiresTime(this.expires);
		return {
			value:item,
			expires:expires,
			savetime:new Date().getTime()
		};
	};

	//获取失效时间
	function getExpiresTime(expires) {
		var matches = /^(\d+)([ymdhs])$/i.exec(expires),
			now = new Date,
			date;
		matches[1] = parseInt(matches[0]) || 1;
		matches[2] = matches[2] || 'M';
		switch (matches[2] || 'M') {
			case 'y':
			case 'Y':
				date = now.setFullYear(matches[1] + now.getFullYear());
				break;
			case 'd':
			case 'D':
				date = now.setDate(matches[1] + now.getDate());
				break;
			case 'h':
			case 'H':
				date = now.setHours(matches[1] + now.getHours());
				break;
			case 'm':
				date = now.setMinutes(matches[1] + now.setMinutes());
				break;
			case 's':
			case 'S':
				date = now.setSeconds(matches[1] + now.getSeconds());
				break;
			case 'M':
			default:
				date = now.setMonth(matches[1] + now.getMonth());
				break;
		}
		return date;
	};

	LocalStorageBase.DEFAULTS = {
		//当前存储的数据唯一标识
		key: '',
		//有效期，默认为1月：
		//y:年
		//M:月
		//d:日
		//h:时
		//m:分
		//s:秒
		expires: '1M'
	};

	//单例模式，用于获取类的唯一实例
	LocalStorageBase.instance = function(){
		if (this._instance instanceof this) {
			return this._instance;
		};
		return this._instance = new this();
	};

	//用于子类继承
	LocalStorageBase.extend = Backbone.View.extend;

	return LocalStorageBase;
});