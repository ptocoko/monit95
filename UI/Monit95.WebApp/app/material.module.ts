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
	MatCheckboxModule,
	MatRadioModule,
	MatIconModule,
	MatExpansionModule,
	MatListModule,
	MatButtonToggleModule
} from '@angular/material';
import { A11yModule } from '@angular/cdk/a11y';

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
		MatCheckboxModule,
		MatIconModule,
		MatRadioModule,
		A11yModule,
		MatExpansionModule,
		MatListModule,
		MatButtonToggleModule
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
		MatCheckboxModule,
		MatIconModule,
		MatRadioModule,
		A11yModule,
		MatExpansionModule,
		MatListModule,
		MatButtonToggleModule
    ]  
})
export class MaterialModule { }