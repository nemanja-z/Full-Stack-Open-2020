interface Summary {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const countExercise = (goal: number, hour: Array<number>): Summary => {
    if (goal < 0 || goal === 0) throw new Error('Stop being lazy and set target value');
    const numDays = hour.length;
    const trainingDays = hour.filter(h => h > 0).length;
    const target = goal;
    const numHours = hour.reduce((curr, next) => curr + next);
    const average = numHours / numDays;
    let success = false;
    if (average >= target) success = true;
    const diff = average - target;
    let rating, desc;
    if (diff < -1) {
        desc = `You need to be more active`;
        rating = 0;
    } else if (diff < 0 && diff > -1) {
        desc = `You are almost there.`;
        rating = 1;
    } else {
        rating = 3;
        desc = `That's great.`;
    }
    return {
        periodLength: numDays,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: desc,
        target: target,
        average: average
    };
};
const goal = Number(process.argv[2]);
const hour = process.argv.slice(3).map(h => Number(h));
console.log(countExercise(goal, hour));