import React from 'react'

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

  export default Course