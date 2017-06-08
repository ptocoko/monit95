import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

export class ParticipModel extends BSModalContext {
    constructor(
        public participCode: string,
        public surname: string,
        public name: string,
        public secondName: string,
		public subjectName: string,
		public birthday: Date,
		public classNumbers: string
        //public schoolIdWithName: string,
        //public categName: string,
        //public experience: number,
        //public phone: string,
        //public email?: string
    ) { 
		super();
	}
}