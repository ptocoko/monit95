const fs = require('fs');
const path = require('path');

function fromDir(startPath, filter) {
	if (!fs.existsSync(startPath)) {
		console.log("no dir ", startPath);
		return;
	}

	const files = fs.readdirSync(startPath);
	for (let i = 0; i < files.length; i++) {
		const filename = path.join(startPath, files[i]);
		const stat = fs.lstatSync(filename);
		if (stat.isDirectory()) {
			fromDir(filename, filter);
		} else if (filter.test(filename)) {
			console.log(filename);
			let content = fs.readFileSync(filename).toString();
			if (/templateUrl.+/.test(content)) {
				const urlLine = content.match(/templateUrl.+/)[0];
				const url = urlLine.match(/\..+(?=`)/)[0];
				const newUrl = url.split('/').pop().split('?')[0];
				content = content.replace(/templateUrl.+/, 'templateUrl: \'./' + newUrl + '\',');

				fs.writeFileSync(filename, content);
			}
		}
	}
}

fromDir('./', /component.ts$/);