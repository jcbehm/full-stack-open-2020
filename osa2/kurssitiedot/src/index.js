import React from 'react'
import ReactDOM from 'react-dom'

const Curriculum = ({ courses }) => {

  const Course = ({ course }) => {

    const Header = ( {course} ) => {
      return (
        <>
          <h2>{course.name}</h2>
        </>
      )
    }

    const Content = ( {course} ) => {

      const Part = ( {part} ) => {
        return (
          <>
            <p>
              {part.name} {part.exercises}
            </p>
          </>
        )
      }

      return (
        <>
          {course.parts.map(part =>
            <Part key={part.exercises} part={part} />
          )}
        </>
      )
    }

    const Total = ( {course} ) => {
      let tehtavat = []
      course.parts.forEach(part => {
        tehtavat = tehtavat.concat(part.exercises)
      }
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
        < Header course={course} />

        < Content course={course} />

        < Total course={course} />

      </>
    )
  }


  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map(course => 
        <Course key={course.id} course={course} />
      )}
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      {
      <Curriculum courses={courses} />
      }
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))