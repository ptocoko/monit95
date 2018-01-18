import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
	MatSortModule,
	MatPaginatorModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
	MatProgressBarModule,
	MatTooltipModule,
	MatSelectModule,
	MatSlideToggleModule,
	MatSnackBarModule,
	MatCheckboxModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatCardModule,
        MatTableModule,
		MatSortModule,
		MatPaginatorModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatFormFieldModule,
        MatToolbarModule,
		MatProgressBarModule,
		MatTooltipModule,
		MatSelectModule,
		MatSnackBarModule,
		MatSlideToggleModule,
		MatCheckboxModule
    ],
    exports: [
        MatButtonModule,
        MatDialogModule,
        MatCardModule,
        MatTableModule,
		MatSortModule,
		MatPaginatorModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatFormFieldModule,
        MatToolbarModule,
		MatProgressBarModule,
		MatTooltipModule,
		MatSelectModule,
		MatSnackBarModule,
		MatSlideToggleModule,
		MatCheckboxModule
    ]  
})
export class MaterialModule { }