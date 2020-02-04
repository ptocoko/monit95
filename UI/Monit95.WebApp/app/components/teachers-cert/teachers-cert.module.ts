import { NgModule } from '@angular/core';
import { HomeComponent } from '../../particips/home/home.component';
import { Route, RouterModule } from '@angular/router';

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