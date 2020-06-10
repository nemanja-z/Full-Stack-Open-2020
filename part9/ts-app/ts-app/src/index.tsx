import React from "react";
import ReactDOM from "react-dom";
import App from './App';

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartOne extends CoursePartBase {
    name: "Fundamentals";
    description?: string;
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase {
    name: "Deeper type usage";
    description?: string;
    exerciseSubmissionLink: string;
}
interface CoursePartFour extends CoursePartBase {
    name: "Learning Typescript";
    mambojambo: string;
}
export const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};
export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;



ReactDOM.render(<App />, document.getElementById("root"));


