import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { MarksProtocol } from "../../../../models/marks-protocol.model";
import { Observable } from "rxjs/Observable";
import { FormGroup } from "@angular/forms";

@Component({
	selector: 'marks-protocol',
	templateUrl: `./app/components/rsur/protocols/protocol/marks-protocol.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/protocols/protocol/marks-protocol.component.css?v=${new Date().getTime()}`]
})
export class MarksProtocolComponent implements AfterViewInit {
	@ViewChild('marksForm.form') marksForm: FormGroup;

	@Input('protocol') marksProtocol: MarksProtocol;
	@Input() showParticipCode: boolean;

	@Output() onSend = new EventEmitter<MarksProtocol>();
	@Output() onCancel = new EventEmitter();

	errorMessage: string;

	ngOnInit() {
	}

	ngAfterViewInit(): void {
		//let elements = document.getElementsByClassName('markInput')
		//Observable.fromEvent(document.getElementsByClassName('markInput'), 'input')
		//	.subscribe((event: any) => {
		//		console.log(event);
		//	});
		//this.marksForm.controls.
		console.log(this.marksForm);
	}

	send() {
		this.onSend.emit(this.marksProtocol);
	}

	cancel() {
		this.onCancel.emit();
	}
}