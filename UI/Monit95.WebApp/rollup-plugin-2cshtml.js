import { writeFileSync } from 'fs';

export default (opt = {}) => {
	let { dist, template, destFilename } = opt;

	return {
		name: 'cshtml',
		writeBundle(bundle) {
			Object.keys(bundle).forEach(bundleName => {
				const bundlePath = `${dist}/${bundleName}`;
				template += `<script type="text/javascript" src="${bundlePath}"></script>\n`;
			});

			writeFileSync(destFilename, template);
		}
	};
};
