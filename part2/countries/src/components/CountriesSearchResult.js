import React from 'react'

const CountriesSearchResult = ({ countries, handleShowCountry }) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches</p> 
    )
  } else {
    return (
      countries.map(country => <p key={country.name.common}>{country.name.common} <button onClick={() => handleShowCountry(country)}>show</button></p>)
    )
  }
}

export default CountriesSearchResult