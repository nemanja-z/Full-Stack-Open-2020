import express from 'express';
const router = express.Router();
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';
router.get('/', (_req, res) => {
    res.send(patientService.getEntries());
});
/* eslint-disable @typescript-eslint/no-explicit-any */
router.post('/', (req, res) => {
    try {
        const { dateOfBirth, name, gender, occupation } = req.body;
        const addedPatient = patientService.addPatient({ dateOfBirth, name, gender, occupation });
        res.send(addedPatient);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});


export default router;