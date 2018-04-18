import { Component } from '@angular/core';
import { ParticipService } from '../../../services/one-two-three/particips.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ParticipModel } from '../../../models/one-two-three/particip.model';
import { ClassService } from '../../../services/class.service';
import { ClassModel } from '../../../models/class.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
	templateUrl: `./app/one-two-three/particips/add-or-update/add-or-update.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/one-two-three/particips/add-or-update/add-or-update.component.css?v=${new Date().getTime()}`]
})
export class AddOrUpdateComponent {
	isUpdate: boolean = true;
	particip: ParticipModel;
	classes: ClassModel[];
	participForm: FormGroup;

	constructor(private participService: ParticipService,
		private classService: ClassService,
		private router: Router,
		private route: ActivatedRoute,
		private location: Location,
		private fb: FormBuilder) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.isUpdate = params['participId'];

			if (this.isUpdate) {
				this.participService.get(params['participId']).subscribe(res => {
					this.particip = res;
					this.createForm();
				});
			} else {
				this.particip = {} as ParticipModel;
				this.createForm();
			}

			this.classService.getClasses().subscribe(res => this.classes = res.slice(0, 36));
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
			for (let control of Object.keys(this.participForm.controls)) {
				this.participForm.get(control).markAsTouched();
			}
		} else {
			this.isUpdate ? this.participService.update(this.particip).subscribe(() => this.location.back())
				: this.participService.post(this.particip).subscribe(() => this.location.back());
		}
	}

	get surname() { return this.participForm.get('surname'); }

	get name() { return this.participForm.get('name'); }

	get secondName() { return this.participForm.get('secondName'); }

	get classId() { return this.participForm.get('classId'); }
}