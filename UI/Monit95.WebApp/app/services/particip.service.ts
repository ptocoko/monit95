import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { ParticipModel } from "../models/particip.model";
import { ParticipWithMarks } from "../rsur/rsur-test-protocol/marks.service";

@Injectable()
export class ParticipService {
	private GET_ALL_PARTICIPS_URL: string = "/api/particips/GetAll?projectId=";
	private GET_PROTOCOLS_URL = '/api/particips/protocols?projectId=';
	private endpoint: string = "/api/particips/";
	
	constructor(private http: HttpClient) { }

	getAll(projectId: number): Observable<ParticipModel[]> {
		//return this.http.get<ParticipModel[]>(this.GET_ALL_PARTICIPS_URL + projectId);
		return Observable.of(mockParticipsList);
	}

	getParticip(participId: number) {
		//return this.http.get<ParticipModel>(this.endpoint + participId);
		return Observable.of(mockParticipsList.find(f => f.Id === participId));
	}

	addParticip(particip: ParticipModel) {
		//return this.http.post(this.endpoint, particip, { responseType: 'text' });
		mockParticipsList.push(particip);
		return Observable.of('hehe');
	}

	updateParticip(particip: ParticipModel) {
		throw Error('this method not implemented');
	}

	deleteParticip(documNumber: number) {
		//return this.http.delete(this.endpoint + participId, { responseType: 'text' });
		const participIndex = mockParticipsList.indexOf(mockParticipsList.find(f => f.DocumNumber === documNumber));
		mockParticipsList.splice(participIndex, 1);
		return Observable.of('hah');
	}
}

const mockParticipsList: ParticipModel[] = [
	{
		Id: 1,
		Surname: 'Test1',
		Name: 'Test2',
		SecondName: 'Test3',
		ProjectId: 12,
		DocumNumber: 12345,
		SourceName: 'РЦОИ',
		ClassName: '1a',
		Birthday: '12.11.2009',
		SchoolId: '0005',
		SchoolName: 'президентская школа'
	},
	{
		Id: 2,
		Surname: 'Test1',
		Name: 'Test2',
		SecondName: 'Test3',
		ProjectId: 12,
		DocumNumber: 65432,
		SourceName: 'Школа',
		ClassName: '1a',
		Birthday: '12.11.2009',
		SchoolId: '0005',
		SchoolName: 'президентская школа'
	},
	{
		Id: 3,
		Surname: 'длиннаяфамилия',
		Name: 'heheheheh',
		SecondName: 'оченьдлинноеотчество',
		ProjectId: 12,
		DocumNumber: 98745,
		SourceName: 'Школа',
		ClassName: '1a',
		Birthday: '12.11.2009',
		SchoolId: '0005',
		SchoolName: 'президентская школа'
	}
]