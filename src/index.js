
export default class MPS {

	constructor () {
		this.__listeners = []
		this.on = this.on.bind(this)
		this.off = this.off.bind(this)
		this.emit = this.emit.bind(this)
	}

	on (listener) {
		if (typeof listener !== 'function')
			throw new Error('The first argument should be a function')
		this.__listeners.push(listener)
		return this.off.bind(this, listener)
	}

	off (listener) {
		const listeners = this.__listeners
		const index = listeners.indexOf(listener)
		if (~index) listeners.splice(index, 1)
		return this
	}

	emit () {
		const listeners = this.__listeners
		let l = listeners.length
		while (l--) {
			(listeners[l]).apply(null, arguments)
		}
		return this
	}
}
