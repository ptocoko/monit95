import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

export class RsurParticip extends BSModalContext {
   
    constructor(
        public Code: number,
        public Surname: string,        
        public Name: string,        
		public RsurSubjectName: string,
		public SchoolIdWithName: string,
        public CategoryName: string,
        public AreaCodeWithName: string,
        public Birthday: Date,
        public Experience: number,
        public Phone: string,
        public ClassNumbers: string,		
        public ActualCode: number,
        public Email: string,
        public SecondName?: string,
        public SchoolIdFrom?: string
    ) 
    
    { 
		super();
	}
}