import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Route[] = [
	{
		path: 'teachers-cert/home',
		component: HomeComponent
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	declarations: [HomeComponent]
})
export class TeachersCertModule { }