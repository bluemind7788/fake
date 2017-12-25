// 基本结构
;(function() {
	function VNode(tag, data, children, text, elm){
		this.tag = tag
		this.data = data
		this.children = children
		this.text = text
		this.elm = elm
	}

	VNode.prototype.render = function() {
		var _this = this
		if(this.tag) {
			// 非textnode
			this.elm = document.createElement(this.tag)
			if(this.data != undefined) {
				for(var k in this.data) {
					this.elm.setAttribute(k, this.data[k])
				}
			}
			if(this.children) {
				this.children.forEach(function(c) {
					_this.elm.appendChild(c.render())
				})
			}
		} else {
			this.elm = document.createTextNode(this.text)
		}
		return this.elm
	}

	function normalizeChildren(children) {
		if(typeof children === 'string') {
			return [createTextNode(children)]
		}
		return children
	}

	function createTextNode(val) {
		return new VNode(undefined, undefined, undefined, String(val))
	}

	function createElement(tag, data, children) {
		return new VNode(tag, data, normalizeChildren(children), undefined, undefined)
	}

	function patch(node, patches) {
		
	}

	var patches = []

	function diff(oldTree, newTree) {
		
	}

	function diffProps() {
		
	}

	window.createElement = createElement
	window.createTextNode = createTextNode
	window.VNode = VNode

})()

