import express from 'express';
const router = express.Router();
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';
router.get('/', (_req, res) => {
    res.send(patientService.getEntries());
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatient = patientService.addPatient(newPatientEntry);
        res.send(addedPatient);
    }
    catch (e) {
        res.status(400).send(e);
    }
});


export default router;