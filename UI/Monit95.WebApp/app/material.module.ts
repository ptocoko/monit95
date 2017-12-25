import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
	MatProgressBarModule,
	MatTooltipModule,
	MatSelectModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatCardModule,
        MatTableModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatFormFieldModule,
        MatToolbarModule,
		MatProgressBarModule,
		MatTooltipModule,
		MatSelectModule
    ],
    exports: [
        MatButtonModule,
        MatDialogModule,
        MatCardModule,
        MatTableModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatFormFieldModule,
        MatToolbarModule,
		MatProgressBarModule,
		MatTooltipModule,
		MatSelectModule
    ]  
})
export class MaterialModule { }