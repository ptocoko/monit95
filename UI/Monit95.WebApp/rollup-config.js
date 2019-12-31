import rollup from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import { terser } from 'rollup-plugin-terser';
import cshtml from './rollup-plugin-2cshtml';

export default {
	input: 'app/main.js',
	output: {
		dir: 'app/dist', // output a single application bundle
		entryFileNames: '[name].[hash].js',
		chunkFileNames: '[name].[hash].js',
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
		cshtml({
			dist: 'app/dist',
			destFilename: 'Views/Rsur/Spa.cshtml',
			template: `@{
    ViewBag.Title = "Monit95";
}
<!-- Angular Code -->
<base href="/">

@*
    <script src="node_modules/systemjs/dist/system.src.js"></script>
    <script src="systemjs.config.js?v=416"></script>
    <script>
        System.import('app').catch(function (err) {
            console.error(err);
        });
    </script>*@

<app-root>
    <img style="margin-top:20px" height="100" class="center-block" src="~/progress.gif" />
</app-root>
<script src="node_modules/core-js/client/shim.min.js"></script>
<script src="node_modules/zone.js/dist/zone.js"></script>
`
		}),
		nodeResolve({ mainFields: ['module', 'jsnext:main'] }),
		commonjs({
			include: 'node_modules/rxjs/**'
		}),
		terser()
	]
};
