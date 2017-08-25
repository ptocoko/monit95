import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.service";

@Component({
    selector: "app-root",
    templateUrl: "./app/app.component.html"
})
export class AppComponent implements OnInit {
	isAreaRole = false;
	isCokoRole = false;
	isRsur: boolean = true;

    constructor(private userService: UserService) { }

    ngOnInit() {
		//this.userService.getName().subscribe(user => this.handler(user.userRoles));
	}

	handler(userRoles: string[]) {
		this.isAreaRole = userRoles.indexOf("area") >= 0;
		this.isCokoRole = userRoles.indexOf("coko") >= 0;
	}
}