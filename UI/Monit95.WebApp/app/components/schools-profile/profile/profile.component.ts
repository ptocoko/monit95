import { Component } from '@angular/core';
import { ProfileQuestion, Session } from '../../../models/schools-profile/profile-question.model';
import { SchoolsProfileService } from '../../../services/schools-profile/schools-profile.service';
import { NgForm } from '@angular/forms';
import { SchoolCollectorService } from '../../../shared/school-collector.service';
import { switchMap } from 'rxjs/operators';

@Component({
	templateUrl: `./profile.component.html`,
	styleUrls: [`./profile.component.css`]
})
export class ProfileComponent {
	isLoading: boolean;
	isFinished: boolean;
	readonly COLLECTOR_ID = 86;

	notBooleanQuestions: ProfileQuestion[] = [];
	booleanQuestions: ProfileQuestion[] = [];

	constructor(private profileService: SchoolsProfileService, private schoolCollectorService: SchoolCollectorService) { }

	ngOnInit() {
		this.isLoading = true;
		this.isFinished = false;

		this.schoolCollectorService.getCollectorState(this.COLLECTOR_ID).subscribe(state => {
			if (state.IsFinished) {
				this.isLoading = false;
				this.isFinished = true;
			} 
			this.profileService.getQuestions().subscribe(res => {
				this.notBooleanQuestions = res[0];
				this.booleanQuestions = res[1];

				this.isLoading = false;
			});
			
		})
	}

	onSessionValuePassed(question: ProfileQuestion, session: Session, value: number) {
		this.profileService.saveAnswer(question.Id, value, session).subscribe();
	}

	onValuePassed(question: ProfileQuestion, value: number) {
		this.profileService.saveAnswer(question.Id, value).subscribe();
	}

	onRadioSelected(question: ProfileQuestion, value: number) {
		this.profileService.saveAnswer(question.Id, value).subscribe();
	}

	finish() {
		this.schoolCollectorService.isFinished(this.COLLECTOR_ID, true).subscribe(res => this.isFinished = true);
	}

	notFinished() {
		this.schoolCollectorService.isFinished(this.COLLECTOR_ID, false).subscribe(res => this.isFinished = false);
	}
}
