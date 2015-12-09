/*	管理历史记录
 * api: push, go, clear
 *
 * 将新的url入队，加入历史url中
 * 		如果出现以下情况，则队列中当前url之后的所有历史都将被清空：
 * 			1、url历史有多个，如：['/','/about','/account','/link']
 * 			2、当前指向'/about'
 * 			3、此时如果跳转到'/user'，则'/about'之后的'/account','/link'都将被抛弃，队列将变为：['/','/about','/user']
 * @param url {string} 当前要加入到历史中url地址
 * @return {boolean} 历史记录是否被成功记录
 * push:function(url){}
 *
 * 指向由num参数指定的url，
 * 		如果num<0 & num超范围，则指向第一个历史
 * 		如果num>0 & num超范围，则指向最后一个url地址
 *
 * @param num {int}
 * 		0:不做任何动作
 * 		-1:指向上一个url
 * 		1:指向下一个url
 * @param callback {function} 指向url之后的回调函数，参数为当前指向的url地址
 * @return {boolean} 是否成功指向历史记录
 * go:function(num,callback){}
 *
 * 清理掉所有的历史记录
 * clear:function(){}
 *
 * //返回历史记录个数
 * @return {int}
 * length:function(){}
 */
define('History',['LocalStorageBase'], function(StoreBase) {
	var Store = StoreBase.extend({
		key: 'HISTORY'
	});

	//
	var History = function() {
		this.store = Store.instance();
		this.clear();
		_.extend(this, this.store.get());
	};

	//instance methods
	_.extend(History.prototype, {
		//		将新的url入队，加入历史url中
		//		如果出现以下情况，则队列中当前url之后的所有历史都将被清空：
		//			1、url历史有多个，如：['/','/about','/account','/link']
		//			2、当前指向'/about'
		//			3、此时如果跳转到'/user'，则'/about'之后的'/account','/link'都将被抛弃，队列将变为：['/','/about','/user']
		// 		@param url {string} 当前要加入到历史中url地址
		//		@return {boolean} 历史记录是否被成功记录
		push: function(url) {
			if (!url) {
				return false;
			}
			//当前url与历史记录中的当前指向的url是同一个，不做处理
			if (url == this.queue[this.current]) {
				return false;
			}
			//当前指向的url不是最后一个，则设置当前url之后的所有url
			if (this.current < this.queue.length - 1) {
				this.queue = this.queue.slice(0, this.current + 1);
			}
			if (url == this.queue[this.queue.length - 1]) {
				return false;
			}
			this.queue.push(url);
			this.current = this.queue.length - 1;
			this._save();
			return true;
		},
		//指向由num参数指定的url，
		//		如果num<0 & num超范围，则指向第一个历史
		//		如果num>0 & num超范围，则指向最后一个url地址
		// 
		//@param num {int}
		//		0:不做任何动作
		//		-1:指向上一个url
		//		1:指向下一个url
		//@param callback {function} 指向url之后的回调函数，参数为当前指向的url地址
		//@return {boolean} 是否成功指向历史记录
		go: function(num, callback) {
			if (!num) {
				return false;
			}
			var target = this.current + num;
			target = target < 0 ? 0 : (target >= this.queue.length ? this.queue.length - 1 : target);
			//已经到了起始or末尾了，没有历史可循了
			if (target == this.current) {
				return false;
			}
			this.current = target;
			if (_.isFunction(callback)) {
				callback(this.queue[this.current]);
			}
			this._save();
			return true;
		},
		//清理掉所有的历史记录
		clear: function() {
			_.extend(this, {
				queue: [],
				current: 0
			});
			this._save();
		},
		//返回历史记录个数
		length: function() {
			return this.queue.length;
		},
		_save: function() {
			//记录到localStorage
			this.store.set({
				queue: this.queue,
				current: this.current
			});
		}
	});

	History.instance = function(){
		if (this._instance instanceof this) {
			return this._instance;
		};
		return this._instance = new this();
	};

	//extend 便于深度继承
	History.extend = StoreBase.extend;

	return History;
});