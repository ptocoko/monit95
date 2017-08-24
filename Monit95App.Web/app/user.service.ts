import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserModel } from "./user.model";

@Injectable()
export class UserService {    

    constructor(private http: Http) { }

    getAccount() {
		return this.http.get("api/accounts");
    }
}