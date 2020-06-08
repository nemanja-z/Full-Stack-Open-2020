import patientData from '../data/patients';
import { ClearedPatientEntry, NewPatientEntry, PatientEntry } from '../types';


const patients: Array<ClearedPatientEntry> = patientData;
const getEntries = (): ClearedPatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) =>
        ({ id, name, dateOfBirth, gender, occupation }));
};


const addPatient = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: Date.now().toString(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    addPatient
};