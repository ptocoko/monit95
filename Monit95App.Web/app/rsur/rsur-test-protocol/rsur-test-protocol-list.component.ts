import { Component, OnInit } from '@angular/core';
import { MarksService } from './marks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RsurTestService } from '../rsur-test/rsur-test.service';

export class RsurParticipMarks {
	ParticipTestId: number;
	Code: number;
	Marks: string;
}

@Component({
    templateUrl: `./app/rsur/rsur-test-protocol/rsur-test-protocol-list.component.html?v=${new Date().getTime()}`
})
export class RsurTestProtocolListComponent implements OnInit {
	rsurParticips: RsurParticipMarks[];
	isLoading: boolean;
	participsWithoutMarks: number = 0;
	testNumberCodeWithName: string;

	searchText: string;

    constructor(private readonly marksService: MarksService,
                private readonly rsurTestService: RsurTestService,
                private readonly route: ActivatedRoute,
                private readonly router: Router) {
        
    }

	ngOnInit() {
		this.isLoading = true;
		this.route.params.subscribe(params => {
			const rsurTestId = params['id'];
			this.rsurTestService.getTestName(rsurTestId).subscribe(res => this.testNumberCodeWithName = res.json());

			this.marksService.getRsurMarksByRsurTestId(rsurTestId).subscribe(res => {
				this.rsurParticips = res.json() as RsurParticipMarks[];
				this.participsWithoutMarks = this.rsurParticips.filter(f => !f.Marks).length;
				this.isLoading = false;

				$.ready.then(() => {
					$('#searchInput').find('input').focus();
					$('#searchInput').find('span').hide();
				});
			});
		});
	}

    changeMarks(participTestId: number) {        
        this.router.navigate(['/rsur/testprotocols', participTestId]);		
	}

	onSearchTextChange(event: KeyboardEvent) {
		if (event.keyCode !== 13) {
			if (this.rsurParticips.filter(x => x.Code.toString().indexOf(this.searchText) !== -1).length === 1) {
				$('#searchInput').find('input').keyup(event => {
					if (event.keyCode === 13) {
						this.changeMarks(this.rsurParticips.find(x => x.Code.toString().indexOf(this.searchText) !== -1).ParticipTestId);
					}
				});
				$('#searchInput').addClass('has-success');
				$('#searchInput').find('span').show();
			}
			else {
				$('#searchInput').find('input').keyup(event => { });
				$('#searchInput').removeClass('has-success');
				$('#searchInput').find('span').hide();
			}
		}
	}
}