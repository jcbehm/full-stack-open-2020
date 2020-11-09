/* SISÄLTÖ: *\

1. Tuonnit
2. Muuttujat
3. Oliot
4. Sovellus
5. Hahmonnus

*/


// --------------
// | 1. Tuonnit |
// --------------

import ReactDOM from 'react-dom'
import App from './App'
import React from 'react'


// ----------------
// | 2. Muuttujat |
// ----------------



// ------------
// | 3. Oliot |
// ------------



// ---------------
// | 4. Sovellus |
// ---------------



// ----------------
// | 5. Hahmonnus |
// ----------------

ReactDOM.render(
  <App />,
  document.getElementById('root')
)


// MONITILAÄPPI
/*
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text='left' />
        <Button onClick={handleRightClick} text='right' />
        {right}
        <History allClicks={allClicks} />
        <br/>
        <Button onClick={() => console.log('clicked the button')} text='console' />
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
*/


// KLIKKIÄPPI
/*
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({ counter }) => <div>{counter}</div>

const App = (props) => {
  const [counter, setCounter] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)
  const setTo9001 = () => setCounter(9001)

  return (
    <div>
      <Display counter={counter} />
      <Button
        handleClick={increaseByOne}
        text='plus'
      />
      <Button
        handleClick={setToZero}
        text='zero'
      />
      <Button
        handleClick={decreaseByOne}
        text='minus'
      />
      <Button
        handleClick={setTo9001}
        text='IT IS OVER NINE THOUSAND!!!'
      />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
*/


/*
TERVEHDYSÄPPI
*/

/*
const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const nimi = 'Pekka'
  const ika = 10

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={nimi} age={ika} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
*/