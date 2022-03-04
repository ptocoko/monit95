import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ParticipModel } from '../../../models/particip.model';
import { ClassModel } from '../../../models/class.model';
import { ParticipsService } from '../../../services/refactored/particips.service';
import { AccountService } from '../../../services/account.service';
import { ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { tap } from 'rxjs/operators';

const CLASSES: ClassModel[] = [
	{
		Id: '0900',
		Name: '9'
	},
	{
		Id: '1100',
		Name: '11'
	}
];

enum Field {
	Surname = 'Surname',
	Name = 'Name',
	SecondName = 'SecondName',
	Class = 'Class',
	Birthday = 'Birthday',
	DocumNum = 'DocumNum'
}

interface AddFormField {
	type: Field;
	required: boolean;
	minLength?: number;
	maxLength?: number;
	invalidMsg?: string;
	availableClasses?: ClassModel[];
	years?: number[];
}

@Component({
	templateUrl: `./app/components/particips/add/add.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/particips/add/add.component.css?v=${new Date().getTime()}`]
})
export class AddComponent {
	fieldTypes: typeof Field = Field;
	particip = new ParticipModel();

	projectName: string;
	projectId: number;
	classNumber: number;

	availableClasses: ClassModel[] = [];
	formFields: AddFormField[];

	isSending = false;
	isConflict = false;
	addSuccessText: string;

	days = Array.from({ length: 31 }).map((_, i) => ++i);
	participDay: number;

	participMonth: number;
	months = Array.from({ length: 12 }).map((_, i) => {
		const name = new Intl.DateTimeFormat('ru', { month: 'long' }).format(new Date(2021, i, 1));
		return { id: i, name: `${name[0].toUpperCase()}${name.slice(1)}` }
	});

	participYear: number;

	constructor(private readonly participsService: ParticipsService,
		private readonly accountService: AccountService,
		private readonly location: Location,
		private readonly route: ActivatedRoute) { }

	ngOnInit() {
		this.projectId = +this.route.snapshot.queryParams['projectId'];
		this.projectName = this.route.snapshot.queryParams['projectName'];

		if (this.route.snapshot.queryParamMap.has('classNumber')) {
			this.classNumber = +this.route.snapshot.queryParamMap.get('classNumber');
		}

		switch (this.projectId) {
			case 35:
				this.availableClasses = [
				//	{ Id: '0200', Name: '2' },
					{ Id: '0500', Name: '5' },
					{ Id: '0600', Name: '6' },
					{ Id: '1000', Name: '10' },
				]
				this.formFields = [
					{ type: Field.Surname, required: true, minLength: 1, maxLength: 25, invalidMsg: 'фамилия должна содержать до 25 букв.'},
					{ type: Field.Name, required: true, minLength: 1, maxLength: 25, invalidMsg: 'имя должно содержать до 25 букв.'},
					{ type: Field.SecondName, required: false, minLength: 1, maxLength: 25, invalidMsg: 'отчество должно содержать до 25 букв.'},
					{ type: Field.Class, required: false, minLength: 1, maxLength: 25, invalidMsg: 'выберите класс.', availableClasses: this.availableClasses },
				]
				break;
			case 36:
				this.availableClasses = [
					{ Id: '0200', Name: '2' }
				]
				this.formFields = [
					{ type: Field.Surname, required: true, minLength: 1, maxLength: 25, invalidMsg: 'фамилия должна содержать до 25 букв.' },
					{ type: Field.Name, required: true, minLength: 1, maxLength: 25, invalidMsg: 'имя должно содержать до 25 букв.' },
					{ type: Field.SecondName, required: false, minLength: 1, maxLength: 25, invalidMsg: 'отчество должно содержать до 25 букв.' },
					{ type: Field.Class, required: false, minLength: 1, maxLength: 25, invalidMsg: 'выберите класс.', availableClasses: this.availableClasses },
				]
				break;
			case 39:
				if (this.classNumber === 8) {
					this.availableClasses = [
						{ Id: '0801', Name: '8 А' },
						{ Id: '0802', Name: '8 Б' },
						{ Id: '0803', Name: '8 В' },
						{ Id: '0804', Name: '8 Г' },
						{ Id: '0805', Name: '8 Д' },
						{ Id: '0806', Name: '8 Е' },
						{ Id: '0807', Name: '8 Ж' },
						{ Id: '0808', Name: '8 З' },
						{ Id: '0809', Name: '8 И' },
						{ Id: '0810', Name: '8 К' },
						{ Id: '0811', Name: '8 Л' }
					];
				} else if (this.classNumber === 9) {
					this.availableClasses = [
						{ Id: '0901', Name: '9 A' },
						{ Id: '0902', Name: '9 Б' },
						{ Id: '0903', Name: '9 В' },
						{ Id: '0904', Name: '9 Г' },
						{ Id: '0905', Name: '9 Д' },
						{ Id: '0906', Name: '9 Е' },
						{ Id: '0907', Name: '9 Ж' },
						{ Id: '0908', Name: '9 З' },
						{ Id: '0909', Name: '9 И' },
						{ Id: '0910', Name: '9 К' },
						{ Id: '0911', Name: '9 Л' }
					];
				}
				this.formFields = [
					{ type: Field.Surname, required: true, minLength: 1, maxLength: 25, invalidMsg: 'фамилия должна содержать до 25 букв.' },
					{ type: Field.Name, required: true, minLength: 1, maxLength: 25, invalidMsg: 'имя должно содержать до 25 букв.' },
					{ type: Field.SecondName, required: false, minLength: 1, maxLength: 25, invalidMsg: 'отчество должно содержать до 25 букв.' },
					{ type: Field.Class, required: true, minLength: 1, maxLength: 25, invalidMsg: 'выберите класс.', availableClasses: this.availableClasses },
					{ type: Field.Birthday, required: true, years: this.getYears(2000, 2015) },
					{ type: Field.DocumNum, required: true, minLength: 1, maxLength: 25 }
				]
				break;
			case 41:
				this.formFields = [
					{ type: Field.Surname, required: true, minLength: 1, maxLength: 25, invalidMsg: 'фамилия должна содержать до 25 букв.' },
					{ type: Field.Name, required: true, minLength: 1, maxLength: 25, invalidMsg: 'имя должно содержать до 25 букв.' },
					{ type: Field.SecondName, required: false, minLength: 1, maxLength: 25, invalidMsg: 'отчество должно содержать до 25 букв.' },
					{ type: Field.Birthday, required: true, years: this.getYears(1995, 2015) },
				]
			default:
				throw new Error('Форма не подготовлена для указанного проекта.');
        }

		// this.availableClasses = CLASSES;
		if (this.availableClasses.length === 1) {
			this.particip.ClassId = this.availableClasses[0].Id;
		}
	}

	onSubmit() {
		this.postParticip().subscribe(_ => {
			this.back();
		},
		error => {
			this.isSending = false;
			if (error.status === 409) {
				this.isConflict = true;
			} else {
				throw error;
			}
		});
	}

	addNext() {
		this.postParticip().subscribe(_ => {
			this.isSending = false;
			const currentClassId = this.particip.ClassId;

			this.addSuccessText = `Ученик '${this.particip.Surname} ${this.particip.Name} ${this.particip.SecondName}' был успешно добавлен в список!`;
			this.registerAddSuccessTextFading();

			this.particip = new ParticipModel();
			this.clearBirthday();
			this.particip.ClassId = currentClassId;

			const firstInput = document.querySelector('#newParticipForm input') as HTMLInputElement;
			firstInput.focus();
		},
		error => {
			this.isSending = false;
			if (error.status === 409) {
				this.isConflict = true;
			} else {
				throw error;
			}
		});
	}

	back() {
		this.location.back();
	}

	private postParticip() {
		this.isSending = true;
		this.isConflict = false;

		this.trimParticipFields();
		this.applyBirthday();

		if (this.projectId === 41) {
			this.particip.ClassId = `${this.classNumber.toString().length === 2 ? '' : '0'}${this.classNumber}00`;
        }

		return this.participsService.post(this.particip, this.projectId);
    }

	private trimParticipFields() {
		// избавляемся от пробелов в начале и в конце
		this.particip.Surname = this.particip.Surname.trim();
		this.particip.Name = this.particip.Name.trim();

		if (this.particip.SecondName) {
			this.particip.SecondName = this.particip.SecondName.trim();
		};
	}

	private registerAddSuccessTextFading() {
		const form = document.querySelector('#newParticipForm');
		const sub = fromEvent(form, 'input').subscribe(() => {
			this.addSuccessText = '';
			sub.unsubscribe();
		});
	}

	private getYears(min: number, max: number) {
		let arr = [];
		for (let i = min; i <= max; i++) {
			arr.push(i);
		}
		return arr;
	}

	private applyBirthday() {
		if (this.formFields.filter(ff => ff.type === Field.Birthday).length) {
			this.particip.Birthday = new Date(this.participYear, this.participMonth, this.participDay, 12) as any;
		}
	}

	private clearBirthday() {
		this.participDay = null;
		this.participMonth = null;
		this.participYear = null;
	}
}
