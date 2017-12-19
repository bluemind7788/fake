// 基本结构
function Promise(resolver) {
	var promise = this
	promise._resolves = []

	var resolve = function(val) {
		promise._resolves.forEach(function(callback) {
			callback(val)
		})
	}

	resolver(resolve)
}

Promise.prototype.then = function(onFulfilled) {
	this._resolves.push(onFulfilled)
	return this
}