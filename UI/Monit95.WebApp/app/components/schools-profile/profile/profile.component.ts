import { Component } from '@angular/core';
import { ProfileQuestion, Session } from '../../../models/schools-profile/profile-question.model';
import { SchoolsProfileService } from '../../../services/schools-profile/schools-profile.service';

@Component({
	templateUrl: `./app/components/schools-profile/profile/profile.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/schools-profile/profile/profile.component.css?v=${new Date().getTime()}`]
})
export class ProfileComponent {
	isLoading: boolean;

	notBooleanQuestions: ProfileQuestion[] = [];
	booleanQuestions: ProfileQuestion[] = [];

	constructor(private profileService: SchoolsProfileService) { }

	ngOnInit() {
		this.isLoading = true;
		this.profileService.getQuestions().subscribe(res => {
			this.notBooleanQuestions = res[0];
			this.booleanQuestions = res[1];

			this.isLoading = false;
		});
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
}
