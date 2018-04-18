import { Component } from '@angular/core';
import { ParticipService } from '../../../services/one-two-three/particips.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ParticipModel } from '../../../models/one-two-three/particip.model';
import { ClassService } from '../../../services/class.service';
import { ClassModel } from '../../../models/class.model';

@Component({
	templateUrl: `./app/one-two-three/particips/add-or-update/add-or-update.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/one-two-three/particips/add-or-update/add-or-update.component.css?v=${new Date().getTime()}`]
})
export class AddOrUpdateComponent {
	isUpdate: boolean = true;
	particip: ParticipModel;
	classes: ClassModel[];

	constructor(private participService: ParticipService,
		private classService: ClassService,
		private router: Router,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.isUpdate = params['participId'];

			if (this.isUpdate) {
				this.participService.get(params['participId']).subscribe(res => this.particip = res);
			} else {
				this.particip = {} as ParticipModel;
			}

			this.classService.getClasses().subscribe(res => this.classes = res.slice(0, 36));
		});
	}

	
}