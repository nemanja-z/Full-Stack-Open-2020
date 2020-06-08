export interface DiagnoseEntry {
    code: string,
    name: string,
    latin?: string
}
export enum Gender {
    male = "m",
    female = "f"
}
export interface PatientEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn?: string,
    gender: Gender,
    occupation: string
}
export type ClearedPatientEntry = Omit<PatientEntry, 'ssn'>;
export type NewPatientEntry = Omit<PatientEntry, 'id'>;