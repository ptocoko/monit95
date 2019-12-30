export function getFileExtension(name) {
    return name.split('.').pop().toLowerCase();
}
export function downloadFile(fileUrl, nameWithExtension) {
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = fileUrl;
    a.download = nameWithExtension;
    a.click();
    a.remove();
}
//# sourceMappingURL=functions.js.map