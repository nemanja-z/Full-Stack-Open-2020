type Result = string;
export const calculateBMI = (height: number, weight: number): Result => {
    const convert = height / 100;
    const BMI = weight / (convert * convert);
    if (BMI > 18.5 && BMI < 25) return 'Normal(healthy weight)';
    else if (BMI < 18.5) return 'Underweight';
    else if (BMI > 25 && BMI < 30) return 'Overweight';
    else if (BMI >= 30) return 'Obese';
    else return 'enter data';
};
const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);
console.log(calculateBMI(height, weight));