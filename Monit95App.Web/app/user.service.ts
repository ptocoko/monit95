﻿import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UserModel } from './user.model';

@Injectable()
export class UserService {
	private userNameAndRole: Observable<UserModel>;

	constructor(private http: Http) {
		
	}

	getName(): Observable<UserModel> {
		return this.http.get('/api/Account/GetUserNameAndRole')
			.map((resp: Response) => {
				let res = resp.json();
				return new UserModel(res.UserName, <boolean>res.IsAreaRole);
			});
    }

}