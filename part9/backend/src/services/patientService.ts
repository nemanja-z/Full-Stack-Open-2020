import patientsData from '../data/patients';
import { PublicPatient, NewPatientEntry, Patient, Entry } from '../types';
import { v4 as uuid } from 'uuid';


const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};
const patients: Patient[] = patientsData;
const getEntries = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) =>
        ({ id, name, dateOfBirth, gender, occupation, entries }));
};
const getById = (id: string): PublicPatient[] => {
    const found = patients.filter(p => p.id === id);
    return found.map(({ id, name, dateOfBirth, gender, occupation, entries }) =>
        ({ id, name, dateOfBirth, gender, occupation, entries }));
};
const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry:Patient = {
        id: uuid(),
        ...entry
    };
    patients.concat(newPatientEntry);
    return newPatientEntry;
};
const addEntry = (patientId: string, entry: Entry): Patient | undefined => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) throw new Error('error: malformed id');
    if (!entry.date || !entry.description || !entry.specialist) throw new Error('error: data is missing');

    const updatedPatient = (): Patient => {
        const newEntry:Entry = {
            ...entry,
            id:uuid()
        };
        patient.entries?.concat(newEntry);
        return patient;
    };

    switch (entry.type) {
        case 'Hospital':
            if (!entry.discharge) throw new Error('error: discharge data missing');
            return updatedPatient();
        case 'OccupationalHealthcare':
            if (!entry.employerName) throw new Error('error: employer name missing');
            return updatedPatient();
        case 'HealthCheck':
            if (!entry.healthCheckRating) throw new Error('error: healthcheck rating missing');
            return updatedPatient();
        default:
            return assertNever(entry);
    }
};

export default {
    getEntries,
    addPatient,
    getById,
    addEntry
};