import React from 'react';

const Part=({ name, exercises })=>
(<p>{name} {exercises}</p>)

const Content=({ course }) => (
    <div>
    {course.parts.map(c=>
    <Part key={c.id} name={c.name} exercises={c.exercises}/>
    )}
    </div>     
    )

const Header=({ course }) => (
            <h1>{course.name}</h1>
    )

const Total=({course}) =>
     (
        <div>
            <p style={{ fontWeight: 'bold' }}>Number of exercises: {course.parts.reduce((acc, obj) => acc + obj.exercises, 0)}</p>
        </div>
    )

const Course = ({ course }) =>  (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )


export default Course;
