import express from 'express';
const app = express();
import { calculateBMI } from './calculateBMI';
import { countExercise } from './exerciseCalculator';

app.use(express.json());
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});
app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    if (!height || !weight) {
        res.status(400).send({ "error": "Missing field" });
    }
    const result = calculateBMI(Number(height), Number(weight));
    const data = {
        weight,
        height,
        bmi: result
    };
    res.send(data);
});
app.post('/exercise', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { goal, hour } = req.body; 
    if (!goal || !hour) {
        res.status(400).send({ "error": "Parameters missing" });
    }
    const count = countExercise(goal, hour);
    console.log(count);
    res.send(count);
});
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});