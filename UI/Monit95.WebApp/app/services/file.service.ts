import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileService {
	private readonly endpoint = '/api/repositories';

	constructor(private http: HttpClient) { }

	uploadFile(repositoryId: number, file: File, fileName?: string, useHashAsFileName: boolean = true, checkIfFileExists: boolean = true): Observable<string> {
		const formData = new FormData();
		formData.append('file', file, fileName ? fileName : file.name);
		return this.http.post(`${this.endpoint}/${repositoryId}/files`, formData, {
			responseType: 'text',
			params: {
				'useHashAsFileName': `${useHashAsFileName}`,
				'checkIfFileExists': `${checkIfFileExists}`
			}
		});
	}

	getFileId(fileName: string, repositoryId: number) {
		const params = new HttpParams();
		params.append('filename', fileName);
		params.append('repositoryId', repositoryId.toString());

		return this.http.get<number>('/api/files/' + fileName + '/' + repositoryId);
	}

	deleteFile(fileId: number) {
		return this.http.delete(`api/files/${fileId}`, { responseType: 'text' });
	}

	downloadFile(fileId: number, fileName: string) {
		this.http.get('/api/files/' + fileId, { responseType: 'blob' }).subscribe(file => {
			var url = window.URL.createObjectURL(file);
			var a = document.createElement('a');
			document.body.appendChild(a);
			a.setAttribute('style', 'display: none');
			a.href = url;
			a.download = fileName;
			a.click();
			window.URL.revokeObjectURL(url);
			a.remove();
		});
	}
}

export class UploadFileOptions {
	useHashAsFileName: boolean = true;
	checkIfFileExists: boolean = true;
}