
export default class MPS {

	constructor () {

		this.__listeners = []

		this.on = this.on.bind(this)
		this.off = this.off.bind(this)
		this.emit = this.emit.bind(this)
	}

	on (listener) {

		this.__listeners.push(listener)

		return this.off.bind(this, listener)
	}

	off (listener) {

		const listeners = this.__listeners
		const l = listeners.length

		for (let i = 0; i < l; i++) {

			if (listeners[i] === listener) {

				listeners.splice(i, 1)

				break
			}
		}
	}

	emit () {
		const listeners = this.__listeners
		const l = listeners.length

		for (let i = 0; i < l; i++) {
			(listeners[i]).apply(null, arguments)
		}
	}
}
