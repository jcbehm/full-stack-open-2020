import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

// Tämä olikin täällä jo alusta alkaen
const Statistics = ({ good, neutral, bad }) => {
  const all = (good + neutral + bad)
  const average = ((good - bad) / all)
  const positive = 100 * good / all

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>
          No feedback given
      </p>
      </>
    )
  }

  return (
    <>
      <h1>statistics</h1>
      <p>
        good {good} <br />
        neutral {neutral} <br />
        bad {bad} <br />
        all  {all} <br />
        average {average} <br />
        positive {positive} %
      </p>
    </>
  )
}

const App = () => {
  // napit tallennettu omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />

      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)