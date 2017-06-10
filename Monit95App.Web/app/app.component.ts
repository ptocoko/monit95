import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app/app.component.html'
})
export class AppComponent implements OnInit {
    userHasAreaRole: boolean;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.getName().subscribe(
            response => {
                let result = response.json();           
                this.userHasAreaRole = result.IsAreaRole;              
            }
        );
    }
}