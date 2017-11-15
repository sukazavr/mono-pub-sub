import test from 'ava'
import MPS from './lib/mps.cjs.js'


test('.on()', (t) => {
	const mps = new MPS()
	const handler = (v) => (v)
	mps.on.call(null, handler)
	t.is(mps.__listeners[0], handler)
})

test('.on() then .off()', (t) => {
	const mps = new MPS()
	const handler = (v) => (v)
	mps.on.call(null, handler)
	t.is(mps.__listeners[0], handler)
	mps.off.call(null, handler)
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
	mps.on.call(null, handler)
	mps.emit.apply(null, [ 1, 2, 3 ])
})
