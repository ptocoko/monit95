import { Component } from '@angular/core';
import { AreaModel } from '../../../models/area.model';
import { SchoolModel } from '../../../models/school.model';
import { VprStatsModel } from '../../../models/vpr.model';
import { ClassService } from '../../../services/class.service';
import { VprService } from '../../../services/vpr.service';

type MinMax = { [classNumber: string]: { [subjectCode: string]: { min2: number, max5: number } } };

@Component({
	templateUrl: `./app/components/vpr/admin/admin.component.html?v=${new Date().getTime()}`,
})
export class AdminComponent {

}