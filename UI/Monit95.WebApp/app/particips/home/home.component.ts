import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { CardsService } from '../../services/cards.service';
import { downloadFile } from '../../utils/functions';

@Component({
	templateUrl: `./app/particips/home/home.component.html?v=${new Date().getTime()}`
})
export class HomeComponent {
	date = new Date();
	isBadSchool: boolean;

	constructor(private account: AccountService, private cards: CardsService) { }

	ngOnInit() {
		this.account.getAccount().subscribe(account => this.isBadSchool = this.badSchools(account.UserName));
	}

	downloadCards(projectId: number) {
		this.cards.getForSchool(projectId).subscribe(cards => {
			const url = window.URL.createObjectURL(cards);
			downloadFile(url, 'результаты.zip');
		});
	}

	setTimer(day: number, hours: number = 12): boolean {
		return (this.date.getDate() === day && this.date.getHours() >= hours) || this.date.getDate() > day;
	}

	private badSchools(schoolId: string): boolean {
		const schoolIds = ['0312', '0186', '0560', '0164', '0226', '0280', '0268', '0225', '0149', '0178', '0338', '0162', '0214', '0296', '0151', '0212', '0435', '0362', '0161',
			'0416', '0160', '0223', '0409', '0139', '0307', '0319', '0005', '0290', '0201', '0047', '0258', '0287', '0318', '0315', '0305', '0190', '0495', '0253', '0316', '0339',
			'0308', '0198', '0317', '0335', '0288', '0254', '0325', '0056', '0324', '0302 ', '0259', '0010', '0138', '0248', '0556', '0244', '0282', '0176', '0371', '0238', '0558',
			'0380', '0147', '0377', '0553', '0554', '0375', '0374', '0266', '0379', '0404', '0237', '0236', '0204', '0174', '0395', '0293', '0398', '0336', '0140', '0397', '0402',
			'0196', '0399', '0401', '0405', '0235', '0309', '0175', '0053', '0173', '0332', '0400', '0191', '0406', '0279', '0363', '0487', '0372', '0145', '0229', '0297', '0208',
			'0218', '0228', '0366', '0617', '0276', '0216', '0169', '0159', '0370', '0163', '0154', '0376', '0384', '0442', '0445', '0414', '0285', '0252', '0441', '0391', '0088',
			'0015', '0021', '0067', '0132', '0019', '0069', '0012', '0451', '0070', '0090', '0129', '0301', '0281', '0188', '0313', '0211', '0148', '0294', '0298', '0263', '0187',
			'0158', '0157', '0058', '0310', '0239', '0230', '0385', '0241', '0337', '0311', '0142', '0143', '0207', '0588', '0156', '0368', '0265', '0341', '0060', '0580', '0028',
			'0086', '0466'];

		return schoolIds.indexOf(schoolId) > -1;
	}
}