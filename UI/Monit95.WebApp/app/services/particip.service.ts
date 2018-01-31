import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { ParticipModel } from "../models/particip.model";
import { ParticipWithMarks } from "../rsur/rsur-test-protocol/marks.service";

const dataSourceMapperFunc = (particip: ParticipModel) => {
	switch (particip.DataSource) {
		case 'school':
			particip.DataSource = 'Школа';
			break;
		default:
			break;
	}
	return particip;
}

@Injectable()
export class ParticipService {
	private endpoint: string = "/api/ITakeEGE/participants/";
	
	constructor(private http: HttpClient) { }

	getAll(projectId: number): Observable<ParticipModel[]> {
		return this.http.get<ParticipModel[]>(this.endpoint).map(particips => {
			particips.forEach(dataSourceMapperFunc);
			return particips;
		});
		//return Observable.of(mockParticipsList);
	}

	getParticip(participId: number): Observable<ParticipModel> {
		return this.http.get<ParticipModel>(this.endpoint + participId).map(dataSourceMapperFunc);
		//return Observable.of(mockParticipsList.find(f => f.Id === participId));
	}

	postParticip(particip: ParticipModel) {
		return this.http.post(this.endpoint, particip, { responseType: 'text' });
		//mockParticipsList.push(particip);
		//return Observable.of('hehe');
	}

	putParticip(particip: ParticipModel, participId: number) {
		return this.http.put(this.endpoint + participId, particip, { responseType: 'text' });
	}

	deleteParticip(participId: number) {
		return this.http.delete(this.endpoint + participId, { responseType: 'text' });
		//const participIndex = mockParticipsList.indexOf(mockParticipsList.find(f => f.DocumNumber === documNumber));
		//mockParticipsList.splice(participIndex, 1);
		//return Observable.of('hah');
	}
}

const mockParticipsList: ParticipModel[] = [
	{
		Id: 1,
		Surname: 'Test1',
		Name: 'Test2',
		SecondName: 'Test3',
		DocumNumber: 12345,
		DataSource: 'РЦОИ'
	},
	{
		Id: 2,
		Surname: 'Test1',
		Name: 'Test2',
		SecondName: 'Test3',
		DocumNumber: 65432,
		DataSource: 'Школа',
	},
	{
		Id: 3,
		Surname: 'длиннаяфамилия',
		Name: 'heheheheh',
		SecondName: 'оченьдлинноеотчество',
		DocumNumber: 98745,
		DataSource: 'Школа'
	}
]