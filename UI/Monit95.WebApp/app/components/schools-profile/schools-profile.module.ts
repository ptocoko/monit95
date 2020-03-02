import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../../shared/shared-module';
import { SchoolsProfileService } from '../../services/schools-profile/schools-profile.service';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Route[] = [
	{ path: 'schools-profile', component: ProfileComponent }
]

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, MaterialModule, RouterModule.forChild(routes)],
	declarations: [ProfileComponent],
	providers: [SchoolsProfileService]
})
export class SchoolsProfileModule { }