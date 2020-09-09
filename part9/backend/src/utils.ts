import { NewPatientEntry, Gender, NewEntry, NewBaseEntry, EntryType, SickLeave, Discharge } from './types';
/* eslint-disable @typescript-eslint/no-explicit-any */
const assertNever = (value: never): never => {
  throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}; 
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const isValidEntryType = (entry: any): entry is EntryType=> {
  return Object.values(EntryType).includes(entry);
}
const isNumber = (num: any): num is number => {
  return typeof num === 'number' || num instanceof Number;
};
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const isArrayOfStrings = (code: any): code is Array<string> => {
  return code.every((c:any) => typeof c === 'string' || c instanceof String);
}
const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};
const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};
const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};
const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};
const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};
const parseType = (type: any): EntryType => {
  if (!type || !isValidEntryType(type)) {
    throw new Error(`Incorrect or missing type: ${type || ""}`);
  }
  return type;
}
const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing name: ' + description);
  }
  return description;
};
const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing name: ' + specialist);
  }
  return specialist;
};
const parseDiagnosis = (code: any): Array<string> => {
  if (!code || !isArrayOfStrings(code)) {
    throw new Error('Incorrect or missing diagnosis: ' + code);
  }
  return code;
}
const parseCheck = (rating: any): number => {
  if (!(rating in [0,1,2,3]) || !isNumber(rating)) {
    throw new Error(`Incorrect or missing rating: ${rating || ""}`);
  }
  return rating;
}
const parseCriteria = (criteria: any): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error(`Incorrect or missing criteria: ${criteria || ""}`);
  }
  return criteria;
}
const parseEmployer = (employer: any): string => {
  if (!employer || !isString(employer)) {
    throw new Error(`Incorrect or missing employer: ${employer || ""}`);
  }
  return employer;
}
const parseSickLeave = (leave: any): SickLeave => {
  if (!leave) {
    throw new Error("Sick leave is missing");
  }
  return {
    startDate: parseDate(leave.startDate),
    endDate: parseDate(leave.endDate),
  };
}
const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) {
    throw new Error("Sick leave is missing");
  }
  return {
    date: parseDate(discharge.date),
    criteria: parseCriteria(discharge.criteria),
  };
}
const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseName(object.name),
    ssn: parseSSN(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    entries: []
  };
};

const toNewBaseEntry = (object: any): NewBaseEntry => {
  const baseEntry: NewBaseEntry = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist)
  };
  if (object.diagnosisCodes) {
    baseEntry.diagnosisCodes = parseDiagnosis(object.diagnosisCodes);
  }
   return baseEntry;
}
const toNewEntry = (object: any): NewEntry => {
    const newBaseEntry = toNewBaseEntry(object) as NewEntry; 
    newBaseEntry.type = parseType(object.type);
    switch (newBaseEntry.type) {
      case EntryType.HealthCheck: {
        return {
          ...newBaseEntry,
          healthCheckRating: parseCheck(object.healthCheckRating)
        }
      }
      case EntryType.Hospital: {
        return {
          ...newBaseEntry,
          discharge: parseDischarge(object.discharge)
        }
      }
        case EntryType.OccupationalHealthCare: {
          const occupation = {
            ...newBaseEntry,
            employerName: parseEmployer(object.employerName)
          };
          if (object.sickLeave) {
            occupation.sickLeave=parseSickLeave(object.sickLeave)
          }
          return occupation;
        }
      default: return assertNever(newBaseEntry);
  };
}; 

export { toNewPatientEntry, toNewEntry };