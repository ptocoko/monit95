import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileService {
	private readonly endpoint = '/api/repositories';

	constructor(private http: HttpClient) { }

	uploadFile(repositoryId: number, file: File, fileName?: string, useHashAsFileName = true): Observable<string> {
		const formData = new FormData();
		formData.append('file', file, fileName ? fileName : file.name);
		return this.http.post(`${this.endpoint}/${repositoryId}/files`, formData, { responseType: 'text', params: { 'useHashAsFileName': `${useHashAsFileName}` } });
	}
}