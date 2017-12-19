// 异步链式调用
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
	return new Promise(function(resolve) {

		function handle(val) {
			var ret = typeof onFulfilled == 'function' && onFulfilled(val) || val
			resolve(ret)
		}

		promise._resolves.push(handle)

	})
}