import { Component, OnInit,  } from '@angular/core';
import { SchoolFileService } from '../../services/school-file.service';

// material
import { MatTableDataSource } from '@angular/material';

@Component({
	selector: 'school-files',
    templateUrl: `./app/components/school-files/school-files.component.html?v=${new Date().getTime()}`,
    styleUrls: [`./app/components/school-files/school-files.component.css?v=${new Date().getTime()}`]
    
})
export class SchoolFilesComponent implements OnInit {
    files: FileItem[];        
    isLoading: boolean = true;    

    displayedColumns = ['ProjectName', 'Name', 'Year', 'Status'];
    dataSource: any;
    
    constructor(private readonly schoolFileService: SchoolFileService) {

    }

	ngOnInit() {
		this.schoolFileService.getFiles().subscribe(response => {
			//console.log(response);
			this.files = response as FileItem[];
			this.dataSource = new MatTableDataSource<FileItem>(this.files);
			this.isLoading = false;
		});
	}

	setReportIsGot(report: FileItem, button: HTMLButtonElement) {
		button.disabled = true;
		this.schoolFileService.setReportIsGot(report.Id).subscribe(res => {
			report.IsGot = true;
		}, error => {
			button.disabled = false;
			throw error;
		});
	}
}

interface FileItem {
	Id: number;
    ProjectName: string;
    Name: string;
    Link: string;        
	Year: string;
	IsGot: boolean;
}
