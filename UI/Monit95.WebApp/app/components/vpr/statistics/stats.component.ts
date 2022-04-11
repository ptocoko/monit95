import { Component } from '@angular/core';
import { AreaModel } from '../../../models/area.model';
import { SchoolModel } from '../../../models/school.model';
import { ClassSelectInfo, VprStatsModel } from '../../../models/vpr.model';
import { ClassModel } from '../../../models/class.model';
import { ClassService } from '../../../services/class.service';
import { VprService } from '../../../services/vpr.service';

type MinMax = { [classNumber: string]: { [subjectCode: string]: { min2: number, max4:number, max5: number } } };

@Component({
	templateUrl: `./app/components/vpr/statistics/stats.component.html?v=${new Date().getTime()}`,
	styles: [`
table {
	margin-top: 30px;
}
td {
	text-align: center;
}
.yellow-bgrd {
	background-color: orange;
}
`]
})
export class StatsComponent {
	selectedInfo: ClassSelectInfo;
	stats: VprStatsModel;
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
				{ code: '03', name: 'Физика' },
				{ code: '06', name: 'Биология' },
				{ code: '07', name: 'История' },
				{ code: '08', name: 'География' },
				{ code: '12', name: 'Обществознание' },
			]
		},
	];
	minMax: MinMax = {
		'04': {
			'01': {
				min2: 15,
				max4:40,
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
	sums: { [classId: string]: number[] } = {};
	availableClassIds: string[] = [];
	isLoading: boolean;
/*	classNames: { [classId: string]: string };
*/	classNames: ClassModel[] = [];


	constructor(private vprService: VprService, private classService: ClassService) { }

	ngOnInit() {
		this.classService.getClasses().subscribe(c => {
			const classes = c.filter(cl => !cl.Id.endsWith('00'));
			/*this.classNames = classes.reduce((clAgg, curr) => {
				clAgg[curr.Id] = curr.Name;
				return clAgg;
			}, {});*/
		});
	}


	onClassSelected(classSelectedInfo?: ClassSelectInfo) {
		if (classSelectedInfo) {
			this.isLoading = true;
			this.selectedInfo = classSelectedInfo;
			console.log('212')
			this.vprService.getStats(this.selectedInfo.ClassNumber, this.selectedInfo.Subject, this.selectedInfo.SchoolId).subscribe(stats => {
				//let awaww = stats.Marks2.First == stats.Marks2.Second && stats.Marks2.First == stats.Marks2.Second && stats.Marks2.First == stats.Marks2.Second && stats.Marks2.First == stats.Marks2.Second
				if (stats == null) {

					this.stats = {
						Marks2: { [this.selectedInfo.ClassNumber]: { First: "", Second: "" }},
						Marks3: { [this.selectedInfo.ClassNumber]: { First: "", Second: "" } },
						Marks4: { [this.selectedInfo.ClassNumber]: { First: "", Second: "" } },
						Marks5: { [this.selectedInfo.ClassNumber]: { First: "", Second: "" } },
					}
			
				 }
	else {
					this.stats = stats;
				}
				this.availableClassIds = Object.keys(this.stats.Marks2).filter(cl => !cl.startsWith('$'));
				this.calculateSums();

				this.isLoading = false;
			});
		} else {
			this.stats = null;
			this.selectedInfo = null;
		}
	}

	validateMin2(val: string) {
		const value = +val?.replace(',', '.');
		if (!isNaN(value) && !!val) {
			return value < this.minMax[this.selectedInfo?.ClassNumber][this.selectedInfo?.Subject].min2;
		}

		return false;
	}

	validateMax4(val: string) {
		const value = +val?.replace(',', '.');
		if (!isNaN(value) && !!val) {
			return value >= this.minMax[this.selectedInfo?.ClassNumber][this.selectedInfo?.Subject].max4;
		}

		return false;
	}

	validateMax5(val: string) {
		const value = +val?.replace(',', '.');
		if (!isNaN(value) && !!val) {
			return value > this.minMax[this.selectedInfo?.ClassNumber][this.selectedInfo?.Subject].max5;
		}

		return false;
	}

	calculateSums() {
		this.availableClassIds.forEach(cl => {
			this.sums[cl] = [];
			const sumFirst = (+this.stats.Marks2[cl].First?.replace(',', '.')) + (+this.stats.Marks3[cl].First?.replace(',', '.')) + (+this.stats.Marks4[cl].First?.replace(',', '.')) + (+this.stats.Marks5[cl].First?.replace(',', '.'));
			const sumSecond = (+this.stats.Marks2[cl].Second?.replace(',', '.')) + (+this.stats.Marks3[cl].Second?.replace(',', '.')) + (+this.stats.Marks4[cl].Second?.replace(',', '.')) + (+this.stats.Marks5[cl].Second?.replace(',', '.'));

			this.sums[cl][0] = +sumFirst?.toFixed(1);
			this.sums[cl][1] = +sumSecond?.toFixed(1);
		})
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