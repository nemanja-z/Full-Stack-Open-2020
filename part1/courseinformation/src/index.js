import React from 'react';
import ReactDOM from 'react-dom';


const Part=({parts}) =>
  (
  <p>{`${parts.name} ${parts.exercises}`}</p>
  )

const Content=({parts})=>(
    <>
      <Part parts={parts[0]}/>
      <Part parts={parts[1]}/>
      <Part parts={parts[2]}/>
    </>
  )
const Header=({ name })=>
 (
      <h1>{name}</h1>
  )

const Total=({parts}) => (
    <>
      <p>Number of exercises {parts.reduce((acc, obj) => acc + obj.exercises, 0)}</p>
    </>
  )

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
  };
  const {name,parts}=course;


  return (
    <>
      <Header name={name} />
      <Content parts={parts}/>
      <Total parts={parts}/>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));