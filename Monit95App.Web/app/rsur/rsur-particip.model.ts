import { BSModalContext } from "angular2-modal/plugins/bootstrap";

export class RsurParticipModel extends BSModalContext {
   
    constructor(
        public participCode: string,
        public surname: string,        
        public name?: string,
        public secondName?: string,
		public subjectName?: string,
		public schoolIdWithName?: string,
        public categoryName?: string,
        public areaName?: string,
		public birthday?: Date,
		public classNumbers?: string		
    ) 
    
    { 
		super();
	}
}