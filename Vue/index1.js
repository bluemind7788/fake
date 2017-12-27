function Vue(options) {
	this.options = options
	this.$el = options.el
	var vm = this

	this.watcher = new Watcher(this, function() {
		vm.render()
	})

	this._data = {}

	for(var k in options.data) {
		defineReactive(this._data, k, options.data[k], this.watcher)
	}

	this.mount()

}

Vue.prototype.mount = function() {
	this.render()
}

Vue.prototype.render = function() {
	var rootEl = document.querySelector(this.$el)
	var cloneNode = rootEl.cloneNode(true)
	var data = this._data

	walk(cloneNode)

	function walk(el) {
		if(el.nodeType == 1 && el.getAttribute('v-text')) {
			el.innerHTML = data[el.getAttribute('v-text')]
		}
		var children = el.childNodes
		if(!children || children.length == 0) return
		children.forEach(function(ch) {
			if(ch.nodeType == 1) {
				walk(ch)
			}
		})
	}
	rootEl.replaceWith(cloneNode)
}

function defineReactive(obj, key, val, watcher) {
	var dep = new Dep()
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get: function() {
			dep.addSub(watcher)
			return val
		}, 
		set: function(newVal) {
			if(newVal == val) return 
			val = newVal
			dep.notify()
		}
	})
}

function Dep() {
	this.subs = []
}

Dep.prototype.addSub = function(watcher) {
	this.subs.push(watcher)
}

Dep.prototype.notify = function(newVal) {
	this.subs.forEach(function(sub) {
		sub.update()
	})
}

function Watcher(vm, cb) {
	this.vm = vm
	this.cb = cb
}

Watcher.prototype.update = function() {
	this.cb.call(this.vm)
}