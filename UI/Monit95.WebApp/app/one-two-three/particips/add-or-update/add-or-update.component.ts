﻿import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ParticipService } from '../../../services/one-two-three/particips.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ParticipModel } from '../../../models/one-two-three/particip.model';
import { ClassService } from '../../../services/class.service';
import { ClassModel } from '../../../models/class.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatInput, MatFormField } from '@angular/material';
import { delay, map } from 'rxjs/operators';

@Component({
	templateUrl: `./app/one-two-three/particips/add-or-update/add-or-update.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/one-two-three/particips/add-or-update/add-or-update.component.css?v=${new Date().getTime()}`]
})
export class AddOrUpdateComponent {
	isUpdate: boolean = true;
	isLoading = true;
	formIsPristine = false;
	isConflict = false;

	particip = {} as ParticipModel;
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
		this.route.params.subscribe(params => {
			this.isUpdate = params['participId'];

			if (this.isUpdate) {
				this.participService.get(params['participId']).subscribe(res => {
					this.particip = res;
					this.isLoading = false;
				});
			} else {
				this.isLoading = false;
			}

			this.classService.getClasses().subscribe(res => this.classes = res.slice(0, 36));

			this.focusOnFirstField();
		});
	}

	createForm() {
		this.participForm = this.fb.group({
			surname: ['', [Validators.required, Validators.minLength(4)]],
			name: ['', [Validators.required, Validators.minLength(3)]],
			secondName: ['', Validators.minLength(5)],
			classId: ['', Validators.required]
		});
	}

	submitForm() {
		if (this.participForm.invalid) {
			this.markFieldsAsDirty();
		} else if (this.participForm.pristine) {
			this.formIsPristine = true;
		} else {
			if (this.isUpdate) {
				this.participService
						.update(this.particip)
						.pipe(
							map(() => this.isConflict = false)
						)
						.subscribe(() => this.location.back(), this.errCallback);
			} else {
				this.participService
						.post(this.particip)
						.pipe(
							map(() => this.isConflict = false)
						)
						.subscribe(() => this.location.back(), this.errCallback);
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
				this.participService
						.post(this.particip)
						.pipe(
							map(() => this.isConflict = false)
						)
						.subscribe(() => {
							this.participForm.enable();
							this.isLoading = false;
							this.particip = {} as ParticipModel;
							this.participForm.reset();
							this.focusOnFirstField();
						}, this.errCallback);
			}
		}
	}

	private markFieldsAsDirty() {
		for (let control of Object.keys(this.participForm.controls)) {
			this.participForm.get(control).markAsTouched();
		}
	}

	private errCallback = (err: any) => {
		if (err.status === 409) {
			this.isConflict = true;
			this.focusOnFirstField();
		} else {
			throw err;
		}
	}

	cancel = () => this.location.back();

	focusOnFirstField = () => this.renderer.selectRootElement(this.firstField.nativeElement).focus();

	get surname() { return this.participForm.get('surname'); }

	get name() { return this.participForm.get('name'); }

	get secondName() { return this.participForm.get('secondName'); }

	get classId() { return this.participForm.get('classId'); }
}