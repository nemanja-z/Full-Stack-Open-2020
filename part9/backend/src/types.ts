
export interface DiagnoseEntry {
    code: string,
    name: string,
    latin?: string
}
export enum Gender {
    male = "male",
    female = "female"
}
/* export interface PatientEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn?: string,
    gender: Gender,
    occupation: string
} */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries?: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type ClearedPatientEntry = Omit<Patient, 'ssn'>;
export type NewPatientEntry = Omit<Patient, 'id'>;