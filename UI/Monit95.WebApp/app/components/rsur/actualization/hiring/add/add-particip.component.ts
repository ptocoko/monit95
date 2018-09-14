import { Component, ViewChild, ElementRef, Renderer2, EventEmitter, Output } from '@angular/core';
import { RsurParticipService } from '../../../../../services/rsur-particip.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RsurParticipPostModel } from '../../../../../models/rsur/particip-post.model';
import { Location } from '@angular/common';
import { AccountService } from '../../../../../services/account.service';

@Component({
	selector: 'app-create-particip',
	templateUrl: `./app/components/rsur/actualization/hiring/add/add-particip.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/actualization/hiring/add/add-particip.component.css?v=${new Date().getTime()}`]
})
export class CreateParticipComponent {
	@Output() conflict = new EventEmitter<string>();

	participForm: FormGroup;

	monthDays = [...Array.from({ length: 32 }, (val, key) => key).splice(1)];
	months = [
		{
			index: 0,
			name: 'Январь'
		},
		{
			index: 1,
			name: 'Февраль'
		},
		{
			index: 2,
			name: 'Март'
		},
		{
			index: 3,
			name: 'Апрель'
		},
		{
			index: 4,
			name: 'Май'
		},
		{
			index: 5,
			name: 'Июнь'
		},
		{
			index: 6,
			name: 'Июль'
		},
		{
			index: 7,
			name: 'Август'
		},
		{
			index: 8,
			name: 'Сентябрь'
		},
		{
			index: 9,
			name: 'Октябрь'
		},
		{
			index: 10,
			name: 'Ноябрь'
		},
		{
			index: 11,
			name: 'Декабрь'
		}
	];
	years = [...Array.from({length: 60}, (val, key) => key + 1945)];

	subjects = [
		{
			code: 1,
			name: 'Русский язык'
		},
		{
			code: 2,
			name: 'Математика'
		},
		{
			code: 7,
			name: 'История'
		},
		{
			code: 8,
			name: 'География'
		},
		{
			code: 3,
			name: 'Физика'
		}
	];

	categories = [
		{
			id: 0,
			name: 'Без категории'
		},
		{
			id: 1,
			name: 'Первая категория'
		},
		{
			id: 2,
			name: 'Высшая категория'
		}
	];

	@ViewChild('surname') firstField: ElementRef;

	constructor(private participService: RsurParticipService,
		private fb: FormBuilder,
		private renderer: Renderer2,
		private location: Location,
		private accountService: AccountService) { }

	ngOnInit() {
		this.participForm = this.fb.group({
			surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
			name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
			secondName: ['', [Validators.maxLength(25)]],
			birthday: this.fb.group({
				day: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
				month: ['', [Validators.required, Validators.min(0), Validators.max(12)]],
				year: ['', [Validators.required, Validators.min(1945), Validators.max(2005)]]
			}),
			subjectCode: ['', Validators.required],
			categoryId: ['', Validators.required],
			experience: ['', Validators.required],
			phone: '',
			email: ['']
		});

		this.focusOnFirstField();
	}

	submitForm() {
		const particip = this.convertFormToModel();
		this.participService.createParticip(particip).subscribe(() => this.location.back(), error => {
			
			if (error.status === 409) {
				alert('Учитель с такими данными уже участвовал в РСУР');
				this.conflict.emit(`${particip.Surname} ${particip.Name} ${particip.SecondName}`);
			} else {
				throw error;
			}
		});
	}

	cancel() {
		this.location.back();
	}

	private convertFormToModel(): RsurParticipPostModel {
		const birthday = new Date(this.birthday.year.value, this.birthday.month.value, this.birthday.day.value + 1);

		return {
			Surname: this.surname.value,
			Name: this.name.value,
			SecondName: this.secondName.value,
			Birthday: birthday,
			RsurSubjectCode: this.subjectCode.value,
			CategoryId: this.categoryId.value,
			Experience: this.experience.value,
			Phone: this.phone.value,
			Email: this.email.value,
			SchoolId: this.accountService.account.UserName
		};
	}

	get surname() { return this.participForm.get('surname'); }

	get name() { return this.participForm.get('name'); }

	get secondName() { return this.participForm.get('secondName'); }

	get birthday() {
		const birthdayFb = this.participForm.get('birthday') as FormGroup;

		return {
			day: birthdayFb.get('day'),
			month: birthdayFb.get('month'),
			year: birthdayFb.get('year')
		};
	}

	get subjectCode() { return this.participForm.get('subjectCode'); }

	get categoryId() { return this.participForm.get('categoryId'); }

	get experience() { return this.participForm.get('experience'); }

	get phone() { return this.participForm.get('phone'); }

	get email() { return this.participForm.get('email'); }

	focusOnFirstField = () => this.renderer.selectRootElement(this.firstField.nativeElement).focus();
}