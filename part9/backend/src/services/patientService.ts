import patientsData from '../data/patients';
import { ClearedPatientEntry, NewPatientEntry, Patient, Entry, NewEntry } from '../types';
import { v4 as uuid } from 'uuid';


/* const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
}; */ 
let patients: Patient[] = patientsData;
const getEntries = (): ClearedPatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) =>
        ({ id, name, dateOfBirth, gender, occupation, entries }));
};
const getById = (id: string): Patient | undefined => {
    const found = patients.find(p => p.id === id);
    return found;
};
const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry:Patient = {
        id: uuid(),
        ...entry,
        entries:[] as Entry[]
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};
const addEntry = (patientId: string, entry: NewEntry): Patient | undefined => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) throw new Error("malformed id");
    if (!entry.date || !entry.description || !entry.specialist) throw new Error('error: data is missing');
    const addEntry: Entry = { ...entry, id: uuid() };
    patient.entries.push(addEntry)
    return patient;
}

export default {
    getEntries,
    addPatient,
    getById,
    addEntry
};