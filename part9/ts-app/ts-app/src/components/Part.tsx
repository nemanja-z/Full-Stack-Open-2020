import React from 'react'
import { CoursePart, assertNever } from '../index';
const Part: React.FC<{ course: CoursePart }> = ({ course }) => {
    switch (course.name) {
        case 'Fundamentals':
            {
                return (
                    <div>
                        <h2>{course.name}</h2>
                        <p>{course.exerciseCount}</p>
                        {course.description && (<p>{course.description}</p>)}
                    </div>
                )
            }

        case "Using props to pass data":
            {
                return (
                    <div>
                        <h2>{course.name}</h2>
                        <p>{course.groupProjectCount}</p>
                    </div>
                )
            }

        case "Deeper type usage":
            {
                return (
                    <div>
                        <h2>{course.name}</h2>
                        {course.description && (<p>{course.description}</p>)}
                        <p>{course.exerciseCount}</p>
                        <p><a href={course.exerciseSubmissionLink}>
                            {course.exerciseSubmissionLink}
                        </a></p>
                    </div>
                )
            }
        case "Learning Typescript":
            {
                return (
                    <div>
                        <h2>{course.name}</h2>
                        <p>{course.exerciseCount}</p>
                        <p>{course.mambojambo}</p>
                    </div>
                )
            }
        default:
            return assertNever(course);
    }
}
export default Part;
