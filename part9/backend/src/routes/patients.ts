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
router.post('/:id/entries', (req, res) => {
    try {
        const addedEntry = patientService.addEntry(req.params.id, req.body);
        res.send(addedEntry);
    }
    catch (e) {
        res.status(400).send(e);
    }
});
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        res.send(patientService.getById(id));
    }
    catch (e) {
        res.status(400).send(e);
    }

});


export default router;