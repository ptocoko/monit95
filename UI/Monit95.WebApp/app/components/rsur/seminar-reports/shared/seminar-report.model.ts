﻿export class SeminarReportView {
	RsurReportId: number;
	DateText: string;	
	SchoolName: string;
}

export class SeminarReportEdit {
	SeminarReportViewDto: SeminarReportView;
	SeminarFiles: SeminarFile[];
}

export class SeminarFile {
	Type: 'pdf' | 'image';
	Key: string;
	FileSourceString: string;
}