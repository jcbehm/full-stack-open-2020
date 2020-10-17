import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Language = ({ language }) => (
  <li>
    {language}
  </li>
)

const CountryInfo = ({ country }) => (
  <div>
    <h2>{country.name}</h2>
    <p>
      capital {country.capital} <br />
      population {country.population}
    </p>
    <h3>languages</h3>
    {country.languages.map((language, i) =>
      <Language key={i} language={language.name} />
    )}
    <br />
    <img
      src={country.flag}
      alt="flag"
      width="100"
    />
  </div>
)

const Line = ({ line }) => (
  <div>
    {line}
  </div>
)

const LineWithButton = ({ line, setNewSearch }) => (
  <div>
    {line}
    <button onClick={() => setNewSearch(line)}>
      show
    </button>
  </div>
)

const Display = ({ countriesToShow, setNewSearch }) => {
  let info = []
  info = countriesToShow.length > 10
    ? ['Too many matches, specify another filter']
    : countriesToShow.length < 2
      ? [' ']
      : countriesToShow.map(country => country.name);


  if (countriesToShow.length < 11 && 1 < countriesToShow.length) {
    return (
      <div>
        {info.map((line, i) =>
          <LineWithButton key={i}
            line={line} setNewSearch={setNewSearch} />
        )}
      </div>
    )
  }

  if (countriesToShow.length === 1) {
    return (
      <>
        <CountryInfo country={countriesToShow[0]} />
      </>
    )
  }

  return (
    <div>
      {info.map((line, i) =>
        <Line key={i} line={line} />
      )}
    </div>
  )
}

function App() {
  const [newSearch, setNewSearch] = useState('')
  const [allCountries, setAllCountries] = useState([])
  let countriesToShow = []

  if (newSearch !== '')
    countriesToShow = allCountries.filter(country =>
      country.name.toLowerCase().includes(newSearch.toLowerCase())
    )

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }


  return (
    <div>
      find countries
      <input
        value={newSearch}
        onChange={handleSearchChange}
      />
      <Display countriesToShow={countriesToShow}
        setNewSearch={setNewSearch} />
    </div>
  )
}

export default App;
