import React from 'react'
import { CoursePart } from '../index';
import Part from './Part'
const Content: React.FC<{ course: CoursePart[] }> = ({ course }) => {
    return (
        <div>
            {course.map((c, i) =>
                <Part key={i} course={c} />
            )}
        </div>
    )
}
export default Content;