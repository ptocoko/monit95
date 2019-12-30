
import {fromEvent as observableFromEvent,  Observable } from 'rxjs';

import {filter} from 'rxjs/operators';

import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';

import { Location } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";

import { FormControl, Validators } from "@angular/forms";


import { RsurProtocolsService } from '../../../../services/rsur-protocols.service';
import { MarksProtocol } from '../../../../models/marks-protocol.model';
import { Scan } from '../../../../models/scan.model';

@Component({
	selector: 'matching-protocol-component',
	templateUrl: './matching-protocol.component.html',
	styleUrls: ['./matching-protocol.component.css']
})
export class MatchingProtocolComponent implements OnInit{
	protocolScan: Scan;
	marksProtocol: MarksProtocol;
	fileId: number;
	isUpdate: boolean;
	
	isMarksProtocolLoading: boolean = false;

	@ViewChild('participCode') participCodeElem: ElementRef;
	marksInputs: JQuery<HTMLInputElement>;
	codeControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^[0-9]+$/)]);

	constructor(private rsurProtocolsService: RsurProtocolsService,
				private location: Location,
				private route: ActivatedRoute,
				private renderer: Renderer) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.fileId = Number.parseInt(params["id"]);
			
			this.rsurProtocolsService.getScan(this.fileId).subscribe(protocolScan => {
				this.rsurProtocolsService.getMarksProtocolByFileId(this.fileId).subscribe(marksProtocol => {
					this.protocolScan = protocolScan;
					$().ready(() => this.initCallbacks(marksProtocol));
				})
			});
		});
	}

	initCallbacks(marksProtocol: MarksProtocol) {
		if (!marksProtocol) {
			this.isUpdate = false;
			this.focusOnCodeElem();

			let participCodeChange = observableFromEvent(this.participCodeElem.nativeElement, 'input').pipe(
				filter((event: any, i: number) => event.target.value.length == 5))
				.subscribe(event => this.participCodeSubscriber(event));
		}
		else {
			this.isUpdate = true;
			this.participCodeElem.nativeElement.value = marksProtocol.ParticipCode;
			this.codeControl.disable();
			this.marksProtocol = marksProtocol;
			
		}
	}

	participCodeSubscriber(event: any) {
		let elem = event.target as HTMLInputElement;
		let participCode = Number.parseInt(elem.value);
		this.codeControl.markAsTouched(); //отметка поля как 'touched' включает отображение ошибок валидации

		if (this.codeControl.valid)
		{
			this.codeControl.disable();
			this.isMarksProtocolLoading = true;

			this.rsurProtocolsService.getMarksProtocol(participCode).subscribe(
				res => this.participTestSuccessHandler(res),
				error => this.participTestErrorHandler(error)
			);
		}
	}

	participTestSuccessHandler(marksProtocol: MarksProtocol) {
		this.marksProtocol = marksProtocol;
		this.marksProtocol.FileId = this.fileId;
		this.isMarksProtocolLoading = false;
	}

	participTestErrorHandler(error: any) {
		let message = error.error && error.error.Message ? error.error.Message : error.message ? error.message : error;

		this.codeControl.enable();
		this.codeControl.setErrors({ 'serverValidateError': message }); //прицепляем к контролу кастомную ошибку валидации, 
																		//содержащее сообщение из ответа сервера
		this.isMarksProtocolLoading = false;
		this.focusOnCodeElem();
	}
	

	sendMarks(marksProtocol: MarksProtocol) {
		this.rsurProtocolsService.postMarksProtocol(marksProtocol).subscribe(response => this.location.back());
	}
	
	cancel() {
		this.location.back();
	}

	focusOnCodeElem() {
		this.renderer.invokeElementMethod(this.participCodeElem.nativeElement, 'focus');
	}
}
