﻿
import { Component, OnInit } from '@angular/core';
import { RsurProtocolsService } from "../../../../../services/rsur-protocols.service";
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: 'matching-protocol-component',
	templateUrl: `./app/components/rsur/protocols/protocol/matching-protocol/matching-protocol.component.html?v=${new Date().getTime()}`
})
export class MatchingProtocolComponent implements OnInit{
	protocolScan: any = {};

	rsurParticipCode: number;
	particip: any;

	marksInputs: JQuery<HTMLInputElement>;

	constructor(private rsurProtocolsService: RsurProtocolsService,
				private location: Location,
				private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			let fileId: number = params["id"];

			this.rsurProtocolsService.getScan(fileId).subscribe(res => {
				this.protocolScan = res;

				//$(document).ready(() => {
				//	this.marksInputs = $('.markInput') as JQuery<HTMLInputElement>;
				//	this.marksInputs.get(0).focus();
				//	this.marksInputs.get(0).select();

				//	this.marksInputs.focus((event) => event.target.select());
				//});
			});
		});
	}

	onSubmit() {
		console.log(this.rsurParticipCode);
	}

	onMarkChanged(event: any) {
		let elem = event.target as HTMLInputElement;
		let elemIndex = this.marksInputs.index(elem);

		//if (elem.value) {
		//	if (elem.value.match(/^(1|0)$/)) {
		//		this.goToNextInputOrFocusOnSubmitBtn(elemIndex);
		//	}

		//	else {
		//		elem.value = '1';
		//		this.marks[elemIndex] = '1'
		//		this.goToNextInputOrFocusOnSubmitBtn(elemIndex);
		//	}
		//}
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
