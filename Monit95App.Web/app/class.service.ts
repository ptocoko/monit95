import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

@Injectable()
export class ClassService {
	private readonly GET_CLASSES_URL: string = "/api/classes"

	constructor(private http: Http) { }

	getClassNames() {
		return this.http.get()
	}
}