import { Component } from '@angular/core';
import { ProfileQuestion, Session } from '../../../models/schools-profile/profile-question.model';
import { SchoolsProfileService } from '../../../services/schools-profile/schools-profile.service';
import { NgForm } from '@angular/forms';
import { SchoolCollectorService } from '../../../shared/school-collector.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
	templateUrl: `./app/components/schools-profile/profile/profile.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/schools-profile/profile/profile.component.css?v=${new Date().getTime()}`]
})
export class ProfileComponent {
	isLoading: boolean;
	isFinished: boolean;
	readonly COLLECTOR_ID = 127;

	questions: ProfileQuestion[] = [];

	constructor(
		private profileService: SchoolsProfileService,
		private schoolCollectorService: SchoolCollectorService,
		private router: ActivatedRoute) { }

	ngOnInit() {
		this.isLoading = true;
		this.isFinished = false;

		this.schoolCollectorService.getCollectorState(this.COLLECTOR_ID).subscribe(state => {
			if (state.IsFinished) {
				this.isLoading = false;
				this.isFinished = true;
			} else {
				this.loadQuestions();
			}
		}, err => {
				if (err.status === 404) {
					alert("От Вашей школы не было участников ЕГЭ-2021, поэтому заполнение анкеты Вами не требуется");
					window.location.href = '/';
				} else {
					throw err;
                }
		});
	}

	get isAllRequiredFilled() {
		return this.questions.filter(q => q.Required).every(q => q.Value !== null && q.Value !== undefined && q.Value !== '');
    }

	onSessionValuePassed(question: ProfileQuestion, session: Session, value: number) {
		if (!!value || value === 0) {
			this.profileService.saveAnswer(question.Id, value, session).subscribe();
		}
	}

	onValuePassed(question: ProfileQuestion, value: number) {
		if (!!value || value === 0) {
			this.profileService.saveAnswer(question.Id, value).subscribe();
        }
	}

	onRadioSelected(question: ProfileQuestion, value: number) {
		if (!!value || value === 0) {
			this.profileService.saveAnswer(question.Id, value).subscribe();
		}
	}

	finish() {
		this.schoolCollectorService.isFinished(this.COLLECTOR_ID, true).subscribe(res => this.isFinished = true);
	}

	notFinished() {
		this.schoolCollectorService.isFinished(this.COLLECTOR_ID, false).subscribe(res => { this.isFinished = false; this.loadQuestions() });
	}

	private loadQuestions() {
		const profileId = this.router.snapshot.params['id'];
		this.profileService.getQuestions(profileId).subscribe(res => {
			this.questions = res;

			this.isLoading = false;
		});
    }
}
