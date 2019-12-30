var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatCardModule, MatTableModule, MatSortModule, MatPaginatorModule, MatProgressSpinnerModule, MatInputModule, MatFormFieldModule, MatToolbarModule, MatProgressBarModule, MatTooltipModule, MatSelectModule, MatSlideToggleModule, MatSnackBarModule, MatCheckboxModule, MatRadioModule, MatIconModule, MatExpansionModule, MatListModule } from '@angular/material';
import { A11yModule } from '@angular/cdk/a11y';
var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        NgModule({
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
                MatListModule
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
                MatListModule
            ]
        })
    ], MaterialModule);
    return MaterialModule;
}());
export { MaterialModule };
//# sourceMappingURL=material.module.js.map