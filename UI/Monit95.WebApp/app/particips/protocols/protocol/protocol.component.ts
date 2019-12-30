﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ParticipProtocolsService } from '../../../services/particip-protocols.service';
import { ParticipProtocolModel } from '../../../models/particip-protocol.model';
import { QuestionResult } from '../../../models/marks-protocol.model';
import { QuestionProtocolEdit } from '../../../models/question-protocol-edit.model';
import { QuestionProtocolPost } from '../../../models/question-protocol-post.model';
import { QuestionProtocolPut } from '../../../models/question-protocol-put.model';


@Component({
	templateUrl: './protocol.component.html',
	styleUrls: ['./protocol.component.css']
})
export class ParticipProtocolComponent implements OnInit {
    isUpdate: boolean;
	participTestId: number;   
	protocol: QuestionProtocolEdit;
	questionResults: QuestionResult[];

    constructor(
		private readonly location: Location,
		private readonly activatedRoute: ActivatedRoute,
		private readonly protocolsService: ParticipProtocolsService) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
			this.participTestId = Number.parseInt(params['id']);

			this.protocolsService.getProtocol(this.participTestId).subscribe(res => {
				this.protocol = res;

				// маппим коллекцию для нормального отображения в компоненте marks-protocol
				this.questionResults = res.MarkCollection.map(val => {
					let questionRes: QuestionResult = {
						Order: val.Order,
						CurrentMark: val.AwardedMark,
						Name: val.Order.toString(),
						MaxMark: val.MaxMark,
						QuestionId: val.QuestionMarkId
					};
					return questionRes;
				});
			});
        });
    }

	// компонент marks-protocol возвращает массив QuestionResult: превращаем его словарь и отправляем на сервер
	submit(questionResults: QuestionResult[]) {
		let questionResultsPost: { [key: number]: number; } = {};
		questionResults.forEach(val => questionResultsPost[val.Order] = val.CurrentMark);

		this.protocolsService
			.postMarksProtocol(questionResultsPost, this.participTestId)
			.subscribe(_ => this.back());
    }

    back() {
		this.location.back();
    }
}
