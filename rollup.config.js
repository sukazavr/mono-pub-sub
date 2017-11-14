import rimraf from 'rimraf'
import buble from 'rollup-plugin-buble'


rimraf.sync('lib')

export default {
	input: 'src/lib/index.js',
	plugins: [
		buble()
	],
	output: [
		{
			file: 'lib/mps.cjs.js',
			format: 'cjs'
		},
		{
			file: 'lib/mps.es.js',
			format: 'es'
		}
	]
}
