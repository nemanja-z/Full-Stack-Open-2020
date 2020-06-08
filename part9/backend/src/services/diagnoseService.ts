import diagnoseData from '../data/diagnoses';
import { DiagnoseEntry } from '../types';

const diagnoses: Array<DiagnoseEntry> = diagnoseData;
const getEntries = (): DiagnoseEntry[] => {
    return diagnoses;
};

export default {
    getEntries
};