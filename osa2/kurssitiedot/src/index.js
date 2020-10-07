import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({ course }) => {

  const Header = (props) => {
    return (
      <>
        <h1>{props.course}</h1>
      </>
    )
  }

  const Content = (props) => {

    const Part = (props) => {
      return (
        <>
          <p>
            {props.part} {props.exercises}
          </p>
        </>
      )
    }

    return (
      <>
        {props.parts.map(part =>
          <Part key={part.exercises} part={part.name} exercises={part.exercises} />
        )}
      </>
    )
  }

  return (
    <>
      < Header course={course.name} />

      < Content parts={course.parts} />

      {// < Total parts={course.parts} />
      }
    </>
  )
}







/*
const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises {props.parts[0].exercises + props.parts[1].exercises
          + props.parts[2].exercises}
      </p>
    </>
  )
}
*/

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
    <>
      <Course course={course} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))