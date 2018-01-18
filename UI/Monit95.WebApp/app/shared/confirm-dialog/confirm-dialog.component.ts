import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
	templateUrl: `./app/shared/confirm-dialog/confirm-dialog.component.html?v=${new Date().getTime()}`
})
export class ConfirmDialogComponent {

	constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, 
				@Inject(MAT_DIALOG_DATA) public data: any) { }
	
}