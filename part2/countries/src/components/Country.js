import React from 'react'
import Weather from './Weather'

const Country = ({ country, weather }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {Object.keys(country.languages).map(lang => <li key={lang}>{country.languages[lang]}</li>)}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      <Weather weather={weather} capital={country.capital} />
    </div>
  )
}

export default Country