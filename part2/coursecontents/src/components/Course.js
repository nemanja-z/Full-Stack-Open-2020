import React from 'react'

function Part({ name, exercises }) {
    return (
        <div>
            <p> {name} {exercises}</p>
        </div>
    )
}
function Content({ course }) {
    return (
        <div>
            {course.map((c, i) =>
                <Part id={i} name={c.name} exercises={c.exercises}

                />)}


        </div>
    )
}
function Header({ course }) {
    return (
        <div>
            <h1>{course}</h1>
        </div>
    )
}
function Total(props) {
    return (
        <div>
            <p style={{ fontWeight: 'bold' }}>Number of exercises: {props.course.reduce((acc, obj) => acc + obj.exercises, 0)}</p>
        </div>
    )
}
const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content course={course.parts} />
            <Total course={course.parts} />
        </div>
    )
}

export default Course
