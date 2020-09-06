import React from 'react';
import { CoursePart } from '../index';

const Total: React.FC<{ exercise: CoursePart[] }> = ({ exercise }) => {
    return (
        <p>
            Number of exercises{" "}
            {exercise.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
    )
}
export default Total; 