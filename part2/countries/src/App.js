import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Country from './components/Country'
import CountriesSearchResult from './components/CountriesSearchResult'

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const getWeather = (capital) => {
    const api_key = process.env.REACT_APP_API_KEY
    if (capital && api_key) {
      axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
        .then(response => {
          console.log('weather response', response.data.current)
          setWeather(response.data.current)
        })
    }
    
  }

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value)
    if (e.target.value !== '') {
      const countriesList = countries.filter(country => {
        const countryNameUp = country.name.common.toUpperCase()
        const searchValueUp = e.target.value.toUpperCase()
        return countryNameUp.indexOf(searchValueUp) !== -1
      })
      setFilteredCountries(countriesList)
      if (countriesList.length === 1) {
        setCountry(countriesList[0])
        getWeather(countriesList[0].capital)
      } else {
        setCountry(null)
        setWeather(null)
      }
    } else {
      setFilteredCountries([])
    }
  }

  const handleShowCountry = (country) => {
    setCountry(country)
    getWeather(country.capital)
  }

  return (
    <>
      <div>find countries <input value={searchValue} onChange={handleSearchChange} /></div>
      {country && weather
        ? <Country country={country} weather={weather} />
        : <CountriesSearchResult countries={filteredCountries} handleShowCountry={handleShowCountry} />
      }
    </>
  )
}

export default App;
