// 基本结构
function Promise(resolver) {
	var promise = this
	promise._resolve = null

	var resolve = function(val) {
		promise._resolve()
	}

	resolver(resolve)
}

Promise.prototype.then = function(onFulfilled) {
	this._resolve = onFulfilled
	return this
}