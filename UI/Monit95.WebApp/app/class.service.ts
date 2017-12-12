import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ClassService {
	private readonly GET_CLASSES_URL: string = "/api/classes"

	constructor(private http: Http) { }

	getClassNames(): Observable<string[]> {
		return this.http.get(this.GET_CLASSES_URL).map((res: Response) => {
			let classes = res.json();
			return classes.map((schoolClass: any) => {
				return schoolClass.Name;
			});
		});
	}
}