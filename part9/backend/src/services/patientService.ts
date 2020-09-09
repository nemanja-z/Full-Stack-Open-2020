import patientsData from '../data/patients';
import { ClearedPatientEntry, NewPatientEntry, Patient, Entry, NewEntry } from '../types';
import { v4 as uuid } from 'uuid';



const patients: Patient[] = patientsData;
let patientState = [...patients];
const getEntries = (): ClearedPatientEntry[] => {
    return patientState.map(({ id, name, dateOfBirth, gender, occupation, entries }) =>
        ({ id, name, dateOfBirth, gender, occupation, entries }));
};
const getById = (id: string): Patient | undefined => {
    const found = patientState.find(p => p.id === id);
    return found;
};
const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };
    patientState=patientState.concat(newPatientEntry);
    return newPatientEntry;
};
const addEntry = (patientId: string, entry: NewEntry): Patient | undefined => {
    const patient = patientState.find(p => p.id === patientId);
    if (!patient) throw new Error("malformed id");
    const addEntry: Entry = { ...entry, id: uuid() };
    const patientEntry = { ...patient, entries: patient.entries.concat(addEntry) };
    patientState=patientState.map(pat => pat.id === patientEntry.id ? patientEntry : pat);
    return patient;
}

export default {
    getEntries,
    addPatient,
    getById,
    addEntry
};