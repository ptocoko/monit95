import rollup from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

export default {
	input: 'app/main.js',
	output: {
		file: 'app/dest/build.js', // output a single application bundle
		format: 'iife',
		sourcemap: true,
		//sourceMapFile: 'app/dest/build.js.map'
	},
	onwarn: function (warning) {
		// Skip certain warnings

		// should intercept ... but doesn't in some rollup versions
		if (warning.code === 'THIS_IS_UNDEFINED') { return; }
		// intercepts in some rollup versions
		if (warning.message.indexOf("The 'this' keyword is equivalent to 'undefined'") > -1) { return; }

		// console.warn everything else
		console.warn(warning.message);
	},
	plugins: [
		nodeResolve({ mainFields: ['module', 'jsnext:main'] }),
		commonjs({
			include: 'node_modules/rxjs/**'
		}),
		uglify()
	]
};
