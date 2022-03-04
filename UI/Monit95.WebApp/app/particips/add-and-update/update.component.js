//import { Component, OnInit } from '@angular/core';
//import { Router, ActivatedRoute } from '@angular/router';
//import { ClassParticip } from '../ClassParticip';
//import { ParticipService } from '../../particip.service';
//import { AccountService } from '../../services/account.service';
//const CLASS_NAMES = ['1', '1 А', '1 Б', '1 В', '1 Г', '1 Д', '1 Е', '1 Ж', '1 З', '1 И', '1 К', '1 Л'];
//const PROJECT_ID: number = 1;
//@Component({
//	templateUrl: `./app/class-particips/add-and-update/update.component.html?v=${new Date().getTime()}`
//})
//export class UpdateClassParticipComponent implements OnInit {
//	particip = new ClassParticip();
//	classNames = CLASS_NAMES;
//	newDay: number;
//	newMonth: number;
//	newYear: number;
//	wasDoo: string = 'no';
//	actionText: string = 'Изменить';
//	constructor(private readonly participService: ParticipService,
//				private readonly accountService: AccountService,
//                private readonly router: Router,
//                private readonly route: ActivatedRoute) { }
//	ngOnInit() {
//	    const participId = this.route.snapshot.paramMap.get('id');
//	    this.participService.getParticip(+participId).subscribe(res => {
//			this.particip = res.json();
//			this.particip.ClassName = this.particip.ClassName.trim();
//			this.particip.Birthday = new Date(this.particip.Birthday);
//			if (this.particip.Birthday) {
//				this.newDay = this.particip.Birthday.getDate();
//				this.newMonth = this.particip.Birthday.getMonth();
//				this.newYear = this.particip.Birthday.getFullYear();
//			}
//			if (this.particip.WasDoo) {
//				this.wasDoo = 'yes';
//			}
//		});
//    }
//    onSubmit() {
//		this.particip.WasDoo = this.wasDoo === 'yes';
//		if (this.newMonth === -1) {
//			alert('Выберите месяц рождения!');
//			return;
//		}
//		const birthdayInMiSeconds = new Date().setUTCFullYear(this.newYear, this.newMonth, this.newDay);
//		this.particip.Birthday = new Date(birthdayInMiSeconds + 10800000);
//		this.participService.updateParticip(this.particip).subscribe(res => {
//		    this.router.navigate(['class-particips/list']);
//		});
//	}
//	cancel() {
//		this.router.navigate(['class-particips/list']);
//	}
//}
//# sourceMappingURL=update.component.js.map