import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AreaModel } from '../../../models/area.model';
import { SchoolModel } from '../../../models/school.model';
import { ClassSelectInfo } from '../../../models/vpr.model';
import { ClassService } from '../../../services/class.service';
import { VprService } from '../../../services/vpr.service';

@Component({
	templateUrl: `./app/components/vpr/class-selector/class-selector.component.html?v=${new Date().getTime()}`,
	selector: 'monit-class-selector',
	styles: [
		`.toggle-group { margin-top: 45px; }`
	]
})
export class ClassSelectorComponent {
	@Output() classSelected = new EventEmitter<ClassSelectInfo>();
	@Input() isLoadingFromOuter: boolean;
	classes: string[] = [];
	selectedClass: string;

	subjects: string[];
	selectedSubject: string;

	areas: AreaModel[] = [];
	selectedArea: number;

	schools: SchoolModel[] = [];
	selectedSchool: string;

	isLoading = true;
	classesMap = {
		'04': '4 класс',
		'05': '5 класс',
		'06': '6 класс',
		'07': '7 класс',
		'08': '8 класс',
	};
	subjectsMap = {
		'01': 'Русский язык',
		'02': 'Математика',
		'03': 'Физика',
		'06': 'Биология',
		'07': 'История',
		'08': 'География',
		'12': 'Обществознание',
		'24': 'Окружающий мир'
	};

	constructor(private vprService: VprService, private classService: ClassService) {}

	ngOnInit() {
		this.vprService.getClasses().subscribe(cls => {
			this.classes = cls;
			this.isLoading = false;
		});
	}

	selectClass(classNumber: string) {
		this.selectedClass = classNumber;

		this.subjects = null;
		this.selectedSubject = null;
		this.areas = null;
		this.selectedArea = null;
		this.schools = null;
		this.selectedSchool = null;
		this.classSelected.emit(null);

		this.isLoading = true;
		this.vprService.getSubjects(this.selectedClass).subscribe(sjs => {
			this.subjects = sjs;
			this.isLoading = false;
		})
	}

	selectSubject(subjectCode: string) {
		this.selectedSubject = subjectCode;

		this.areas = null;
		this.selectedArea = null;
		this.schools = null;
		this.selectedSchool = null;
		this.classSelected.emit(null);

		this.isLoading = true;
		this.vprService.getAreas(this.selectedClass, this.selectedSubject).subscribe(areas => {
			this.areas = areas;
			this.isLoading = false;
		});
	}

	selectArea(areaCode: number) {
		this.selectedArea = areaCode;

		this.schools = null;
		this.selectedSchool = null;
		this.classSelected.emit(null);

		this.isLoading = true;
		this.vprService.getSchools(this.selectedClass, this.selectedSubject, this.selectedArea).subscribe(schools => {
			this.schools = schools;
			this.isLoading = false;
		})
	}

	selectSchool(schoolId: string) {
		this.selectedSchool = schoolId;

		const classInfo: ClassSelectInfo = {
			Subject: this.selectedSubject,
			ClassNumber: this.selectedClass,
			AreaCode: this.selectedArea,
			SchoolId: this.selectedSchool
		};
		this.classSelected.emit(classInfo);
	}
}