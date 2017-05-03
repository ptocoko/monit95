import { Component, OnInit } from '@angular/core';

import { UserService } from './app/user.service';

@Component({
    selector: 'particips',
    templateUrl: './app/particips/particips.html'
})

export class ParticipsComponent implements OnInit{
    userName: string;

    constructor(private userService: UserService) { };

    ngOnInit() {
        this.userService.GetName().subscribe(
            response => this.userName = response
        );
    }
}