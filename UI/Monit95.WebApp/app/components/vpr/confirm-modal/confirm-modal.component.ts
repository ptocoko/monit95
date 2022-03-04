import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	templateUrl: `./app/components/vpr/confirm-modal/confirm-modal.component.html?v=${new Date().getTime()}`,
	//styleUrls: [`./app/components/vpr/confirm-modal/confirm-modal.component.css?v=${new Date().getTime()}`],
})
export class ConfirmModalComponent {
	constructor(public dialogRef: MatDialogRef<ConfirmModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
}