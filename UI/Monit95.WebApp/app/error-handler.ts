﻿import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

	handleError(error: any) {
		let message = error.message ? error.message : error.toString();
		console.error(error);
		alert('Ошибка! Обратитесь к администратору\n\n' + message);

		//throw error;
	}
}