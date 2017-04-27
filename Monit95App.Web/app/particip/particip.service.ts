import { Particip } from './particip';

export class ParticipService {

    private data: Particip[] = [
        { surname: "Shakhabov", name: "Adam" },
        { surname: "Muciev", name: "Adlan" }

    ];
    getData(): Particip[] {

        return this.data;
    }
    addData(surname: string, name: string) {

        this.data.push(new Particip(surname, name));
    }
}