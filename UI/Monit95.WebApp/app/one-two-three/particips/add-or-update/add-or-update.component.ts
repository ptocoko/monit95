import { Component, ViewChild, ElementRef, Renderer2, OnDestroy, OnInit } from '@angular/core';
import { ParticipService } from '../../../services/one-two-three/particips.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ParticipModel } from '../../../models/one-two-three/particip.model';
import { ClassService } from '../../../services/class.service';
import { ClassModel } from '../../../models/class.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatInput, MatFormField } from '@angular/material';
import { delay, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
	templateUrl: `./app/one-two-three/particips/add-or-update/add-or-update.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/one-two-three/particips/add-or-update/add-or-update.component.css?v=${new Date().getTime()}`]
})
export class AddOrUpdateComponent implements OnInit, OnDestroy {
	isUpdate: boolean = true;
	isLoading = true;
	formIsPristine = false;
	isConflict = false;

	particip = {} as ParticipModel;
	classes: ClassModel[];
	participForm: FormGroup;
	@ViewChild('surnameInput') firstField: ElementRef;

	routeSub$: Subscription;
	participGetSub$: Subscription;
	participSaveSub$: Subscription;
	classesSub$: Subscription;

	constructor(private participService: ParticipService,
		private classService: ClassService,
		private router: Router,
		private route: ActivatedRoute,
		private location: Location,
		private fb: FormBuilder,
		private renderer: Renderer2) { }

	ngOnInit() {
		this.createForm();
		this.routeSub$ = this.route.params.subscribe(params => {
			this.isUpdate = params['participId'];

			if (this.isUpdate) {
				this.participGetSub$ = this.participService.get(params['participId']).subscribe(res => {
					this.particip = res;
					this.isLoading = false;
				});
			} else {
				this.isLoading = false;
			}

			this.classesSub$ = this.classService.getClasses()
					.subscribe(res => this.classes = res.slice(0, 36));

			this.focusOnFirstField();
		});
	}

	createForm() {
		this.participForm = this.fb.group({
			surname: ['', [Validators.required, Validators.minLength(3)]],
			name: ['', [Validators.required, Validators.minLength(2)]],
			secondName: ['', Validators.minLength(4)],
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
				this.saveParticip(this.participService.update, this.particip);
			} else {
				this.saveParticip(this.participService.post, this.particip);
			}
		}
	}

	addNext() {
		if (!this.isUpdate) {
			if (this.participForm.invalid) {
				this.markFieldsAsDirty();
			} else if (this.participForm.pristine) {
				this.formIsPristine = true;
			} else {
				this.saveParticip(this.participService.post, this.particip, () => {
					this.participForm.enable();
					this.isLoading = false;
					this.participForm.reset({ classId: this.particip.ClassId });
					this.focusOnFirstField();
				});
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
			this.isLoading = false;
			this.focusOnFirstField();
		} else {
			throw err;
		}
	}

	private saveParticip = (method: (particip: ParticipModel) => Observable<string>, particip: ParticipModel, callback = () => this.location.back()) => {
		this.participSaveSub$ = method(particip)
			.pipe(
				map(() => {
					this.isConflict = false;
					this.isLoading = true;
				})
			)
			.subscribe(callback, this.errCallback);
	}
	
	cancel = () => this.location.back();

	focusOnFirstField = () => this.renderer.selectRootElement(this.firstField.nativeElement).focus();

	get surname() { return this.participForm.get('surname'); }

	get name() { return this.participForm.get('name'); }

	get secondName() { return this.participForm.get('secondName'); }

	get classId() { return this.participForm.get('classId'); }

	ngOnDestroy() {
		if (this.routeSub$)
			this.routeSub$.unsubscribe();

		if (this.participGetSub$)
			this.participGetSub$.unsubscribe();

		if (this.participSaveSub$)
			this.participSaveSub$.unsubscribe();

		if (this.classesSub$)
			this.classesSub$.unsubscribe();
	}
}