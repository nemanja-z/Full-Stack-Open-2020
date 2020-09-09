
export interface DiagnoseEntry {
    code: string,
    name: string,
    latin?: string
};
export enum EntryType {
    HealthCheck = "HealthCheck",
    Hospital = "Hospital",
    OccupationalHealthCare = "OccupationalHealthcare"
  }
export enum Gender {
    Male = "male",
    Female = "female"
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
};
export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
};

interface HealthCheckEntry extends BaseEntry {
    type:EntryType.HealthCheck;
    healthCheckRating: HealthCheckRating;
};
export interface Discharge {
    date: string,
    criteria: string
};
interface HospitalEntry extends BaseEntry {
    type: EntryType.Hospital;
    discharge: Discharge;
};
export interface SickLeave {
    startDate: string,
    endDate: string
};
interface OccupationalHealthcareEntry extends BaseEntry {
    type: EntryType.OccupationalHealthCare;
    employerName: string;
    sickLeave?: SickLeave
};
export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;
export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: Entry[]
};
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type ClearedPatientEntry = Omit<Patient, 'ssn'>;
export type NewPatientEntry = Omit<Patient, 'id'>;
export type NewBaseEntry = Omit<BaseEntry, "id">;
export type NewEntry = DistributiveOmit<Entry, "id">;
