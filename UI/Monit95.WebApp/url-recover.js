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
		} else if (filename.test(filter)) {
			console.log(filename);
			const content = fs.readFileSync(filename, { flag: 'r+' });
			const templateUrlLine = content.toString().test(/templateUrl/);
			console.log(content);
			console.log(templateUrlLine);
			break;
		}
	}
}

fromDir('./');