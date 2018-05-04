import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { ClassModel } from '../models/class.model';

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

	getClasses(): Observable<ClassModel[]> {
		return this.http.get<ClassModel[]>(this.GET_CLASSES_URL);
	}
}