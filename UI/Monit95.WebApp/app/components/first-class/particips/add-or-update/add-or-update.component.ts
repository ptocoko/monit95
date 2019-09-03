import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ClassService } from '../../../../services/class.service';
import { ClassModel } from '../../../../models/class.model';
import { ParticipGetModel } from '../../../../models/first-class/particip-get.model';
import { ParticipService } from '../../../../services/first-class/particips.service';
import { ParticipPostModel } from '../../../../models/first-class/particip-post.model';
import { getFromLocalStorage, setToLocalStorage } from '../../../../utils/local-storage';
import { CLASS_ID_KEY } from '../list/particips-list.component';

@Component({
	templateUrl: `./app/components/first-class/particips/add-or-update/add-or-update.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/first-class/particips/add-or-update/add-or-update.component.css?v=${new Date().getTime()}`]
})
export class AddOrUpdateComponent {
	isUpdate: boolean = true;
	isLoading = true;
	formIsPristine = false;

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
	years = [2009, 2010, 2011, 2012, 2013, 2014];

	particip = {} as ParticipGetModel;
	classes: ClassModel[];
	participForm: FormGroup;
	@ViewChild('surnameInput') firstField: ElementRef;

	constructor(private participService: ParticipService,
		private classService: ClassService,
		private router: Router,
		private route: ActivatedRoute,
		private location: Location,
		private fb: FormBuilder,
		private renderer: Renderer2) { }

	ngOnInit() {
		this.createForm();
		this.setFormDefault();

		this.route.params.subscribe(params => {
			this.isUpdate = params['participId'];

			if (this.isUpdate) {
				this.participService.get(params['participId']).subscribe(res => {
					this.particip = res;
					this.setForm();
					this.isLoading = false;
				});
			} else {
				this.isLoading = false;
			}

			this.classService.getClasses().subscribe(res => this.classes = res.slice(0, 12));

			this.focusOnFirstField();
		});
	}

	createForm() {
		this.participForm = this.fb.group({
			surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
			name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
			secondName: ['', Validators.maxLength(25)],
			birthday: this.fb.group({
				day: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
				month: ['', [Validators.required, Validators.min(0), Validators.max(12)]],
				year: ['', [Validators.required, Validators.min(2009), Validators.max(2014)]]
			}),
			classId: ['', Validators.required],
			wasDoo: false
		});
	}

	setForm() {
		this.participForm.patchValue({
			surname: this.particip.Surname,
			name: this.particip.Name,
			secondName: this.particip.SecondName,
			classId: this.particip.ClassId,
			wasDoo: this.particip.WasDoo
		});

		if (this.particip.Birthday) {
			this.particip.Birthday = new Date(this.particip.Birthday);
			this.participForm.get('birthday').patchValue({
				day: this.particip.Birthday.getDate(),
				month: this.particip.Birthday.getMonth(),
				year: this.particip.Birthday.getFullYear()
			});
		}
	}

	classChanged() {
		if (this.classId.value && this.classId.value.length > 0) {
			setToLocalStorage(CLASS_ID_KEY, this.classId.value);
		}
	}

	submitForm() {
		if (this.participForm.invalid) {
			this.markFieldsAsDirty();
		} else if (this.participForm.pristine) {
			this.formIsPristine = true;
		} else {
			if (this.isUpdate) {
				this.putParticip(this.convertParticip());
			} else {
				this.postParticip(this.convertParticip());
			}
		}
	}

	addNext() {
		if (!this.isUpdate) {
			this.isLoading = true;

			if (this.participForm.invalid) {
				this.markFieldsAsDirty();
				this.isLoading = false;
			} else if (this.participForm.pristine) {
				this.formIsPristine = true;
				this.isLoading = false;
			} else {
				this.postParticip(this.convertParticip(), () => {
					this.participForm.enable();
					this.isLoading = false;
					this.particip = {} as ParticipGetModel;
					this.setFormDefault();
					this.focusOnFirstField();
				});
			}
		}
	}

	private setFormDefault() {
		const classId = getFromLocalStorage('FIRST_CLASS_ID');
		this.participForm.reset();
		this.participForm.patchValue({ wasDoo: false, classId });
	}

	private convertParticip(): ParticipPostModel {
		const birthday = new Date(this.birthday.year.value, this.birthday.month.value, this.birthday.day.value + 1);
		return {
			Id: this.particip.Id,
			Surname: this.surname.value,
			Name: this.name.value,
			SecondName: this.secondName.value,
			Birthday: birthday,
			ClassId: this.classId.value,
			WasDoo: this.wasDoo.value
		};
	}

	/**
	 * Вызывает метод POST сервиса ParticipService, по умолчанию в коллбэк подписки вызывается location.back
	 * @param particip
	 * @param callback next-коллбэк для subscribe (по умолчанию вызывается location.back)
	 */
	private postParticip(particip: ParticipPostModel, callback?: () => void) {
		this.participService.post(particip).subscribe(callback ? callback : () => this.location.back());
	}

	/**
	 * Вызывает метод PUT сервиса ParticipService, по умолчанию в коллбэк подписки вызывается location.back
	 * @param particip
	 * @param callback next-коллбэк для subscribe (по умолчанию вызывается location.back)
	 */
	private putParticip(particip: ParticipPostModel, callback?: () => void) {
		this.participService.update(particip).subscribe(callback ? callback : () => this.location.back());
	}

	private markFieldsAsDirty() {
		for (let control of Object.keys(this.participForm.controls)) {
			this.participForm.get(control).markAsTouched();
		}

		for (let birthdayCtrl of Object.keys(this.birthday)) {
			this.birthday[birthdayCtrl].markAsTouched();
		}
	}

	cancel = () => this.location.back();

	focusOnFirstField = () => this.renderer.selectRootElement(this.firstField.nativeElement).focus();

	get surname() { return this.participForm.get('surname'); }

	get name() { return this.participForm.get('name'); }

	get secondName() { return this.participForm.get('secondName'); }

	get classId() { return this.participForm.get('classId'); }

	get birthday() {
		const birthdayFb = this.participForm.get('birthday') as FormGroup;

		return {
			day: birthdayFb.get('day'),
			month: birthdayFb.get('month'),
			year: birthdayFb.get('year')
		};
	}

	get wasDoo() { return this.participForm.get('wasDoo'); }
}