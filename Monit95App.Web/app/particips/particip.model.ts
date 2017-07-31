import { BSModalContext } from "angular2-modal/plugins/bootstrap";

export class ParticipModel extends BSModalContext {

    //participCode: string;
    //surname?: {
    //    value: string,
    //    has: boolean,
    //};

    //name?: string;
    //secondName?: string;
    //subjectName?: string;
    //schoolIdWithName?: string;
    //categoryName?: string;
    //areaName?: string;
    //birthday?: Date;
    //classNumbers?: string;
    //hasRequestToEdit?: boolean;
    constructor(
        public participCode: string,
        public surname: {
            value: string,
            has: boolean
        },
        public name?: string,
        public secondName?: string,
		public subjectName?: string,
		public schoolIdWithName?: string,
        public categoryName?: string,
        public areaName?: string,
		public birthday?: Date,
		public classNumbers?: string,
		public hasRequestToEdit?: boolean
    ) 
    
    { 
		super();
	}
}