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
    MatProgressBarModule
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
        MatProgressBarModule
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
        MatProgressBarModule
    ]  
})
export class MaterialModule { }