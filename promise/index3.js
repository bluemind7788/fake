// Promise.all Promise.race
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
	var promise = this
	return new Promise(function(resolve) {

		function handle(val) {
			var ret = typeof onFulfilled == 'function' && onFulfilled(val) || val
			if(typeof ret['then'] === 'function') {
				// 返回了一个promise对象
				ret.then(function(value) {
					resolve(value)
				})
			} else {
				resolve(ret)
			}
		}

		promise._resolves.push(handle)

	})
}

Promise.all = function(promises) {
	if(Object.prototype.toString.call(promises) !== '[object Array]') {
		throw new TypeError('You must pass an array')
	}
	return new Promise(function(resolve) {
		var len = promises.length,
			results = [],
			count = 0;

		promises.forEach(function(p) {
			p.then(function(d) {
				results.push(d)
				count++
				if(count === len) {
					resolve(results)
				}
			})
		})
	})
}

Promise.race = function(promises) {
	if(Object.prototype.toString.call(promises) !== '[object Array]') {
		throw new TypeError('You must pass an array')
	}
	return new Promise(function(resolve) {
		var resolved = false
		promises.forEach(function(p) {
			p.then(function(d) {
				if(resolved) return
				resolve(d)
				resolved = true
			})
		})
	})
}