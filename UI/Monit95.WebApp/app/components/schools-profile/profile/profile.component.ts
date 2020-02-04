import { Component } from '@angular/core';
import { ProfileQuestion } from '../../../models/schools-profile/profile-question.model';

@Component({})
export class ProfileComponent {

	onValuePassed(question: ProfileQuestion, value: string) {

	}
}

type session = '2016-2017' | '2017-2018' | '2018-2019';