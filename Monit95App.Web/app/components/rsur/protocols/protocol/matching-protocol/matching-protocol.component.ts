
import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { RsurProtocolsService } from "../../../../../services/rsur-protocols.service";
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { ParticipTestModel } from "../../../../../models/particip-test.model";
import { FormControl, Validators } from "@angular/forms";

@Component({
	selector: 'matching-protocol-component',
	templateUrl: `./app/components/rsur/protocols/protocol/matching-protocol/matching-protocol.component.html?v=${new Date().getTime()}`
})
export class MatchingProtocolComponent implements OnInit{
	protocolScan: any = {};
	particip: ParticipTestModel;

	@ViewChild('participCode') participCodeElem: ElementRef;
	participCodeControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^[0-9]+$/)]);
	marksInputs: JQuery<HTMLInputElement>;

	isLoading: boolean = false;

	constructor(private rsurProtocolsService: RsurProtocolsService,
				private location: Location,
				private route: ActivatedRoute,
				private renderer: Renderer) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			let fileId: number = params["id"];
			
			this.rsurProtocolsService.getScan(fileId).subscribe(res => {
				this.protocolScan = res;

				window.scrollTo(0, 0);
				this.renderer.invokeElementMethod(this.participCodeElem.nativeElement, 'focus');

				this.participCodeControl.valueChanges.subscribe(val => this.codeChange(val));
			});
		});
	}

	onSubmit() {
		console.log(this.particip);
	}

	onMarkChanged(event: any) {
		let elem = event.target as HTMLInputElement;
		let elemIndex = this.marksInputs.index(elem);

		if (elem.value) {
			if (elem.value.match(/^(1|0)$/)) {
				this.particip.ParticipTest.Questions[elemIndex].CurrentMark = Number.parseInt(elem.value);
				this.goToNextInputOrFocusOnSubmitBtn(elemIndex);
			}
			else {
				elem.value = '1';
				this.particip.ParticipTest.Questions[elemIndex].CurrentMark = 1;
				this.goToNextInputOrFocusOnSubmitBtn(elemIndex);
			}
		}
	}

	codeChange(val: any)
	{
		if (val.length === 5) //when codeControl value length becomes 5
		{
			this.participCodeControl.markAsDirty();

			if (this.participCodeControl.valid)
			{
				this.isLoading = true;
				this.rsurProtocolsService.getParticipTest(Number.parseInt(val)).subscribe(
				res => {
					this.particip = res as ParticipTestModel;
					this.isLoading = false;

					$().ready(() => { //после отрисовки формы для оценок с помощью JQuery прицепляем к каждому полю обработчик фокуса и переводим фокус на первое поле
						this.marksInputs = $('.markInput') as JQuery<HTMLInputElement>;
						this.marksInputs.focus((event) => event.target.select());
						this.marksInputs.get(0).focus();
					});
				},
				error => {
					this.isLoading = false;
					let message = error.message ? error.message : error;
					this.participCodeControl.setErrors({ 'notExistCode': message });
				});
			}
		}
	}

	goToNextInputOrFocusOnSubmitBtn(elemIndex: number) {
		if (elemIndex < this.marksInputs.length - 1) {
			let nextInput = this.marksInputs.get(elemIndex + 1);
			nextInput.focus();
		}
		else {
			$('#submitBtn').focus();
		}
	}

	cancel() {
		this.location.back();
	}
}
