import { Component, OnInit } from "@angular/core";
import { AccountService } from "./account/account.service";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: "app-root",
    templateUrl: "./app/app.component.html"
})
export class AppComponent implements OnInit {
	isAreaRole = false;
	isCokoRole = false;
	isRsur: boolean = true;

    constructor(private accountService: AccountService) { }

    ngOnInit() {
		//this.userService.getName().subscribe(user => this.handler(user.userRoles));
	}

	handler(userRoles: string[]) {
		this.isAreaRole = userRoles.indexOf('area') >= 0;
		this.isCokoRole = userRoles.indexOf("coko") >= 0;
	}

	onActivate(event: any) {
		if (event.constructor.name === "ClassParticipsListComponent") {
			this.isRsur = false;
		}
		else {
			this.isRsur = true;
		}
	}
}