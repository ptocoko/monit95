import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { empty } from 'rxjs/Observer';
import { ClassModel } from '../../../models/class.model';
import { VprSchoolMarks, VprWeekSchool } from '../../../models/vpr.model';
import { ClassService } from '../../../services/class.service';
import { VprService } from '../../../services/vpr.service';

@Component({
	templateUrl: `./app/components/vpr/home/home.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/vpr/home/home.component.css?v=${new Date().getTime()}`],
})
export class HomeComponent implements OnInit {
	classes: ClassesModel[] = [
		{
			number: '04',
			name: '4 класс',
			subjects: [
				{ code: '01', name: 'Русский язык' },
				{ code: '02', name: 'Математика' },
				{ code: '24', name: 'Окружающий мир' },
			]
		},
		{
			number: '05',
			name: '5 класс',
			subjects: [
				{ code: '01', name: 'Русский язык' },
				{ code: '02', name: 'Математика' },
				{ code: '06', name: 'Биология' },
				{ code: '07', name: 'История' },
			]
		},
		{
			number: '06',
			name: '6 класс',
			subjects: [
				{ code: '01', name: 'Русский язык' },
				{ code: '02', name: 'Математика' },
			]
		},
		{
			number: '07',
			name: '7 класс',
			subjects: [
				{ code: '01', name: 'Русский язык' },
				{ code: '02', name: 'Математика' },
				/*{ code: '03', name: 'Физика' },
				{ code: '06', name: 'Биология' },
				{ code: '07', name: 'История' },
				{ code: '08', name: 'География' },
				{ code: '12', name: 'Обществознание' },*/
			]
		},
		{
			number: '08',
			name: '8 класс',
			subjects: [
				{ code: '01', name: 'Русский язык' },
				{ code: '02', name: 'Математика' },
			]
		},
	];
	minMax: MinMax = {
		'04': {
			'01': {
				min2: 15,
				max4: 40,
				max5: 5  
			},
			'02': {
				min2: 12,
				max4: 40,
				max5: 8,
			},
			'24': {
				min2: 10,
				max4: 40,
				max5: 5
			},
		},
		'05': {
			'01': {
				min2: 15,
				max4: 40,
				max5: 5
			},
			'02': {
				min2: 15,
				max4: 40,
				max5: 8,
			},
			'06': {
				min2: 15,
				max4: 40,
				max5: 5,
			},
			'07': {
				min2: 12,
				max4: 40,
				max5: 8,
			}
		},
		'06': {
			'01': {
				min2: 15,
				max4: 40,
				max5: 6,
			},
			'02': {
				min2: 15,
				max4: 40,
				max5: 6,
			},
		},
		'07': {
			'01': {
				min2: 15,
				max4: 40,
				max5: 5,
			},
			'02': {
				min2: 15,
				max4: 40,
				max5: 5,
			},
			'03': {
				min2: 15,
				max4: 40,
				max5: 5,
			},
			'06': {
				min2: 15,
				max4: 40,
				max5: 5,
			},
			'07': {
				min2: 13,
				max4: 40,
				max5: 5,
			},
			'08': {
				min2: 15,
				max4: 40,
				max5: 4,
			},
			'12': {
				min2: 16,
				max4: 40,
				max5: 5
			}
		},
		'08': {
			'01': {
				min2: 20,
				max4: 40,
				max5: 5,
			},
			'02': {
				min2: 15,
				max4: 40,
				max5: 5,
			},
		},
	};
	selectedClass: ClassesModel;
	selectedSubj: SubjectModel;
	classNames: ClassModel[] = [];
	weekResults: VprWeekSchool;
	newSchoolMarks: Partial<VprSchoolMarks>[] = [];
	blocked = false;
	hasFirst = false;
	hasSecond = false;
	showErrors = false;
	totalAvgGrades: number[][];
	totalEachAvgGrads: number[];
	//showUnblockBtn = false;

	constructor(private vprService: VprService, private classService: ClassService) { }

	ngOnInit() {
		this.classService.getClasses().subscribe(c => this.classNames = c.filter(cl => !cl.Id.endsWith('00')));
	}
	AvgSum() {
		let count = 0;
		this.totalAvgGrades = [];
		this.totalEachAvgGrads = [];
		let pushMarks = (mark: number, num: number) => {
			if (mark) {
				if (typeof this.totalAvgGrades[num] == "undefined") {
					this.totalAvgGrades[num] = [];
				}
				this.totalAvgGrades[num][count] = mark;
			}
		}
		this.newSchoolMarks.forEach((vals)=> {
			pushMarks(vals.Marks2, 0);	
			pushMarks(vals.Marks3, 1);	
			pushMarks(vals.Marks4, 2);	
			pushMarks(vals.Marks5, 3);
			count += 1;
		})
		for (let i = 0; i < this.totalAvgGrades?.length; i++) {
			let lengthOfTotal:number = this.totalAvgGrades[i]?.length;
			this.totalEachAvgGrads[i] = 0;
			for (let j = 0; j < this.totalAvgGrades[i]?.length; j++)  {
				
				this.totalEachAvgGrads[i] += this.totalAvgGrades[i][j];	
			}
			
			this.totalEachAvgGrads[i] = Math.round(((this.totalEachAvgGrads[i] / lengthOfTotal) + Number.EPSILON) * 100) / 100;
			if (!this.totalAvgGrades[i]) {
				this.totalEachAvgGrads[i] = 0;
			}
		}
		console.log(this.totalEachAvgGrads)
	}
	getClassesByNumber() {
		return this.classNames.filter(c => c.Id.substring(0, 2) === this.selectedClass.number);
    }

	classChanged(e: MatButtonToggleChange) {
		this.selectedClass = e.value;
		this.selectedSubj = null;
		this.showErrors = false;
    }

	subjectChanged(e: MatButtonToggleChange) {
		this.selectedSubj = e.value;
		this.getWeekResult();
	}

	getWeekResult() {
		this.weekResults = null;
		this.newSchoolMarks = [];
		this.blocked = false;
		this.showErrors = false;
		this.hasFirst = false;
		this.hasSecond = false;
		this.vprService.getSchoolWeek(this.selectedClass.number, this.selectedSubj.code).subscribe(res => {
			if (res.length > 0) {
				this.weekResults = res[res.length - 1];
				this.newSchoolMarks = this.weekResults.VprSchoolMarks;

				this.hasFirst = true;
				this.blocked = true;
				if (res.length === 2) {
					this.hasSecond = true;
				} else if (this.hasAnyError()) {
					this.showErrors = true;
				}
				this.AvgSum();
			} else {
				this.totalEachAvgGrads = [null, null, null, null];
				this.weekResults = {} as VprWeekSchool;
				this.newSchoolMarks = [];
				this.hasFirst = false;
				this.hasSecond = false;
            }
		});
	}

	getMark(markName: keyof Omit<VprSchoolMarks, 'ClassId'>, classId: string) {
		return this.newSchoolMarks.filter(m => m.ClassId === classId)[0]?.[markName];
    }

	setMark(markName: keyof Omit<VprSchoolMarks, 'ClassId'>, classId: string, val: number) {
		if (val as any as string === '') {
            let schoolMarks = this.newSchoolMarks.filter(m => m.ClassId === classId)[0];
			schoolMarks[markName] = undefined;
			if (!valueOrZero(schoolMarks.Marks2) && !valueOrZero(schoolMarks.Marks3) && !valueOrZero(schoolMarks.Marks4) && !valueOrZero(schoolMarks.Marks5)) {
				this.newSchoolMarks = this.newSchoolMarks.filter(m => m.ClassId !== classId);
			} else {
				this.newSchoolMarks = this.newSchoolMarks.filter(m => m.ClassId !== classId).concat([schoolMarks]);
            }
			return;
        }
		if (isNaN(+val)) {
			return;
		}
		val = +val;
		let schoolMarks = this.newSchoolMarks.filter(m => m.ClassId === classId)[0];
		if (schoolMarks) {
			schoolMarks[markName] = val;
		} else {
			schoolMarks = { [markName]: val, ClassId: classId };
		}

		this.newSchoolMarks = this.newSchoolMarks.filter(m => m.ClassId !== classId).concat([schoolMarks]);
    }

	isClassRowsValid() {
		return this.newSchoolMarks.length > 0 && this.newSchoolMarks.every(m => valueOrZero(m.Marks2) && valueOrZero(m.Marks3) && valueOrZero(m.Marks4) && valueOrZero(m.Marks5));
	}

	checkForm() {
		if (confirm('В систему предупреждения необъективного оценивания ВПР на monit95  результаты необходимо вносить только после того, как будут проведены ВПР во всей параллели одного класса!')) {
            const weekRes: VprWeekSchool = {
                ClassNumber: this.selectedClass.number,
                SubjectCode: this.selectedSubj.code,
                VprSchoolMarks: this.newSchoolMarks as VprSchoolMarks[],
                HasError: this.hasAnyError(),
                IsSecond: this.hasFirst
            };
            this.vprService.saveSchoolWeek(weekRes).subscribe(() => {
                this.blocked = true;
                this.hasFirst = true;
                if (this.hasAnyError()) {
                    this.showErrors = true;
                }
            });

        }
	}

	unblock() {
        this.blocked = false;
        this.showErrors = false;
	}

	sendSecond() {
		if (confirm('Уважаемый Хож-Бауди Буарович! Настоящим я подтверждаю, что результаты ВПР нашей школы, в которых  ЦОКО были выявлены признаки необъективности, нами перепроверены. Объективность перепроверенных результатов удостоверяю.')) {
			this.weekResults.ClassNumber = this.selectedClass.number;
			this.weekResults.SubjectCode = this.selectedSubj.code;
			this.weekResults.HasError = this.hasAnyError();
			this.weekResults.IsSecond = true;
			this.weekResults.VprSchoolMarks = this.newSchoolMarks as VprSchoolMarks[];
			this.vprService.saveSchoolWeek(this.weekResults).subscribe(() => {
				this.blocked = true;
				this.hasSecond = true;
			});
		}
    }

	hasAnyError() {
		if (!this.selectedClass || !this.selectedSubj) {
			return false;
        }
		const min2 = this.minMax[this.selectedClass.number][this.selectedSubj.code].min2;
		const max5 = this.minMax[this.selectedClass.number][this.selectedSubj.code].max5;
		return !this.isClassRowsValid() || this.newSchoolMarks.some(m => m.Marks2 < min2 || m.Marks5 > max5 || Math.round(m.Marks2 + m.Marks3 + m.Marks4 + m.Marks5) !== 100);
	}

	isMark2HasError(classId: string) {
		const minMax = this.minMax[this.selectedClass.number][this.selectedSubj.code];
		let schoolMarks = this.newSchoolMarks.filter(m => m.ClassId === classId)[0];
		if (!schoolMarks) {
			return false;
        }
		return schoolMarks.Marks2 < minMax.min2;
    }

	isMark4HasError(classId: string) {
		const minMax = this.minMax[this.selectedClass.number][this.selectedSubj.code];
		let schoolMarks = this.newSchoolMarks.filter(m => m.ClassId === classId)[0];
		if (!schoolMarks) {
			return false;
		}
		return schoolMarks.Marks4 > minMax.max4;
	}

	isMark5HasError(classId: string) {
		const minMax = this.minMax[this.selectedClass.number][this.selectedSubj.code];
		let schoolMarks = this.newSchoolMarks.filter(m => m.ClassId === classId)[0];
		if (!schoolMarks) {
			return false;
        }
		return schoolMarks.Marks5 > minMax.max5;
	}
	AvgItogFilter(mark: string, value: number) {
		const minMax = this.minMax[this.selectedClass.number][this.selectedSubj.code];
		if (!this.newSchoolMarks) {
			return false;
		}
		if (mark == "Marks2") {
			return value < minMax.min2;
		} else if (mark == "Marks4") {
			return value > minMax.max4;
		} else if (mark == "Marks5") {
			return value > minMax.max5;
		}
	}

	isRowHasError(classId: string) {
		let m = this.newSchoolMarks.filter(m => m.ClassId === classId)[0];
		if (!m) {
			return false;
        }
		return Math.round(m.Marks2 + m.Marks3 + m.Marks4 + m.Marks5) !== 100;
	}
	isItogoHasError() {

		if (!this.totalEachAvgGrads) {
			return false;
		}
		return Math.round(this.totalEachAvgGrads[0] + this.totalEachAvgGrads[1] + this.totalEachAvgGrads[2] + this.totalEachAvgGrads[3]) !== 100;
	}


	isAnyRowNotHundreed() {
		if (this.newSchoolMarks.length === 0) {
			return false;
		}

		return this.newSchoolMarks.some(clMarks => Math.round(clMarks.Marks2 + clMarks.Marks3 + clMarks.Marks4 + clMarks.Marks5) !== 100);
	}
}

interface ClassesModel {
	number: string;
	name: string;
	subjects: SubjectModel[];
}

interface SubjectModel {
	code: string;
	name: string;
}

type MinMax = { [classNumber: string]: { [subjectCode: string]: { min2: number, max4:number, max5: number } } };

function valueOrZero(val: number) {
	return !!val || val === 0;
}
