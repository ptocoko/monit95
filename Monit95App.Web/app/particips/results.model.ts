export class ResultsModel {
	constructor(
		public resultDetails: ResultDetailsModel[]
	) { }
	
}

export class ResultDetailsModel {
	constructor(
		public subjectName: string,
		public testDate: Date,
		public marks: string,
		public grade5: number,
		public testId: string,
		public reportExisting: boolean
	) { }
}