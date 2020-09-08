import express from 'express';
const router = express.Router();
import patientService from '../services/patientService';
import {toNewPatientEntry, toNewEntry} from '../utils';

router.get('/', (_req, res) => {
    try {
        res.json(patientService.getEntries());
    } catch (e) {
        res.status(400).send(e.message);
    }
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatient = patientService.addPatient(newPatientEntry);
        res.json(addedPatient);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addEntry(req.params.id, newEntry);
        res.json(addedEntry);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        res.json(patientService.getById(id));
    }
    catch (e) {
        res.status(400).send(e.message);
    }

});


export default router;