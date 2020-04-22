import React from 'react';
import ReactDOM from 'react-dom';


function Part(props) {
  return (
    <div>


      {props.data.map((d, i) => {
        return <li key={i.toString()}>{`${d.name} ${d.exercises}`}</li>
      })}

    </div>
  )
}
function Content(props) {
  return (
    <div>
      <Part data={props.parts}

      />


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
      <p>Number of exercises {props.parts.reduce((acc, obj) => acc + obj.exercises, 0)}</p>
    </div>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content
        parts={course.parts}
      />
      <Total parts={course.parts}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

