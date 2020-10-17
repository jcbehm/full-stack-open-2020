import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Language = ({ language }) => (
  <li>
    {language}
  </li>
)

const CountryInfo = ({ country, weather }) => {

  return (
    <div>
      <h2>{country.name}</h2>
      <p>
        capital {country.capital} <br />
      population {country.population}
      </p>
      <h3>Spoken languages</h3>
      {country.languages.map((language, i) =>
        <Language key={i} language={language.name} />
      )}
      <br />
      <img
        src={country.flag}
        alt="flag"
        width="100"
      />
      <h3>Weather in {country.capital}</h3>
      <b>temperature:</b> {weather.current.temperature} Celsisus
      <br />
      <img
        src={weather.current.weather_icons}
        alt="icon"
        width="60"
      />
      <br />
      <b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}

    </div>
  )
}


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

const Display = ({ countriesToShow, setNewSearch, weather }) => {
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
        <CountryInfo country={countriesToShow[0]} weather={weather} />
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
  const [weather, setWeather] = useState([])
  let countriesToShow = []
  let capital = 'New York'

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

  if (countriesToShow.length > 0) {
    capital = countriesToShow[0].capital
  }

  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current' +
        '?access_key='+process.env.REACT_APP_API_KEY+
        '&query=' + (capital))
      .then(response => {
        setWeather(response.data)
      })
  }, [newSearch])

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
        setNewSearch={setNewSearch} weather={weather} />
    </div>
  )
}

export default App;
