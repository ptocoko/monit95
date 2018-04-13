import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ClassService {
	private readonly GET_CLASSES_URL: string = "/api/classes"

	constructor(private http: HttpClient) { }

	getClassNames(): Observable<string[]> {
		return this.http.get(this.GET_CLASSES_URL).map((res: any[]) => {
			return res.map((schoolClass: any) => {
				return schoolClass.Name;
			});
		});
	}
}