export interface VprWeekSchool {
    ClassNumber: string;
    SubjectCode: string;
    HasError: boolean;
    IsSecond: boolean;
    VprSchoolMarks: VprSchoolMarks[];
}

export interface VprSchoolMarks {
    Marks2: number;
    Marks3: number;
    Marks4: number;
    Marks5: number;
    ClassId: string;
}

export interface VprStatsModel {
    Marks2: { [classId: string]: FirstAndSecond };
    Marks3: { [classId: string]: FirstAndSecond };
    Marks4: { [classId: string]: FirstAndSecond };
    Marks5: { [classId: string]: FirstAndSecond };
}

export interface FirstAndSecond {
    First?: string;
    Second?: string;
}

export interface ClassSelectInfo {
    Subject: string;
    ClassNumber: string;
    AreaCode: number;
    SchoolId: string;
}