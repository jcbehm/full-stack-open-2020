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

  const Total = (props) => {
    let tehtavat = []
    props.parts.forEach(part => {
      tehtavat = tehtavat.concat(part.exercises)}
    )
    const reducer =
      (accumulator, currentValue) => accumulator + currentValue
    const total = tehtavat.reduce(reducer)

    return (
      <>
        <b>total of {total} exercises</b>
      </>
    )
  }

  return (
    <>
      < Header course={course.name} />

      < Content parts={course.parts} />

      < Total parts={course.parts} />

    </>
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
      },
      {
        name: 'Redux',
        exercises: 11
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