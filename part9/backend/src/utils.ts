import { NewPatientEntry, Gender } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const parseBirth = (dateOfBirth: any): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing birth date: ' + dateOfBirth);
    }
    return dateOfBirth;
};
const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};
const parseSSN = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect snn: ' + ssn);
    }
    return ssn;
};
const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};
const toNewPatientEntry = (object: any): NewPatientEntry => {
    return {
        name: parseName(object.name),
        ssn: parseSSN(object.ssn),
        dateOfBirth: parseBirth(object.dateOfBirth),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender)
    };
};
export default toNewPatientEntry;