import patientsData from '../data/patients';
import { PublicPatient, NewPatientEntry, Patient, Entry } from '../types';
import { v4 as uuidv4 } from 'uuid';


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
    const newPatientEntry = {
        id: uuidv4(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};
const addEntry = (id: string, entry: Entry): Patient => {
    const patient = patients.find(p => p.id === id);
    if (!patient) throw new Error('error: malformed id');
    if (!entry.date || !entry.description || !entry.specialist) throw new Error('error: data is missing');

    const updatedPatient = (): Patient => {
        entry = {
            id: uuidv4(),
            ...entry
        };
        patient.entries?.push(entry);
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