import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { VprStatsModel, VprWeekSchool } from '../models/vpr.model';
import { AreaModel } from '../models/area.model';
import { SchoolModel } from '../models/school.model';

@Injectable()
export class VprService {
    constructor(private http: HttpClient) { }

    getSchoolWeek(classNumber: string, subjectCode: string) {
        const params = new HttpParams();
        params.append('classNumber', classNumber);
        params.append('subjectCode', subjectCode);

        return this.http.get<VprWeekSchool[]>(`/api/vpr?classNumber=${classNumber}&subjectCode=${subjectCode}`);
    }

    saveSchoolWeek(schoolWeek: VprWeekSchool) {
        return this.http.post('/api/vpr', schoolWeek, { responseType: 'text' });
    }

    getClasses() {
        return this.http.get<string[]>('/api/vpr/classes');
    }

    getSubjects(classNumber: string) {
        return this.http.get<string[]>('/api/vpr/subjects?classNumber=' + classNumber);
    }

    getAreas(classNumber: string, subjectCode: string) {
        return this.http.get<AreaModel[]>('/api/vpr/areas?classNumber=' + classNumber + '&subjectCode=' + subjectCode);
    }

    getSchools(classNumber: string, subjectCode: string, areaCode: number) {
        return this.http.get<SchoolModel[]>('/api/vpr/schools?classNumber=' + classNumber + '&subjectCode=' + subjectCode + '&areaCode=' + areaCode);
    }

    getStats(classNumber: string, subjectCode: string, schoolId: string) {
        return this.http.get<VprStatsModel>('/api/vpr/statistics?classNumber=' + classNumber + '&subjectCode=' + subjectCode + '&schoolId=' + schoolId);
    }
    canSendSecond(classNumber: string, subjectCode: string, schoolId: string) {
        let schoolInfo = {'classNumber': classNumber, 'subjectCode': subjectCode, 'schoolId': schoolId}
        return this.http.post('/api/vpr', schoolInfo ,{ responseType: 'text' });
    }
}
