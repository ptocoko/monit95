import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AreaModel } from '../../../models/area.model';
import { SchoolModel } from '../../../models/school.model';
import { ClassSelectInfo, VprSchoolMarks, VprWeekSchool } from '../../../models/vpr.model';
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
	AbleSendSecond: boolean;

/*	goToBottom() {
		window.scrollTo(0, document.body.scrollHeight);
	}*/
	subjects: string[];
	selectedSubject: string;
	schoolMarks: VprSchoolMarks[];
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
			/*Это делается для мониторинга, что бы могли видеть те школы которые внесли и НЕ ВНЕСЛИ результаты*/
			this.classes = ['04', '05', '06', '07', '08'];
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
		console.log('class');

		this.isLoading = true;
		this.vprService.getSubjects(this.selectedClass).subscribe(sjs => {
			/*Also to show schools which didnt submit their results*/
			this.subjects = ['01', '02','03', '06', '07', '08', '12', '24'];
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
		console.log('subje');
		// This is for showing all areas even if they donot have results yet

		this.vprService.getAreas("bypass", "bypass").subscribe(areas => {
			this.areas = areas;
			this.isLoading = false;
			console.log('dwd')
		});
	}

	selectArea(areaCode: number) {
		this.selectedArea = areaCode;

		this.schools = null;
		this.selectedSchool = null;
		this.classSelected.emit(null);
		console.log('area')

		this.isLoading = true;
		this.vprService.getSchools("classNumber", this.selectedSubject, this.selectedArea).subscribe(schools => {
		
			this.schools = schools;
			this.isLoading = false;
			this.AbleSendSecond = false;
		})
	}
	
	selectSchool(schoolId: string) {
		this.vprService.getSchools(this.selectedClass, this.selectedSubject, this.selectedArea).subscribe(schools => {

		})
		this.selectedSchool = schoolId;

		const classInfo: ClassSelectInfo = {
			Subject: this.selectedSubject,
			ClassNumber: this.selectedClass,
			AreaCode: this.selectedArea,
			SchoolId: this.selectedSchool
		};
		console.log(classInfo)
		this.classSelected.emit(classInfo);
	}

	ableSendSecond(schoolId: string) {

		/*Marks2: number;
		  Marks3: number;
		  Marks4: number;
		  Marks5: number;
		  ClassId: string;*/

		this.schoolMarks = [{
			Marks2: 0,
			Marks3: 0,
			Marks4: 0,
			Marks5: 0,
			ClassId: schoolId
		}];
		const SecChance: VprWeekSchool = {
			ClassNumber: this.selectedClass,
			SubjectCode: this.selectedSubject,
			VprSchoolMarks: this.schoolMarks,
			HasError: true,
			IsSecond: true,
			AbleSendSecond: true
		};
		/*this.vprService.saveSchoolWeek(weekRes).subscribe(() => {
			this.blocked = true;
			this.hasFirst = true;

			if (this.hasAnyError()) {
				this.showErrors = true;
			}
		});*/


		this.vprService.canSendSecond(SecChance).subscribe(() => {

		});
		this.AbleSendSecond = false;
	}
}