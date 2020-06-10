import patientData from '../data/patients';
import { PublicPatient, ClearedPatientEntry, NewPatientEntry, Patient } from '../types';


const patients: Array<ClearedPatientEntry> = patientData;
const getEntries = (): ClearedPatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) =>
        ({ id, name, dateOfBirth, gender, occupation }));
};
const getById = (id: string): PublicPatient[] => {
    const found = patients.filter(p => p.id === id);
    return found.map(({ id, name, dateOfBirth, gender, occupation, entries }) =>
        ({ id, name, dateOfBirth, gender, occupation, entries }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: Date.now().toString(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    addPatient,
    getById
};