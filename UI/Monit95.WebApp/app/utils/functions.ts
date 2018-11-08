export function getFileExtension(name: string) {
	return name.split('.').pop().toLowerCase();
}

export function downloadFile(fileUrl: string, nameWithExtension: string) {
	var a = document.createElement('a');
	document.body.appendChild(a);
	a.setAttribute('style', 'display: none');
	a.href = fileUrl;
	a.download = nameWithExtension;
	a.click();
	a.remove();
}