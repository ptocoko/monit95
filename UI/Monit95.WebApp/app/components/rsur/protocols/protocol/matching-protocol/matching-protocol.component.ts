
import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { RsurProtocolsService } from "../../../../../services/rsur-protocols.service";
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { MarksProtocol } from "../../../../../models/marks-protocol.model";
import { FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import { Scan } from "../../../../../models/scan.model";

@Component({
	selector: 'matching-protocol-component',
	templateUrl: `./app/components/rsur/protocols/protocol/matching-protocol/matching-protocol.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/protocols/protocol/matching-protocol/matching-protocol.component.css?v=${new Date().getTime()}`]
})
export class MatchingProtocolComponent implements OnInit{
	protocolScan: Scan;
	marksProtocol: MarksProtocol;
	fileId: number;
	
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
				this.protocolScan = protocolScan;
				$().ready(() => this.initCallbacks());
			});
		});
	}

	initCallbacks() {
		this.focusOnCodeElem();

		let participCodeChange = Observable.fromEvent(this.participCodeElem.nativeElement, 'input')
			.filter((event: any, i: number) => event.target.value.length == 5)
			.subscribe(event => this.participCodeSubscriber(event));
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

	participTestSuccessHandler(res: MarksProtocol) {
		this.marksProtocol = res;
		this.marksProtocol.FileId = this.fileId;
		
		this.isMarksProtocolLoading = false;

		$().ready(() => { //после отрисовки полей оценок с помощью JQuery прицепляем к каждому полю 
							//обработчик фокуса и переводим фокус на первое поле

			this.marksInputs = $('.markInput') as JQuery<HTMLInputElement>;
			this.marksInputs.focus((event) => event.target.select());
			this.marksInputs.get(0).focus();
		});
	}

	participTestErrorHandler(error: any) {
		let message = error.error.Message ? error.error.Message : error.message;

		this.codeControl.enable();
		this.codeControl.setErrors({ 'notExistCode': message }); //прицепляем к контролу кастомную ошибку валидации, 
																		//содержащее сообщение из ответа сервера
		this.isMarksProtocolLoading = false;
		this.focusOnCodeElem();
	}

	sendMarks() {
		console.log(this.marksProtocol);
	}

	onMarkChanged(event: any) {
		let elem = event.target as HTMLInputElement;
		let elemIndex = this.marksInputs.index(elem);

		if (elem.value) {
			if (elem.value.match(/^(1|0)$/)) {
				this.marksProtocol.QuestionResults[elemIndex].CurrentMark = Number.parseInt(elem.value);
				this.goToNextInputOrFocusOnSubmitBtn(elemIndex);
			}
			else {
				elem.value = '1';
				this.marksProtocol.QuestionResults[elemIndex].CurrentMark = 1;
				this.goToNextInputOrFocusOnSubmitBtn(elemIndex);
			}
		}
	}

	goToNextInputOrFocusOnSubmitBtn(elemIndex: number) {
		if (elemIndex < this.marksInputs.length - 1) {
			let nextInput = this.marksInputs.get(elemIndex + 1);
			if (!nextInput.value) {
				nextInput.focus();
			}
		}
		else {
			$('#submitBtn').focus();
		}
	}

	cancel() {
		this.location.back();
	}

	focusOnCodeElem() {
		this.renderer.invokeElementMethod(this.participCodeElem.nativeElement, 'focus');
	}
}
