import test from 'ava'
import MPS from './lib/mps.cjs.js'


const testTypes = [ 'str', 0, 1, null, undefined, {}, [], NaN, Infinity ]

test('.on()', (t) => {
	const mps = new MPS()
	const handler = (v) => (v)
	mps.on(handler)
	t.is(mps.__listeners[0], handler)
})

test('.on() with foreign context', (t) => {
	const mps = new MPS()
	const handler = (v) => (v)
	mps.on.call(null, handler)
	t.is(mps.__listeners[0], handler)
})

test('.on() with no fn', (t) => {
	const mps = new MPS()
	const errMsg = 'The first argument should be a function'
	testTypes.forEach((type) => {
		const error = t.throws(() => {
			mps.on(type)
		}, Error)
		t.is(error.message, errMsg)
	})
})

test('.off()', (t) => {
	const mps = new MPS()
	const handler = (v) => (v)
	mps.on(handler)
	t.is(mps.__listeners[0], handler)
	mps.off(handler)
	t.is(mps.__listeners.length, 0)
})

test('.off() with foreign context', (t) => {
	const mps = new MPS()
	const handler = (v) => (v)
	mps.on(handler)
	t.is(mps.__listeners[0], handler)
	mps.off.call(null, handler)
	t.is(mps.__listeners.length, 0)
})

test('.off() with no fn', (t) => {
	const mps = new MPS()
	testTypes.forEach((type) => {
		const returned = mps.off(type)
		t.is(returned, mps)
		t.is(mps.__listeners.length, 0)
	})
})

test('.on() then unsubscribe by calling returned fn', (t) => {
	const mps = new MPS()
	const handler = (v) => (v)
	const unsubscribe = mps.on(handler)
	t.is(mps.__listeners[0], handler)
	unsubscribe()
	t.is(mps.__listeners.length, 0)
})

test('.on() then unsubscribe with foreign context', (t) => {
	const mps = new MPS()
	const handler = (v) => (v)
	const unsubscribe = mps.on(handler)
	t.is(mps.__listeners[0], handler)
	unsubscribe.call(null)
	t.is(mps.__listeners.length, 0)
})

test('.emit()', (t) => {
	const mps = new MPS()
	const handler = (a1, a2, a3, ...rest) => {
		t.is(a1, 1)
		t.is(a2, 2)
		t.is(a3, 3)
		t.is(rest.length, 0)
	}
	mps.on(handler)
	mps.emit(1, 2, 3)
})

test('.emit() with foreign context', (t) => {
	const mps = new MPS()
	const handler = (a1, a2, a3, ...rest) => {
		t.is(a1, 1)
		t.is(a2, 2)
		t.is(a3, 3)
		t.is(rest.length, 0)
	}
	mps.on(handler)
	mps.emit.apply(null, [ 1, 2, 3 ])
})

test('method chaining', (t) => {
	const mps = new MPS()
	const handler = (a1, a2, a3, ...rest) => {
		t.is(a1, 1)
		t.is(a2, 2)
		t.is(a3, 3)
		t.is(rest.length, 0)
	}
	mps.on(handler)
	mps.emit(1, 2, 3).off(handler)
	t.is(mps.__listeners.length, 0)
})
