"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getFileExtension(name) {
    return name.split('.').pop().toLowerCase();
}
exports.getFileExtension = getFileExtension;
function downloadFile(fileUrl, nameWithExtension) {
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = fileUrl;
    a.download = nameWithExtension;
    a.click();
    a.remove();
}
exports.downloadFile = downloadFile;
//# sourceMappingURL=functions.js.map