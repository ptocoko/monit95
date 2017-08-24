import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { ParticipService } from "../particips/particip.service";
import { UserModel } from "../user.model";
import { Http } from "@angular/http";

@Component({
	templateUrl: './app/class-particips/class-particips-list.component.html'
})
export class ClassParticipsListComponent implements OnInit {
	constructor(private userService: UserService, private participService: ParticipService, private http: Http) {

	}

	ngOnInit() {
		this.userService.getAccount().subscribe(data => {
			let user = data.json() as UserModel;
			//TODO: Get first class particips
		})
	}

	exportParticips(event: any) {
		let file: File = event.target.files[0];
		if (file.name.split('.').pop() === 'xlsx') {
			let formData: FormData = new FormData();
			formData.append('uploadFile', file, file.name);
			this.http.post('/api/ExcelFiles/Upload', formData).subscribe(res => {
				console.log(res.json());
			})
		}
	}
}