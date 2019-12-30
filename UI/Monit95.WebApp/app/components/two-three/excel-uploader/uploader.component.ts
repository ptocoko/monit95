import { Component, Input } from '@angular/core';
import { FileService } from '../../../services/file.service';
import { AccountService } from '../../../services/account.service';
import { getFileExtension } from '../../../utils/functions';
import { SchoolCollectorService } from '../../../shared/school-collector.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { AreaCollectorService } from '../../../shared/area-collector.service';
import { Collector } from '../../../shared/collector.interface';
import { Subscription ,  of } from 'rxjs';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { switchMap, catchError, map, filter } from 'rxjs/operators';

const REPOSITORY_ID = 6;

@Component({
	selector: 'app-excel-upload',
	templateUrl: './uploader.component.html',
	styleUrls: ['./uploader.component.css']
})
export class ExcelUploadComponent implements OnDestroy {
	uploadStatus: 'waiting' | 'uploading' | 'uploaded' = 'waiting';
	uploadedFileId: number;
	collectorService: Collector;

	@Input('testCode') testCode: string;
	@Input('collectorId') collectorId: number;
	@Input('fileNamePrefix') fileNamePrefix: string;
	@Input('collectorFor') collectorFor: 'school' | 'area';
	@Input('caption') caption: string;
	@Input('downloadHref') downloadHref: string;
	@Input('downloadExt') downloadExt: string;
	@Input('repositoryId') repositoryId: number;

	uploadFileSub$: Subscription;
	fileIdSub$: Subscription;
	deleteFileSub$: Subscription;

	constructor(private fileService: FileService,
		private accountService: AccountService,
		private schoolCollectorService: SchoolCollectorService,
		private areaCollectorService: AreaCollectorService,
		private dialog: MatDialog) { }

	ngOnInit() {
		if (this.collectorFor === 'school') {
			this.collectorService = this.schoolCollectorService;
		} else if (this.collectorFor === 'area') {
			this.collectorService = this.areaCollectorService;
		} else {
			throw new Error('collectorFor is not setted');
		}

		if (this.repositoryId === undefined || this.repositoryId === null || isNaN(this.repositoryId)) {
			throw new Error('repositoryId is not setted');
		}
		
		let fileName: string;
		this.fileIdSub$ = this.getFileName().pipe(
			switchMap(filename => {
				fileName = filename;
				return this.collectorService.getCollectorState(this.collectorId);
			}),
			switchMap(state => {
				if (state.IsFinished) {
					this.uploadStatus = 'uploaded';
					return this.fileService.getFileId(fileName, this.repositoryId);
				} else {
					return of(-1);
				}
			})
		).subscribe(fileId => {
			if (fileId > 0) {
				this.uploadedFileId = fileId;
			}
		});
	}

	uploadXlsx(evt: any) {
		const file: File = evt.target.files[0];

		if (validateFile(file)) {
			this.uploadFileSub$ = this.getFileName().pipe(
				switchMap(filename => {
					this.uploadStatus = 'uploading';
					return this.fileService.uploadFile(this.repositoryId, file, filename, false, false)
				}),
				switchMap(fileId => {
					this.uploadedFileId = Number.parseInt(fileId);
					return this.collectorService.isFinished(this.collectorId, true)
				})
			).subscribe(() => this.uploadStatus = 'uploaded');
		}
		evt.target.value = '';
	}

	cancelUploaded() {
		if (this.uploadedFileId) {
			const dialogRef = this.dialog.open(ConfirmDialogComponent, {
				width: '400px',
				disableClose: true,
				data: { message: 'Вы действительно хотите удалить отправленный протокол проверки заданий?' }
			});

			dialogRef.afterClosed().subscribe(res => {
				if (res) {
					this.deleteFileSub$ = this.fileService.deleteFile(this.uploadedFileId)
						.pipe(
							switchMap(() => this.collectorService.isFinished(this.collectorId, false))
						)
						.subscribe(() => {
							this.uploadStatus = 'waiting';
							this.uploadedFileId = null;
						});
				}
			});
		}
	}

	getFileName() {
		return this.accountService.auth
			.pipe(
				map(auth => `${this.fileNamePrefix}_${auth.UserName}.${this.downloadExt}`)
			);
	}

	ngOnDestroy() {
		if (this.fileIdSub$) this.fileIdSub$.unsubscribe();
		if (this.uploadFileSub$) this.uploadFileSub$.unsubscribe();
		if (this.deleteFileSub$) this.deleteFileSub$.unsubscribe();
	}
}

function validateFile(file: File): boolean {
	if (getFileExtension(file.name) !== 'xlsx') {
		alert('Неподдерживаемы тип файла! ' + file.name);
		return false;
	}

	return true;
}